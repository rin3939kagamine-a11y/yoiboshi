const {chromium}=require('playwright');
const fs=require('fs');
const fail=(msg)=>{throw new Error(msg)};
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
 let count=0;
 for(const v of sizes){
  const page=await browser.newPage({viewport:{width:v.width,height:v.height},deviceScaleFactor:1});
  try{
   await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>typeof tbRender==='function'&&typeof startBossTrial==='function',{timeout:60000});
   for(const qid of ['q12','q46','q6']){
    const boot=await page.evaluate((qid)=>{
      S.gameStarted=true;S.battleMode='turn';onboardingSuppressed=true;
      view='records';battle=null;
      startBossTrial(qid);document.querySelector('.bd-overlay')?.click();
      return {qid:battle?.qid,turn:battle?.turnBattle,final:battle?.wave===battle?.totalWaves-1};
    },qid);
    if(boot.qid!==qid||!boot.turn)fail(v.name+' '+qid+' failed to boot: '+JSON.stringify(boot));
    await page.waitForSelector('.yb-immersive [data-yb-zone-split="50"]');
    await page.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#ycTurnStage img')].map(i=>i.decode().catch(()=>{})))});
    const measure=()=>page.evaluate(()=>{
      const stage=document.querySelector('#ycTurnStage');
      const sr=stage.getBoundingClientRect(),center=sr.left+sr.width*.5;
      const collect=q=>[...stage.querySelectorAll(q)].map(n=>{
        const r=n.getBoundingClientRect();const c=getComputedStyle(n);
        return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom,
          index:n.dataset.enemyIndex,clip:c.clipPath,boss:n.classList.contains('q6-giant'),
          zone:n.dataset.ybZone};
      });
      const rr=n=>{const r=n.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
      const controls=document.querySelector('.yb-immersive>.tb-control-col');
      return{screen:{width:innerWidth,height:innerHeight},mid:center,stage:rr(stage),
        allies:collect(':scope > .yc-slot'),enemies:collect(':scope > .yc-enemy-slot'),
        controls:rr(controls),scene:rr(document.querySelector('.tb-root.yb-immersive')),
        commands:document.querySelectorAll('.yb-immersive .tb-command-row .tb-action').length,
        zoneSplit:stage.dataset.ybZoneSplit};
    });
    function check(vv,tag){
      const mid=vv.mid,eps=1.5;
      if(vv.zoneSplit!=='50')fail(tag+' zone marker missing');
      if(vv.allies.length!==4)fail(tag+' missing four allies '+vv.allies.length);
      if(vv.enemies.length<1)fail(tag+' missing enemies');
      if(vv.scene.w<v.width-3||vv.controls.w<v.width*.92)fail(tag+' old side-panel layout returned');
      if(vv.commands!==4)fail(tag+' missing action buttons');
      for(let i=0;i<vv.allies.length;i++){
       const n=vv.allies[i];
       if(n.x<vv.stage.x-2||n.right>mid+eps)fail(tag+' ally '+i+' crosses LEFT 50%: '+JSON.stringify(n));
       if(n.zone!=='ally'||!n.clip.startsWith('inset('))fail(tag+' ally '+i+' is not clipped to the allied zone: '+JSON.stringify(n));
      }
      for(const n of vv.enemies){
       if(n.x<mid-eps||n.right>vv.stage.right+eps)fail(tag+' enemy '+n.index+' crosses RIGHT 50%: '+JSON.stringify(n));
       if(n.zone!=='enemy'||!n.clip.startsWith('inset('))fail(tag+' enemy '+n.index+' is not clipped to enemy zone: '+JSON.stringify(n));
      }
      for(let i=0;i<vv.enemies.length;i++)for(let j=i+1;j<vv.enemies.length;j++){
       const a=vv.enemies[i],b=vv.enemies[j];
       if(Math.min(a.right,b.right)>Math.max(a.x,b.x)+eps&&Math.min(a.bottom,b.bottom)>Math.max(a.y,b.y)+eps)
         fail(tag+' enemy sprite boxes overlap: '+JSON.stringify([a,b]));
      }
    }
    let a=await measure();check(a,v.name+' '+qid+' initial');
    await page.screenshot({path:'qa-'+v.name+'-'+qid+'-initial.png'});
    // An ally attacking should not lose its half-field clip.
    await page.evaluate(()=>{const e=document.querySelector('#ycTurnStage>.yc-slot .yc-actor');e?.classList.add('yc-attack')});
    await page.waitForTimeout(150);
    let swing=await measure();check(swing,v.name+' '+qid+' attack');
    await page.evaluate(()=>{battle.tb.queue=[{side:'enemy',i:0}];tbRender();});
    let b=await measure();check(b,v.name+' '+qid+' enemy turn');
    if(Math.abs(a.stage.w-b.stage.w)>1||Math.abs(a.controls.h-b.controls.h)>1)fail(v.name+' '+qid+' screen changed with turn');
    if(a.allies.some((n,i)=>Math.abs(n.w-b.allies[i].w)>1))fail(v.name+' '+qid+' ally sizes changed');
    let beforeBoss=a.enemies.find(n=>n.boss);
    await page.evaluate(()=>{
     const boss=battle.enemies.find(e=>e.kind==='boss');
     battle.enemies.forEach(e=>{if(e!==boss)e.hp=0;});
     tbRender();
    });
    const c=await measure();check(c,v.name+' '+qid+' after minion defeat');
    const afterBoss=c.enemies.find(n=>n.boss);
    if(beforeBoss&&afterBoss&&
       (Math.abs(beforeBoss.w-afterBoss.w)>1||Math.abs(beforeBoss.x-afterBoss.x)>1||Math.abs(beforeBoss.h-afterBoss.h)>1))
       fail(v.name+' '+qid+' boss size/position changed after minion death');
    await page.screenshot({path:'qa-'+v.name+'-'+qid+'-minions-down.png'});
    count++;
    console.log('CASE_OK '+JSON.stringify({viewport:v.name,qid,mid:a.mid,
       allies:a.allies.map(n=>({x:Math.round(n.x),right:Math.round(n.right),w:Math.round(n.w)})),
       enemies:a.enemies.map(n=>({x:Math.round(n.x),right:Math.round(n.right),w:Math.round(n.w),boss:n.boss}))}));
   }
  }catch(err){console.error('FAIL '+v.name+' '+err.stack);await page.screenshot({path:'qa-'+v.name+'-failure.png'}).catch(()=>{});await browser.close();process.exit(1)}finally{await page.close()}
 }
 await browser.close();console.log('ALL_PASS '+count+' real browser 50/50 zone cases');
})().catch(e=>{console.error(e.stack);process.exit(1)});
