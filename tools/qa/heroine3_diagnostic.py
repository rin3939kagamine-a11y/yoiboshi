"""Diagnostic for 3 newly approved heroines: find initial JavaScript load errors."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[2]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
  page=browser.new_page(viewport={'width':390,'height':844})
  errors=[];console=[];failed=[]
  page.on('pageerror',lambda x:errors.append(str(x)))
  page.on('console',lambda x:console.append(x.text) if x.type=='error' else None)
  page.on('requestfailed',lambda x:failed.append(x.url))
  page.goto(f'http://127.0.0.1:{server.server_port}/index.html',wait_until='load')
  page.wait_for_timeout(1500)
  data=page.evaluate("""() => ({
    title:document.title,
    ids:typeof NEW_HERO_IDS_V0692==='undefined'?null:NEW_HERO_IDS_V0692,
    people:typeof PEOPLE,
    unit:typeof UNITS,
    game:typeof fresh,
    story:typeof extraHero,
    art:typeof ART_V2,
    depth:typeof CHARACTER_DEPTH_V0692,
    body:document.body?.innerText?.slice(0,300)
  })""")
  print('DIAGNOSTIC',json.dumps({'data':data,'pageerrors':errors,'console':console,'requestsFailed':failed},ensure_ascii=False))
  browser.close()
  assert not errors,errors
  assert data['game']=='function',data
finally: server.shutdown()
