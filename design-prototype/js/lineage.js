/* ============================================================
   LINEAGE — shared behavior
   - current year
   - mobile menu
   - reveal-on-scroll
   - Clearing Lattice hero animation (only runs if #lattice canvas exists)
   ============================================================ */

/* ---------- Year ---------- */
(function(){var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();})();

/* ---------- Mobile menu ---------- */
(function(){
  var btn=document.getElementById('menuBtn'), bd=document.getElementById('backdrop');
  if(!btn) return;
  function close(){document.body.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');}
  btn.addEventListener('click',function(){
    var open=document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded',String(open));
  });
  if(bd) bd.addEventListener('click',close);
  document.querySelectorAll('#tabs a').forEach(function(a){a.addEventListener('click',close);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
})();

/* ---------- Nav dropdown ---------- */
(function(){
  var groups=[].slice.call(document.querySelectorAll('.nav-group'));
  if(!groups.length) return;
  var mq=window.matchMedia('(max-width:1024px)');
  function closeAll(except){
    groups.forEach(function(g){
      if(g===except) return;
      g.classList.remove('is-open');
      var t=g.querySelector('.nav-group-trigger'); if(t) t.setAttribute('aria-expanded','false');
    });
  }
  groups.forEach(function(g){
    if(g.querySelector('a[aria-current="page"]')) g.classList.add('is-current');
    var trigger=g.querySelector('.nav-group-trigger'); if(!trigger) return;
    trigger.addEventListener('click',function(e){
      if(mq.matches) return; /* on mobile the group is always expanded */
      e.stopPropagation();
      var open=!g.classList.contains('is-open');
      closeAll(g);
      g.classList.toggle('is-open',open);
      trigger.setAttribute('aria-expanded',String(open));
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav-group')) closeAll(null);
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeAll(null); });
})();

/* ---------- Reveal on scroll ---------- */
(function(){
  var els=document.querySelectorAll('[data-reveal]');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e);});
})();

/* ---------- Clearing Lattice: a field of crossing marks, lit by activation waves ---------- */
/* The original lattice concept, now speaking the new mark's language. A tessellated field of
   faint Clearing Crosses (cyan blade × emerald blade, open center — the logo at field scale).
   Activation waves ripple outward cell to cell; each crossing a wavefront reaches blooms
   emerald, then settles back to faint — a market re-pricing, consensus spreading.
   Honors reduced-motion with a single settled frame.
   Brand grammar: cyan = interaction blade, emerald = action blade / the bloom. */
(function(){
  var canvas=document.getElementById('lattice'); if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var W=0,H=0,cells=[],waves=[],t=0,raf,last=0,spawnAt=0,diag=1;

  function build(){
    var rect=canvas.getBoundingClientRect();
    W=rect.width;H=rect.height;
    canvas.width=W*DPR;canvas.height=H*DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    diag=Math.hypot(W,H)+160;
    cells=[];
    var gap=Math.max(58,Math.min(88,Math.round(W/15)));              // cell spacing, density-capped
    var cols=Math.ceil(W/gap)+2, rows=Math.ceil(H/gap)+2;
    for(var r=0;r<rows;r++){
      for(var c=0;c<cols;c++){
        var off=(r%2)?gap*0.5:0;                                     // staggered tessellation
        cells.push({
          x:c*gap+off-gap, y:r*gap-gap,
          ph:Math.random()*6.28,                                     // idle twinkle phase
          s:0.82+Math.random()*0.3                                   // per-cell size jitter
        });
      }
    }
    waves=[];
  }

  function spawnWave(){
    waves.push({ x:Math.random()*W, y:Math.random()*H, age:0, speed:88+Math.random()*46 });
  }

  function render(dt){
    t+=dt;
    ctx.clearRect(0,0,W,H);

    for(var w=waves.length-1;w>=0;w--){
      waves[w].age+=dt;
      if(waves[w].age*waves[w].speed > diag) waves.splice(w,1);
    }

    ctx.lineCap='round'; ctx.lineWidth=1.4;
    for(var i=0;i<cells.length;i++){
      var C=cells[i], lit=0;
      for(var k=0;k<waves.length;k++){
        var Wv=waves[k];
        var dist=Math.hypot(C.x-Wv.x,C.y-Wv.y)-Wv.age*Wv.speed;      // signed distance to wavefront
        if(dist<60 && dist>-60){
          var g=Math.exp(-(dist*dist)/(2*23*23));                    // gaussian around the front
          lit+=g*Math.max(0,1-(Wv.age*Wv.speed)/diag);               // fade as wave expands out
        }
      }
      if(lit>1)lit=1;
      var tw=0.5+0.5*Math.sin(t*1.4+C.ph);
      var a=0.05+0.035*tw+lit*0.5;                                   // idle faint + activation
      var hs=7*C.s*(1+lit*0.14), gp=hs*0.26;                         // size grows slightly when lit

      if(lit>0.14){                                                  // emerald bloom behind a lit crossing
        var bl=ctx.createRadialGradient(C.x,C.y,0,C.x,C.y,hs*3);
        bl.addColorStop(0,'oklch(84% 0.15 165 / '+(0.18*lit).toFixed(3)+')');
        bl.addColorStop(1,'oklch(84% 0.15 165 / 0)');
        ctx.fillStyle=bl;ctx.beginPath();ctx.arc(C.x,C.y,hs*3,0,Math.PI*2);ctx.fill();
      }

      // cyan blade (interaction)
      ctx.strokeStyle='oklch(78% 0.12 218 / '+(a*0.9).toFixed(3)+')';
      ctx.beginPath();
      ctx.moveTo(C.x-hs,C.y-hs); ctx.lineTo(C.x-gp,C.y-gp);
      ctx.moveTo(C.x+gp,C.y+gp); ctx.lineTo(C.x+hs,C.y+hs);
      ctx.stroke();
      // emerald blade (action) — brightens as the wave passes
      ctx.strokeStyle='oklch(82% 0.16 165 / '+Math.min(1,a*0.9+lit*0.45).toFixed(3)+')';
      ctx.beginPath();
      ctx.moveTo(C.x+hs,C.y-hs); ctx.lineTo(C.x+gp,C.y-gp);
      ctx.moveTo(C.x-gp,C.y+gp); ctx.lineTo(C.x-hs,C.y+hs);
      ctx.stroke();
    }
  }

  function frame(ts){
    var dt=Math.min(((ts-last)||16)/1000,0.05); last=ts;
    spawnAt-=dt;
    if(spawnAt<=0 && waves.length<4){ spawnWave(); spawnAt=1.5+Math.random()*1.9; }
    render(dt);
    raf=requestAnimationFrame(frame);
  }

  function staticFrame(){                                            // two settled waves, frozen mid-field
    waves=[{x:W*0.30,y:H*0.40,age:1.1,speed:120},{x:W*0.72,y:H*0.62,age:1.8,speed:120}];
    render(0);
  }

  function init(){build(); if(reduce){staticFrame();} else {cancelAnimationFrame(raf);last=0;spawnAt=0.5;raf=requestAnimationFrame(frame);}}
  var rt;
  window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(init,180);});
  init();
})();

/* ---------- Code copy buttons (wraps every pre.code site-wide) ---------- */
(function(){
  var blocks=[].slice.call(document.querySelectorAll('pre.code'));
  if(!blocks.length) return;
  blocks.forEach(function(pre){
    var parent=pre.parentNode;
    if(parent && parent.classList && parent.classList.contains('code-block')) return;
    var wrap=document.createElement('div'); wrap.className='code-block';
    var bar=document.createElement('div'); bar.className='code-bar';
    var lang=document.createElement('span'); lang.className='code-lang';
    lang.textContent=pre.getAttribute('data-lang')||'code';
    var btn=document.createElement('button'); btn.type='button'; btn.className='code-copy';
    btn.textContent='Copy'; btn.setAttribute('aria-label','Copy code to clipboard');
    bar.appendChild(lang); bar.appendChild(btn);
    parent.insertBefore(wrap,pre); wrap.appendChild(bar); wrap.appendChild(pre);
    btn.addEventListener('click',function(){
      var text=pre.innerText;
      function done(){btn.textContent='Copied';btn.classList.add('is-done');setTimeout(function(){btn.textContent='Copy';btn.classList.remove('is-done');},1600);}
      function fallback(){try{var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.top='-9999px';document.body.appendChild(ta);ta.focus();ta.select();document.execCommand('copy');document.body.removeChild(ta);done();}catch(e){}}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done,fallback);}else{fallback();}
    });
  });
})();

/* ---------- Docs: collapsible TOC default state by breakpoint ---------- */
(function(){
  var d=document.querySelector('.docs-toc'); if(!d) return;
  var mq=window.matchMedia('(max-width:980px)');
  function sync(e){ d.open = !e.matches; }   /* open on desktop, collapsed on mobile */
  sync(mq);
  if(mq.addEventListener) mq.addEventListener('change',sync); else if(mq.addListener) mq.addListener(sync);
  d.querySelectorAll('.docs-nav a').forEach(function(a){
    a.addEventListener('click',function(){ if(mq.matches) d.open=false; });
  });
})();

/* ---------- Docs: scroll-spy active section + breadcrumb ---------- */
(function(){
  var nav=document.querySelector('.docs-nav'); if(!nav) return;
  var links=[].slice.call(nav.querySelectorAll('a[href^="#"]'));
  var crumb=document.getElementById('docs-crumb');
  var map={},targets=[];
  links.forEach(function(a){
    var id=a.getAttribute('href').slice(1);
    var el=id&&document.getElementById(id);
    if(el){map[id]=a;targets.push(el);}
  });
  if(!targets.length) return;
  var current=null,ticking=false;
  function setActive(id){
    if(id===current)return; current=id;
    links.forEach(function(a){a.removeAttribute('aria-current');});
    var a=map[id]; if(a){a.setAttribute('aria-current','page'); if(crumb) crumb.textContent=a.textContent;}
  }
  function compute(){
    ticking=false;
    var y=110,best=targets[0].id;
    for(var i=0;i<targets.length;i++){
      var r=targets[i].getBoundingClientRect();
      if(r.top<=y) best=targets[i].id; else break;
    }
    if((window.innerHeight+window.scrollY)>=document.documentElement.scrollHeight-4) best=targets[targets.length-1].id;
    setActive(best);
  }
  function onScroll(){ if(!ticking){ticking=true;requestAnimationFrame(compute);} }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  compute();
})();
