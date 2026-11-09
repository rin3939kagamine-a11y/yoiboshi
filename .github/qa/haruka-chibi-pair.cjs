const { chromium } = require('playwright');
const assert = (ok,msg) => { if(!ok) throw new Error(msg); };
(async()=>{
 const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
 try {
  for(const viewport of [{width:1280,height:720},{width:390,height:844}]){
   const page=await browser.newPage({viewport,deviceScaleFactor:1});
   try{
    await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>typeof startBossTrial==='function'&&typeof tbRender==='function',{timeout:60000});
    const boot=await page.evaluate(()=>{
      S.gameStarted=true; S.battleMode='turn';onboardingSuppressed=true;view='records';
      startBossTrial('q24');document.querySelector('.bd-overlay')?.click();
      return {qid:battle?.qid,wave:battle?.wave,final:battle?.wave===battle?.totalWaves-1,
        turnBattle:battle?.turnBattle,roles:battle?.enemies?.map(e=>e.harukaRole)};
    });
    console.log('BOOT '+JSON.stringify(boot));
    assert(boot.qid==='q24'&&boot.final&&boot.turnBattle,'q24 final boss not booted');
    assert(boot.roles.includes('real')&&boot.roles.includes('shadow'),'Real and shadow roles absent in q24');
    const inspect=()=>page.evaluate(async()=>{
      await Promise.all([...document.querySelectorAll('#ycTurnStage .yc-enemy-slot img')].map(x=>x.decode().catch(()=>{})));
      return [...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(node=>{
        const index=Number(node.dataset.enemyIndex);
        const img=node.querySelector('.yc-enemy-shell>img');
        return {role:battle.enemies[index]?.harukaRole,src:img?.getAttribute('src'),
          loaded:!!img?.complete&&img.naturalWidth>0&&img.naturalHeight>0,
          natural:img?[img.naturalWidth,img.naturalHeight]:null,selected:node.dataset.catalogueId};
      });
    });
    const a=await inspect();
    console.log('Q24 '+viewport.width+' '+JSON.stringify(a));
    assert(a.filter(x=>x.role==='real').length===1,'real role missing from field');
    assert(a.find(x=>x.role==='real')?.src==='assets/ART_V2/chibi/haruka_npc_real.png','approved real image not used');
    assert(a.find(x=>x.role==='real')?.loaded,'approved real image failed to load');
    assert(a.filter(x=>x.role==='shadow').every(x=>x.src==='assets/enemies/haruka_shadow.webp'),'existing shadow art incorrectly replaced with fake');
    await page.screenshot({path:'qa-haruka-'+viewport.width+'-genuine.png'});
    const impostor=await page.evaluate(()=>{
      const b=battle,e=b.enemies.find(x=>x.harukaRole==='shadow');
      if(!e)throw Error('No shadow for visual clone test');
      e.harukaRole='impostor';tbRender();
      return [...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(node=>({
        role:b.enemies[Number(node.dataset.enemyIndex)]?.harukaRole,src:node.querySelector('img')?.getAttribute('src')
      }));
    });
    console.log('IMPOSTOR '+viewport.width+' '+JSON.stringify(impostor));
    assert(impostor.find(x=>x.role==='impostor')?.src==='assets/ART_V2/chibi/haruka_npc_fake.png',
      'future impostor tag failed to resolve independent image');
    const fakeImage=await page.evaluate(async()=>{
      const node=[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].find(
        n=>battle.enemies[Number(n.dataset.enemyIndex)]?.harukaRole==='impostor');
      const img=node?.querySelector('img');if(img)await img.decode().catch(()=>{});
      return {loaded:!!img?.complete&&img.naturalWidth>0,size:img?[img.naturalWidth,img.naturalHeight]:null};
    });
    assert(fakeImage.loaded,'fake source failed to load');
    await page.screenshot({path:'qa-haruka-'+viewport.width+'-impostor-test-only.png'});
    await page.close();
   }catch(e){await page.screenshot({path:'qa-haruka-'+viewport.width+'-failure.png'}).catch(()=>{});throw e;}
  }
  console.log('PASS_PAIR_IMAGES_Q24_AND_SEPARATE_IMPOSTOR_TAG');
 }finally{await browser.close()}
})().catch(e=>{console.error('FAIL '+e.stack);process.exit(1)});
