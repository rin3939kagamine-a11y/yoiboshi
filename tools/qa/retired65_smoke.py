#!/usr/bin/env python3
"""Regression: 65 retired pixel-duplicate R heroine IDs and legacy save compatibility."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'qa_artifacts/retired65'
OUT.mkdir(parents=True,exist_ok=True)
MAP={
  "aizawa_noa_work": "hinako_work",
  "amai_momo_work": "rara_work",
  "amase_kanata_work": "mikan_work",
  "arai_shiori_work": "kanon_work",
  "dojima_rei_work": "kei_work",
  "endo_saori_work": "nana_work",
  "enomoto_tsugumi_work": "chitose_work",
  "fujii_kanon_work": "chako_work",
  "fujimiya_shion_work": "sumika_work",
  "fujita_sui_work": "konatsu_work",
  "goto_satoko_work": "rinka_work",
  "hamasaki_nagisa_work": "manatsu_work",
  "hanasaki_rena_work": "sakura_work",
  "harada_kyoko_work": "ran_work",
  "hayase_rio_work": "maya_work",
  "higuchi_rei_work": "yuria_work",
  "hoshino_emiri_work": "mira_work",
  "ishida_yuna_work": "satsuki_work",
  "ito_ruri_work": "rion_work",
  "kato_hazuki_work": "nozomi_work",
  "katsura_yui_work": "mahiru_work",
  "kawamura_shizuku_work": "azusa_work",
  "kinoshita_ami_work": "nao_work",
  "kitahara_shiho_work": "risa_work",
  "kobayashi_iori_work": "sora_work",
  "komatsu_hinata_work": "himari_work",
  "komine_suzu_work": "kohaku_work",
  "kurosaki_kaede_work": "misaki_work",
  "maeda_akane_work": "miharu_work",
  "miyoshi_nanami_work": "kazusa_work",
  "mizuhara_mayu_work": "noriko_work",
  "momose_yumeka_work": "airi_work",
  "morinaga_akari_work": "himeka_work",
  "morita_mitsuki_work": "chizuru_work",
  "nagasawa_mayu_work": "tsukasa_work",
  "nakajima_kazumi_work": "michiru_work",
  "nanjo_yurara_work": "mirei_work",
  "nikaido_yuki_work": "ren_work",
  "nishimura_ako_work": "yuu_work",
  "nishimura_yumi_work": "mao_work",
  "ogawa_rina_work": "rise_work",
  "okada_misaki_work": "komachi_work",
  "ono_yuina_work": "ui_work",
  "otsuki_tsubasa_work": "minami_work",
  "sakaki_yura_work": "ramu_work",
  "sasaki_sara_work": "seira_work",
  "sato_eri_work": "miki_work",
  "shimizu_kotone_work": "moe_work",
  "shirase_marika_work": "yuna_work",
  "shiratori_yuzuha_work": "nonoka_work",
  "sorano_nanase_work": "tsumugi_work",
  "takahashi_ayano_work": "ruru_work",
  "takamine_rino_work": "subaru_work",
  "takamiya_sayaka_work": "tamaki_work",
  "takamori_serika_work": "roze_work",
  "takasaka_tomoe_work": "kozue_work",
  "tanaka_mio_work": "ryo_work",
  "tsukino_moka_work": "mimi_work",
  "tsukishima_shino_work": "mikoto_work",
  "wakakusa_rinne_work": "raimu_work",
  "watanabe_mizuki_work": "kanoko_work",
  "yamada_yuri_work": "aika_work",
  "yamazaki_wakana_work": "chisato_work",
  "yoshida_sae_work": "tomoe_work",
  "yukishiro_mio_work": "lira_work"
}
PROTECTED=["shiromiya_kotori","hayakawa_aoba","suzumiya_mia","yumemiya_yua","tsukimiya_ayaka","kuromiya_sera","haruno_hana","komiya_anna","hoshimiya_nemu","kumano_miku","ichijo_maki","natsukawa_yu","himemiya_riria","nekomiya_rara","asagiri_rara","ginjo_cecil","hasegawa_honoka","ueda_kana","chiyozaki_suzuha","sakuraba_renka","sakakibara_kaho","minase_ririka","tokiwa_aone"]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
try:
  with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,args=['--no-sandbox'])
    for view,w,h in [('portrait',390,844),('landscape',844,390)]:
      ctx=browser.new_context(viewport={'width':w,'height':h})
      page=ctx.new_page()
      errors=[]
      page.on('pageerror',lambda e:errors.append(str(e)))
      page.goto(f'http://127.0.0.1:{server.server_port}/index.html',wait_until='load',timeout=90000)
      page.wait_for_function("typeof S!=='undefined'&&typeof BYID!=='undefined'&&typeof convertRetiredRSave==='function'",timeout=60000)
      result=page.evaluate("""([mapping,protectedIds])=>{
        const problems=[];
        const removed=Object.keys(mapping);
        const targets=Object.values(mapping);
        const heroIDs=removed.map(id=>id.replace(/_work$/,''));
        const protectedPresent=protectedIds.filter(id=>!HERO_IDS.includes(id)||!PEOPLE[id]);
        for(const id of heroIDs){
          if(HERO_IDS.includes(id)||PEOPLE[id])problems.push('hero remains: '+id);
          if(ART_V2.full_body[id]||ART_V2.upper_body[id]||ART_V2.face_icons[id])problems.push('art wiring remains: '+id);
        }
        for(const id of removed){
          if(BYID[id]||UNITS.some(u=>u.id===id))problems.push('unit remains: '+id);
          if(NORMAL_GACHA_POOL.some(u=>u.id===id))problems.push('gacha remains: '+id);
        }
        for(const dest of targets)if(!BYID[dest]||BYID[dest].rarity!=='R')problems.push('destination missing: '+dest);
        for(const [src,dest] of Object.entries(mapping)){
          if(RETIRED_DUPLICATE_R_TO_CANONICAL[src]!==dest)problems.push('wrong mapping: '+src);
          const raw={owned:{[src]:{lv:5,aff:3,lb:9,copies:2},[dest]:{lv:2,aff:9,lb:1,copies:4},other_safe_work:{lv:3}},party:[src,dest,'other_safe_work'],selected:src,homeUnitId:src,gems:1234};
          const out=convertRetiredRSave(raw);
          if(out.owned[src]||!out.owned[dest]||out.owned[dest].lv!==5||out.owned[dest].aff!==9||out.owned[dest].lb!==7||out.owned[dest].copies!==7||out.party.join(',')!==dest+',other_safe_work'||out.selected!==dest||out.homeUnitId!==dest||out.gems!==1234||out.owned.other_safe_work.lv!==3)problems.push('merge save failed: '+src);
          const solo=convertRetiredRSave({owned:{[src]:{lv:4,aff:2,lb:11,copies:1}},party:[src]});
          if(solo.owned[src]||!solo.owned[dest]||solo.owned[dest].lb!==7||solo.party[0]!==dest)problems.push('solo save failed: '+src);
        }
        return {heroCount:HERO_IDS.length,uniqueHeros:new Set(HERO_IDS).size,
          normalPool:['R','SR','SSR','UR'].map(r=>NORMAL_GACHA_POOL.filter(u=>u.rarity===r).length),
          totalR:UNITS.filter(u=>u.rarity==='R').length,
          rates:{...RATE},newRates:{...NEW19_RATE},
          removedCount:removed.length,targetCount:new Set(targets).size,
          protectedMissing:protectedPresent,problems};
      }""",[MAP,PROTECTED])
      assert not errors, errors[:10]
      assert result['removedCount']==65 and result['targetCount']==65,result
      assert result['heroCount']==196 and result['uniqueHeros']==196,result
      assert result['normalPool']==[180,56,56,57],result
      assert result['totalR']==223,result
      assert result['rates']=={'R':60,'SR':25,'SSR':10,'UR':5},result
      assert result['newRates']=={'R':80,'SR':0,'SSR':15,'UR':5},result
      assert not result['protectedMissing'] and not result['problems'],result
      (OUT/f'{view}.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
      print(f'PASS {view}: 65 remaps, 196 heroines, normal R180, all R223, 23 protected, rates unchanged')
      ctx.close()
    browser.close()
finally:
  server.shutdown()
