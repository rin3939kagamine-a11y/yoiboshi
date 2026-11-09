const {chromium}=require('playwright');
const assert=(v,m)=>{if(!v)throw Error(m)};
(async()=>{
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for(const size of [{width:1280,height:720},{width:390,height:844}]){
 const page=await browser.newPage({viewport:size,deviceScaleFactor:1});
 try{
  await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>typeof startBossTrial==='function'&&typeof tbRender==='function',{timeout:60000});
  await page.evaluate(()=>{
    S.gameStarted=true;S.battleMode='turn';onboardingSuppressed=true;view='records';
    startBossTrial('q24');document.querySelector('.bd-overlay')?.click();
  });
  const battleView=await page.evaluate(async()=>{
    await Promise.all([...document.querySelectorAll('#ycTurnStage img')].map(el=>el.decode().catch(()=>{})));
    return {
      qid:battle.qid,wave:battle.wave,final:battle.wave===battle.totalWaves-1,
      enemies:battle.enemies.map(e=>({id:e.id,role:e.harukaRole,kind:e.kind,max:e.max,hp:e.hp})),
      field:[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(n=>{
        const i=Number(n.dataset.enemyIndex),img=n.querySelector('img');
        return {i,role:battle.enemies[i]?.harukaRole,src:img?.getAttribute('src'),loaded:!!img?.naturalWidth,dimensions:img?[img.naturalWidth,img.naturalHeight]:null};
      }),
      cards:[...document.querySelectorAll('.tb-enemy')].map((n,i)=>({
        i,role:battle.enemies[i]?.harukaRole,
        src:n.querySelector('.tb-enemy-art-thumb')?.getAttribute('src')
      })),
      originalShadowRoleCount:battle.enemies.filter(e=>e.harukaRole==='shadow').length,
      impostorRoleCount:battle.enemies.filter(e=>e.harukaRole==='impostor').length
    };
  });
  console.log('BATTLE '+size.width+' '+JSON.stringify(battleView));
  assert(battleView.qid==='q24'&&battleView.final,'q24 final wave missing');
  assert(battleView.enemies.length===3&&battleView.originalShadowRoleCount===2,'q24 enemy composition changed');
  assert(battleView.impostorRoleCount===0,'Unexpected extra fake role');
  assert(battleView.field.length===3,'q24 sprites not all visible');
  for(const entry of battleView.field){
   const expected=entry.role==='real'?'assets/ART_V2/chibi/haruka_npc_real.png':'assets/ART_V2/chibi/haruka_npc_fake.png';
   assert(entry.src===expected,'Field role '+entry.role+' got '+entry.src);
   assert(entry.loaded,'image not loaded: '+entry.src);
   assert(JSON.stringify(entry.dimensions)==='[1254,1254]','wrong PNG dimensions: '+entry.src);
  }
  assert(battleView.cards.filter(c=>c.role==='shadow').every(c=>c.src==='assets/ART_V2/chibi/haruka_npc_fake.png'),'enemy cards not showing ②');
  await page.screenshot({path:'haruka-shadow-'+size.width+'.png'});
  // Re-render still maps ② to both masks; defeat first shadow, preserve other.
  await page.evaluate(()=>{battle.enemies[0].hp=0;tbRender();});
  const after=await page.evaluate(()=>[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(n=>{
    const i=Number(n.dataset.enemyIndex);return {role:battle.enemies[i]?.harukaRole,src:n.querySelector('img')?.getAttribute('src')};
  }));
  assert(after.some(x=>x.role==='shadow'&&x.src==='assets/ART_V2/chibi/haruka_npc_fake.png'),'remaining fake shadow lost identity');
  console.log('PASS '+size.width);
 }catch(e){console.error('FAIL '+size.width+' '+e.stack);await page.screenshot({path:'haruka-shadow-'+size.width+'-failure.png'}).catch(()=>{});await browser.close();process.exit(1)}
 finally{await page.close()}
}
await browser.close();console.log('PASS_ALL_HARUKA_SHADOW_QA');
})().catch(e=>{console.error(e.stack);process.exit(1)});
