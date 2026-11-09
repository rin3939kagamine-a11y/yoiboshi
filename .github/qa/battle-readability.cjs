const { chromium } = require('playwright');
const assert = (ok,msg) => {if(!ok) throw new Error(msg);};
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const sizes=[
  {name:'desktop1636',width:1636,height:820},
  {name:'desktop1280',width:1280,height:720},
  {name:'phone390',width:390,height:844},
  {name:'phone375',width:375,height:667},
  {name:'landscape844',width:844,height:390},
  {name:'landscape667',width:667,height:375}
 ];
 for(const size of sizes){
  const page=await browser.newPage({viewport:size,deviceScaleFactor:1});
  page.on('pageerror',e=>console.log('PAGEERROR',size.name,e.message));
  try{
   await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>typeof startBossTrial==='function' && typeof tbRender==='function',{timeout:60000});
   for(const qid of ['q12','q46']){
    await page.evaluate(qid=>{
      S.gameStarted=true;S.battleMode='turn';onboardingSuppressed=true;
      view='records';battle=null;
      const invalid=teamRuleError();if(invalid)throw Error('Invalid party: '+invalid);
      startBossTrial(qid);
      document.querySelector('.bd-overlay')?.click();
    },qid);
    await page.waitForSelector('.yb-immersive .tb-commands');
    await page.evaluate(async()=>{
      await Promise.all([...document.querySelectorAll('#ycTurnStage img')].map(i=>i.decode().catch(()=>{})));
    });
    const measure=()=>page.evaluate(()=>{
      const rect=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
      const e=s=>document.querySelector(s);
      const css=(s,prop)=>e(s)?getComputedStyle(e(s))[prop]:null;
      const ene=[...document.querySelectorAll('.yb-tactical-header .tb-enemy')].map(x=>{const r=x.getBoundingClientRect();return {name:x.querySelector('b')?.textContent,w:r.width,h:r.height,font:parseFloat(getComputedStyle(x.querySelector('b')).fontSize)}});
      const sprites=[...document.querySelectorAll('#ycTurnStage .yc-enemy-slot')].map(x=>{const r=x.getBoundingClientRect();return {i:x.dataset.enemyIndex,boss:x.classList.contains('q6-giant'),x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}});
      const boxes=['.tb-root.yb-immersive','.yb-tactical-header','.tb-topline','.tb-root.yb-immersive > .tb-control-col',
        '.tb-root.yb-immersive .tb-party-grid','.tb-root.yb-immersive .yb-resource-dashboard',
        '.tb-root.yb-immersive .tb-commands','.tb-root.yb-immersive .tb-command-row',
        '.tb-root.yb-immersive .tb-layout-grid'].map(rect);
      return {w:innerWidth,h:innerHeight,boxes,header:rect('.yb-tactical-header'),control:rect('.tb-root.yb-immersive > .tb-control-col'),
        field:rect('.tb-root.yb-immersive .tb-layout-grid'),ene,sprites,
        topNameFont:parseFloat(css('.yb-tactical-header .tb-enemy b','fontSize')),
        hpFont:parseFloat(css('.tb-root.yb-immersive .tb-party small','fontSize')),
        partyNameFont:parseFloat(css('.tb-root.yb-immersive .tb-party b','fontSize')),
        skillFont:parseFloat(css('.tb-root.yb-immersive .tb-command-row .tb-action-skill','fontSize')),
        attackFont:parseFloat(css('.tb-root.yb-immersive .tb-action-attack','fontSize')),
        enemyHudVisible:[...document.querySelectorAll('.yc-enemy-hud')].some(el=>getComputedStyle(el).display!=='none'),
        commandCount:document.querySelectorAll('.tb-root.yb-immersive .tb-command-row .tb-action').length,
        headerScroll:e('.yb-tactical-header')?.scrollHeight,headerClient:e('.yb-tactical-header')?.clientHeight,
        controlScroll:e('.tb-root.yb-immersive > .tb-control-col')?.scrollHeight,controlClient:e('.tb-root.yb-immersive > .tb-control-col')?.clientHeight,
        pageScroll:document.documentElement.scrollHeight,
        controlsOnScene:e('.tb-root.yb-immersive > .tb-control-col')?.parentElement===e('.tb-root.yb-immersive')};
    });
    const a=await measure();
    await page.screenshot({path:'qa-'+size.name+'-'+qid+'.png'});
    const inside=b=>b&&b.x>=-3&&b.y>=-3&&b.right<=size.width+3&&b.bottom<=size.height+3;
    for(const [i,b] of a.boxes.entries())assert(inside(b),size.name+' '+qid+' box '+i+' out of viewport '+JSON.stringify(b));
    assert(a.controlsOnScene,size.name+' '+qid+' controls not inside battlefield');
    assert(a.boxes[0].w>=size.width-3,size.name+' '+qid+' not fullscreen');
    assert(a.control.w>=size.width*.92,size.name+' '+qid+' side panel reappeared');
    assert(a.commandCount===4,size.name+' '+qid+' incomplete command set');
    const numbers=await page.evaluate(()=>[...document.querySelectorAll('.yb-party-numbers')].map(e=>{
      const hp=e.querySelector('.yb-party-number-hp'),ct=e.querySelector('.yb-party-number-ct');
      const p=hp?.getBoundingClientRect(),c=ct?.getBoundingClientRect(),b=e.getBoundingClientRect();
      return {hp:hp?.textContent,ct:ct?.textContent,within:!!p&&!!c&&p.left>=b.left-1&&c.left>=b.left-1&&p.bottom<=b.bottom+1&&c.bottom<=b.bottom+1,
      stacked:!!p&&!!c&&Math.abs(p.top-c.top)>2};
    }));
    assert(numbers.length===4&&numbers.every(n=>n.within&&n.hp?.startsWith('HP ')&&n.ct?.startsWith('CT ')),
      size.name+' '+qid+' HP/CT missing or clipped '+JSON.stringify(numbers));
    if(size.height>size.width&&size.width<=700)assert(numbers.every(n=>n.stacked),
      size.name+' '+qid+' HP/CT rows not separated on portrait phone '+JSON.stringify(numbers));

    assert(!a.enemyHudVisible,size.name+' '+qid+' duplicate floating enemy stats remain');
    assert(a.headerScroll<=a.headerClient+3,size.name+' '+qid+' header text clipped '+JSON.stringify({height:a.headerClient,scroll:a.headerScroll}));
    assert(a.controlScroll<=a.controlClient+3,size.name+' '+qid+' controls clipped '+JSON.stringify({height:a.controlClient,scroll:a.controlScroll}));
    assert(a.field.h>=100,size.name+' '+qid+' stage too short '+JSON.stringify(a.field));
    const wide=size.width>=1000&&size.height>520,portrait=size.height>size.width;
    const minName=wide?13:portrait?10.5:10.5;
    const minHp=wide?12:portrait?9.5:9.5;
    const minSkill=wide?13:portrait?11.5:11.5;
    assert(a.topNameFont>=minName,size.name+' '+qid+' enemy names too small '+a.topNameFont);
    assert(a.hpFont>=minHp,size.name+' '+qid+' HP too small '+a.hpFont);
    assert(a.skillFont>=minSkill,size.name+' '+qid+' skill text too small '+a.skillFont);
    if(qid==='q12')assert(a.ene.length===3,size.name+' q12 missing enemy cards');
    // Target artwork doesn't overlap adjacent enemy sprites.
    for(let i=0;i<a.sprites.length;i++)for(let j=i+1;j<a.sprites.length;j++){
      const x=a.sprites[i],y=a.sprites[j];
      assert(Math.min(x.right,y.right)<=Math.max(x.x,y.x)+1||
        Math.min(x.bottom,y.bottom)<=Math.max(x.y,y.y)+1,size.name+' '+qid+' enemy overlap '+JSON.stringify([x,y]));
    }
    // Re-render at enemy turn and with minions defeated: no HUD reflow.
    await page.evaluate(()=>{battle.tb.queue=[{side:'enemy',i:0}];tbRender();});
    const b=await measure();
    for(let i of [0,1,3,4,5,6,7,8]){
      const old=a.boxes[i],now=b.boxes[i];
      assert(Math.abs(old.w-now.w)<2&&Math.abs(old.h-now.h)<2,
        size.name+' '+qid+' HUD resizes on turn '+i);
    }
    const bossSprite=a.sprites.find(x=>x.boss);
    await page.evaluate(()=>{
      const boss=battle.enemies.find(e=>e.kind==='boss');
      battle.enemies.forEach(e=>{if(e!==boss)e.hp=0;});
      tbRender();
    });
    const c=await measure(), bossAfter=c.sprites.find(x=>x.boss);
    if(bossSprite&&bossAfter)assert(Math.abs(bossSprite.w-bossAfter.w)<1&&Math.abs(bossSprite.h-bossAfter.h)<1,
      size.name+' '+qid+' boss resized on minion defeat');
    console.log('PASS_CASE '+JSON.stringify({screen:size.name,qid,header:a.header.h,control:a.control.h,stage:a.field.h,
      nameFont:a.topNameFont,hpFont:a.hpFont,skillFont:a.skillFont,enemyCount:a.ene.length}));
   }
  }catch(err){console.error('FAIL '+size.name+' '+err.stack);await page.screenshot({path:'qa-'+size.name+'-FAIL.png'}).catch(()=>{});await browser.close();process.exit(1)}finally{await page.close()}
 }
 await browser.close();console.log('PASS_ALL 6 viewports x 2 boss fights');
})().catch(e=>{console.error(e.stack);process.exit(1)});
