const { chromium } = require('playwright');
(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const screens=[
    {w:390,h:844,name:'phone390'},
    {w:375,h:667,name:'phone375'},
    {w:844,h:390,name:'landscape844'},
    {w:667,h:375,name:'landscape667'},
    {w:1280,h:720,name:'desktop1280'}
  ];
  const close=(a,b,tol=3)=>Math.abs(a-b)<=tol;
  const inside=(r,w,h)=>r&&r.x>=-3&&r.y>=-3&&r.right<=w+3&&r.bottom<=h+3;
  const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
  for(const {w,h,name} of screens){
    const page=await browser.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
    page.on('pageerror',e=>console.log('PAGEERROR',name,e.message));
    try{
      await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>typeof startBossTrial==='function'&&typeof tbRender==='function',{timeout:60000});
      const state=await page.evaluate(()=>{
        S.gameStarted=true;S.battleMode='turn';onboardingSuppressed=true;view='records';
        const invalid=teamRuleError();if(invalid)throw Error('party invalid '+invalid);
        startBossTrial('q46');
        document.querySelector('.bd-overlay')?.click();
        return {qid:battle?.qid,turnBattle:battle?.turnBattle,final:battle.wave===battle.totalWaves-1};
      });
      assert(state.qid==='q46'&&state.turnBattle&&state.final,name+' cannot load q46');
      const measure=()=>page.evaluate(()=>{
        const rect=sel=>{const el=document.querySelector(sel);if(!el)return null;const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
        const enemy=[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(el=>{const r=el.getBoundingClientRect();return {name:el.dataset.enemyIndex,x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom,boss:el.classList.contains('q6-giant')}});
        const allies=[...document.querySelectorAll('#ycTurnStage>.yc-slot')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}});
        const scene=document.querySelector('.tb-root.yb-immersive');
        const stage=document.querySelector('#ycTurnStage');
        return {viewport:{w:innerWidth,h:innerHeight},scene:rect('.tb-root.yb-immersive'),stage:rect('#ycTurnStage'),
          header:rect('.tb-root.yb-immersive > .yb-tactical-header'),top:rect('.tb-root.yb-immersive > .tb-topline'),
          controls:rect('.tb-root.yb-immersive > .tb-control-col'),party:rect('.tb-root.yb-immersive .tb-party-grid'),
          flame:rect('.tb-root.yb-immersive .yb-resource-dashboard'),commands:rect('.tb-root.yb-immersive .tb-commands'),
          row:rect('.tb-root.yb-immersive .tb-command-row'),enemy,allies,
          parent:document.querySelector('.tb-root.yb-immersive > .tb-control-col')?.parentElement?.className,
          stageBackground:getComputedStyle(stage).backgroundImage,
          sceneBackground:getComputedStyle(scene).backgroundImage,
          commandsCount:document.querySelectorAll('.tb-root.yb-immersive .tb-command-row .tb-action').length,
          scroll:document.documentElement.scrollHeight};
      });
      const a=await measure();
      if(name==='phone390'||name==='desktop1280'){
        const debugSprites=await page.evaluate(()=>[...document.querySelectorAll('#ycTurnStage>.yc-enemy-slot')].map(el=>{
          const shell=el.querySelector('.yc-enemy-shell'),img=el.querySelector('img');
          const r=n=>{if(!n)return null;const x=n.getBoundingClientRect();return {x:x.x,y:x.y,w:x.width,h:x.height};};
          return {cls:el.className,slot:r(el),shell:r(shell),img:r(img),imgSrc:img?.getAttribute('src'),
          imageLoaded:img?.complete,imageNatural:img?[img.naturalWidth,img.naturalHeight]:null,
          slotCSS:{h:getComputedStyle(el).height,display:getComputedStyle(el).display},
          shellCSS:{h:getComputedStyle(shell).height,flex:getComputedStyle(shell).flex,position:getComputedStyle(shell).position,aspect:getComputedStyle(shell).aspectRatio},
          imgCSS:img?{height:getComputedStyle(img).height,opacity:getComputedStyle(img).opacity,visibility:getComputedStyle(img).visibility,position:getComputedStyle(img).position}:null};}));
        console.log('SPRITES '+name+' '+JSON.stringify(debugSprites));
        const pixels=await page.evaluate(()=>{
          const img=document.querySelector('#ycTurnStage .yc-enemy-slot.q6-giant img');
          if(!img)return null;
          const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;
          const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
          const d=ctx.getImageData(0,0,c.width,c.height).data;
          let bbox=[c.width,c.height,0,0],opaque=0,visible=0;
          for(let y=0;y<c.height;y+=2)for(let x=0;x<c.width;x+=2){
            const p=(y*c.width+x)*4,a=d[p+3];
            if(a>32){visible++;bbox=[Math.min(bbox[0],x),Math.min(bbox[1],y),Math.max(bbox[2],x),Math.max(bbox[3],y)]}
            if(a>220)opaque++;
          }
          return {visible,opaque,bbox,natural:[c.width,c.height]};
        });
        console.log('BOSSPIXELS '+name+' '+JSON.stringify(pixels));

      }
      await page.screenshot({path:'qa-'+name+'-start.png'});
      assert(a.scene&&a.scene.w>=w-5&&a.scene.h>=h-5,name+' scene is not full screen '+JSON.stringify(a.scene));
      assert(a.stage&&a.stage.w>=w*.96,name+' battlefield remains a small card '+JSON.stringify(a.stage));
      assert(a.controls&&a.controls.w>=w*.92,name+' controls remain in a side panel '+JSON.stringify(a.controls));
      for(const key of ['top','header','controls','party','flame','commands','row','stage']){
        assert(inside(a[key],w,h),name+' offscreen '+key+' '+JSON.stringify(a[key]));
      }
      assert(a.sceneBackground!=='none'&&a.stageBackground==='none',name+' scene background not extended '+a.sceneBackground+' / '+a.stageBackground);
      assert(a.commandsCount===4,name+' action buttons missing '+a.commandsCount);
      assert(a.allies.length===4,name+' ally actors missing '+a.allies.length);
      assert(a.allies.every(x=>x.w>=Math.min(82,w*.20)),name+' characters too small '+JSON.stringify(a.allies));
      const enemiesFit=a.enemy.every(x=>inside(x,w,h));
      assert(enemiesFit,name+' enemy offscreen '+JSON.stringify(a.enemy));
      for(let i=0;i<a.enemy.length;i++)for(let j=i+1;j<a.enemy.length;j++){
        const x=a.enemy[i],y=a.enemy[j];
        assert(Math.min(x.right,y.right)<=Math.max(x.x,y.x)+1||Math.min(x.bottom,y.bottom)<=Math.max(x.y,y.y)+1,name+' enemies overlap '+JSON.stringify([x,y]));
      }
      // Re-render while enemy acts: no panel/field reflow.
      await page.evaluate(()=>{battle.tb.queue=[{side:'enemy',i:0}];tbRender();});
      const b=await measure();
      await page.screenshot({path:'qa-'+name+'-enemyturn.png'});
      for(const key of ['scene','stage','header','controls','commands']){
        assert(close(a[key].x,b[key].x)&&close(a[key].y,b[key].y)&&close(a[key].w,b[key].w)&&close(a[key].h,b[key].h),name+' layout changes on enemy turn '+key+' '+JSON.stringify([a[key],b[key]]));
      }
      assert(b.commandsCount===4,name+' command region collapses in enemy turn');
      // Boss must never shrink or grow as minions disappear.
      const prev=a.enemy.find(x=>x.boss);
      assert(!!prev,name+' boss not found');
      await page.evaluate(()=>{
        const boss=battle.enemies.find(e=>e.kind==='boss');
        for(const e of battle.enemies)if(e!==boss)e.hp=0;
        tbRender();
      });
      const c=await measure();
      await page.screenshot({path:'qa-'+name+'-bossalone.png'});
      const newBoss=c.enemy.find(x=>x.boss);
      assert(!!newBoss,name+' boss lost');
      assert(close(prev.w,newBoss.w)&&close(prev.h,newBoss.h),name+' boss size changes '+JSON.stringify([prev,newBoss]));
      for(const key of ['scene','stage','header','controls']){
        assert(close(a[key].w,c[key].w)&&close(a[key].h,c[key].h),name+' layout changes after enemy defeat '+key);
      }
      console.log(JSON.stringify({name,scene:a.scene,stage:a.stage,controls:a.controls,allyWidth:a.allies[0]?.w,bossWidth:prev.w,bossWidthAlone:newBoss.w,header:a.header,pass:true}));
    }catch(e){
      console.error('FAIL '+name,e.stack);
      await page.screenshot({path:'qa-'+name+'-failure.png'}).catch(()=>{});
      await browser.close();process.exit(1);
    }finally{await page.close();}
  }
  await browser.close();console.log('PASS immersive HUD overlays, sprite scaling and all 5 viewports');
})().catch(e=>{console.error(e.stack);process.exit(1)});
