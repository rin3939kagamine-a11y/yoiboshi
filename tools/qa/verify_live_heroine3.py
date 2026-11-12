"""Live public GitHub Pages sanity check for merged approved heroines; read-only."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
site="https://rin3939kagamine-a11y.github.io/yoiboshi/"
out=Path("qa_artifacts/live_three_heroines")
out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
    results=[]
    for (w,h) in [(390,844),(844,390)]:
        page=browser.new_page(viewport={"width":w,"height":h})
        exceptions=[];page.on("pageerror",lambda x:exceptions.append(str(x)))
        response=page.goto(site,wait_until="load",timeout=90000)
        diagnostics=page.evaluate("""() => ({title:document.title,loc:location.href,ready:document.readyState,game:typeof HERO_IDS,unit:typeof BYID,art:typeof ART_V2,scripts:[...document.querySelectorAll('script[src]')].map(x=>x.src).slice(-12)})""")
        print("INITIAL_LIVE",json.dumps({"response":response.status,"meta":diagnostics,"errors":exceptions},ensure_ascii=False),flush=True)
        page.screenshot(path=str(out/f"before_{w}x{h}.png"),full_page=True)
        page.wait_for_function("typeof HERO_IDS!=='undefined' && typeof BYID!=='undefined' && typeof ART_V2!=='undefined'",timeout=15000)
        found=page.evaluate("""() => ({
          title:document.title,
          people:['sumika','reika','hono'].map(id=>({
           id,known:HERO_IDS.includes(id),name:PEOPLE[id]?.name,rarity:BYID[id+'_work']?.rarity,
           originalImage:ART_V2.full_body[id],unitImage:unitArt(BYID[id+'_work'],'portrait')
          })),
          scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth
        })""")
        assert response.status==200,(response.status,site)
        assert "0.70.2.0" in found["title"],found
        assert all(x["known"] and x["rarity"]=="SR" and x["name"] and x["originalImage"] for x in found["people"]),found
        assert found["scrollWidth"]<=w+18,found
        assert not exceptions,exceptions
        page.screenshot(path=str(out/f"home_{w}x{h}.png"),full_page=True)
        results.append({"viewport":[w,h],"page":found,"errors":exceptions})
        page.close()
    gallery=browser.new_page(viewport={"width":390,"height":844})
    resp=gallery.goto(site+"sr_gallery.html",wait_until="load",timeout=90000)
    gallery_errors=[];gallery.on("pageerror",lambda x:gallery_errors.append(str(x)))
    pre=gallery.evaluate("""() => ({title:document.title,tiles:document.querySelectorAll('.tile').length,body:document.body?.innerText?.slice(0,700),sourceScripts:[...document.scripts].map(s=>s.getAttribute('src')),hasGallery:!!document.querySelector('#gallery'),galleryHead:document.querySelector('#gallery')?.outerHTML.slice(0,200)})""")
    print("LIVE_GALLERY_DIAGNOSTIC",json.dumps({"status":resp.status,"meta":pre,"errors":gallery_errors},ensure_ascii=False),flush=True)
    gallery.screenshot(path=str(out/"before_gallery_390x844.png"),full_page=True)
    gallery.wait_for_function("document.querySelectorAll('.tile').length>10",timeout=7000)
    for id in ['sumika_work','reika_work','hono_work']:
        target=gallery.locator('article.tile').filter(has_text=id)
        assert target.count()==1,('missing card',id)
        src=target.locator('img').get_attribute('src')
        response=gallery.request.get(site+src,timeout=30000)
        print('LIVE_IMAGE_HTTP',id,src,response.status,flush=True)
        assert response.status==200,(id,src,response.status)
        target.scroll_into_view_if_needed(timeout=15000)
        target.locator('img').evaluate('(el)=>el.loading="eager"')
        gallery.wait_for_function("""id=>{
           const card=[...document.querySelectorAll('article.tile')].find(x=>x.textContent.includes(id));
           const img=card?.querySelector('img');
           return !!img&&img.complete&&img.naturalWidth>0;
        }""",arg=id,timeout=30000)
    cards=gallery.evaluate("""() =>['sumika_work','reika_work','hono_work'].map(id=>{
      const card=[...document.querySelectorAll('.tile')].find(x=>x.textContent.includes(id));
      const img=card?.querySelector('img');
      return {id,visible:!!card,loaded:!!img&&img.complete&&img.naturalWidth>0,src:img?.src};
    })""")
    assert resp.status==200 and all(x["visible"] and x["loaded"] for x in cards),cards
    gallery.screenshot(path=str(out/"live_gallery_390x844.png"),full_page=True)
    print(json.dumps({"status":"PASS","liveUrl":site,"mergedCharacters":cards,"viewports":results},ensure_ascii=False))
    browser.close()
