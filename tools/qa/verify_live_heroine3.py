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
        page.wait_for_function("typeof HERO_IDS!=='undefined' && typeof BYID!=='undefined' && typeof ART_V2!=='undefined'",timeout=30000)
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
    gallery.wait_for_function("document.querySelectorAll('.tile').length>10")
    gallery.wait_for_function("""() => ['sumika_work','reika_work','hono_work'].every(id=>{
      const card=[...document.querySelectorAll('.tile')].find(x=>x.textContent.includes(id));
      const im=card?.querySelector('img');
      return !!im && im.complete && im.naturalWidth>0;
    })""",timeout=30000)
    cards=gallery.evaluate("""() =>['sumika_work','reika_work','hono_work'].map(id=>{
      const card=[...document.querySelectorAll('.tile')].find(x=>x.textContent.includes(id));
      const img=card?.querySelector('img');
      return {id,visible:!!card,loaded:!!img&&img.complete&&img.naturalWidth>0,src:img?.src};
    })""")
    assert resp.status==200 and all(x["visible"] and x["loaded"] for x in cards),cards
    gallery.screenshot(path=str(out/"live_gallery_390x844.png"),full_page=True)
    print(json.dumps({"status":"PASS","liveUrl":site,"mergedCharacters":cards,"viewports":results},ensure_ascii=False))
    browser.close()
