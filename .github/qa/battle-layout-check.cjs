const {chromium}=require('playwright');
(async()=>{
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const cases=[{width:390,height:844,name:'iPhone-390x844'},{width:375,height:667,name:'iPhone-375x667'},{width:844,height:390,name:'landscape-844x390'},{width:1280,height:720,name:'desktop-1280x720'}];
const eps=2;
function check(test,message){if(!test)throw Error(message);}
for(const c of cases){
 const page=await browser.newPage({viewport:{width:c.width,height:c.height},deviceScaleFactor:1});
 try{
 await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>typeof startBossTrial==='function'&&typeof tbRender==='function',{timeout:60000});
 const boot=await page.evaluate(()=>{
  S.gameStarted=true;S.battleMode='turn';onboardingSuppressed=true;view='records';
  const validity=teamRuleError();
  if(validity)throw Error('INVALID_PARTY: '+validity+' '+JSON.stringify(S.party));
  startBossTrial('q46');
  return {view,qid:battle?.qid,wave:battle?.wave,turnBattle:battle?.turnBattle,enemyCount:battle?.enemies?.length};
 });
 check(boot.qid==='q46'&&boot.turnBattle,'q46 turn battle did not render: '+JSON.stringify(boot));
 const measure=()=>page.evaluate(()=>{
  const rc=s=>{let e=document.querySelector(s);if(!e)return null;let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom,visible:getComputedStyle(e).display!=='none'};};
  const stage=rc('#ycTurnStage'),root=rc('.tb-root'),field=rc('.tb-field-col'),controls=rc('.tb-control-col'),commands=rc('.tb-commands'),row=rc('.tb-command-row'),enemies=[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};});
  return {viewport:{w:innerWidth,h:innerHeight},root,stage,field,controls,commands,row,enemies,cmdCount:document.querySelectorAll('.tb-command-row button').length,notes:document.querySelectorAll('.tb-battle-notes').length,scroll:{body:document.body.scrollHeight,html:document.documentElement.scrollHeight,ctrl:document.querySelector('.tb-control-col')?.scrollHeight,ctrlClient:document.querySelector('.tb-control-col')?.clientHeight}};
 });
 let a=await measure();
 await page.screenshot({path:'qa-'+c.name+'-ally.png'});
 const within=(r)=>r&&r.visible!==false&&r.x>=-eps&&r.y>=-eps&&r.right<=c.width+eps&&r.bottom<=c.height+eps;
 for(const key of ['root','stage','field','controls','commands','row'])check(within(a[key]),c.name+' '+key+' outside viewport: '+JSON.stringify(a[key]));
 check(a.stage.w>c.width*.35&&a.stage.h>90,c.name+' battlefield too small: '+JSON.stringify(a.stage));
 check(a.cmdCount===4,c.name+' missing commands: '+a.cmdCount);
 check(a.scroll.ctrl<=a.scroll.ctrlClient+eps,c.name+' controls overflow vertically: '+JSON.stringify(a.scroll));
 for(let i=0;i<a.enemies.length;i++)for(let j=i+1;j<a.enemies.length;j++){
  const x=a.enemies[i],y=a.enemies[j];
  check(Math.min(x.right,y.right)<=Math.max(x.x,y.x)+eps || Math.min(x.bottom,y.bottom)<=Math.max(x.y,y.y)+eps,c.name+' overlapping enemies: '+JSON.stringify([x,y]));
 }
 await page.evaluate(()=>{battle.tb.queue=[{side:'enemy',i:0}];tbRender();});
 let b=await measure();
 await page.screenshot({path:'qa-'+c.name+'-enemy.png'});
 check(b.cmdCount===4,c.name+' commands collapse on enemy turn');
 for(let key of ['root','stage','field','controls','commands','row']){
  const x=a[key],y=b[key];
  check(x&&y&&Math.abs(x.x-y.x)<=eps&&Math.abs(x.y-y.y)<=eps&&Math.abs(x.w-y.w)<=eps&&Math.abs(x.h-y.h)<=eps,c.name+' layout shifted on enemy turn: '+key+' '+JSON.stringify([x,y]));
 }
 await page.evaluate(()=>{battle.enemies[0].hp=0;tbRender();});
 let d=await measure();
 for(let key of ['root','stage','controls','commands']){
   const x=a[key],y=d[key];check(x&&y&&Math.abs(x.w-y.w)<=eps&&Math.abs(x.h-y.h)<=eps,c.name+' shifted after enemy defeated: '+key);
 }
 console.log(JSON.stringify({name:c.name,boot,initial:{root:a.root,stage:a.stage,controls:a.controls,commands:a.commands,enemies:a.enemies,scroll:a.scroll},stableEnemyTurn:true,stableEnemyCount:true}));
 }catch(e){console.error('FAIL '+c.name+' '+e.stack);await page.screenshot({path:'qa-'+c.name+'-failure.png'}).catch(()=>{});await browser.close();process.exit(1);}finally{await page.close();}
}
await browser.close();console.log('PASS 4 screen sizes and combat turn/target transitions');
})().catch(e=>{console.error(e);process.exit(1)});