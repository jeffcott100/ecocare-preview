const msgs={25:'$25 plants 10 native seedlings.',50:'$50 equips a volunteer cleanup crew for a day.',100:'$100 restores 50 sq ft of wetland habitat.',250:'$250 runs a school field day for 30 students.',500:'$500 funds a season of water quality testing.'};
let freq='one-time',amt=50;
const imp=document.getElementById('impact'),go=document.getElementById('give');
function upd(){const c=document.getElementById('custom').value;const a=c?+c:amt;imp.textContent=(msgs[a]||'Every gift goes straight to on-the-ground projects.')+(freq==='monthly'?' Monthly gifts let us plan ahead.':'');go.textContent=`Donate $${a||0}${freq==='monthly'?' monthly':''}`}
document.querySelectorAll('.toggle button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.toggle button').forEach(x=>x.classList.remove('on'));b.classList.add('on');freq=b.dataset.f;upd()});
document.querySelectorAll('.amts button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.amts button').forEach(x=>x.classList.remove('on'));b.classList.add('on');amt=+b.dataset.a;document.getElementById('custom').value='';upd()});
document.getElementById('custom').oninput=()=>{document.querySelectorAll('.amts button').forEach(x=>x.classList.remove('on'));upd()};
go.onclick=e=>{e.preventDefault();go.textContent='Demo only: checkout would open here'};
document.querySelectorAll('form[data-demo]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const t=f.querySelector('.thanks')||f.nextElementSibling;if(t)t.style.display='block';f.querySelectorAll('button[type=submit]').forEach(b=>b.textContent='Thank you!')});
upd();

/* v2: sticky nav, hero carousel, reveal */
(()=>{const top=document.querySelector('.top'),hero=document.querySelector('.hero');
const onS=()=>top.classList.toggle('solid',scrollY>hero.offsetHeight-80);addEventListener('scroll',onS,{passive:true});onS();
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const imgs=[...hero.querySelectorAll('.slides img')],cr=document.getElementById('hero-credit');let i=0;
if(!rm&&imgs.length>1)setInterval(()=>{if(document.hidden)return;imgs[i].classList.remove('on');i=(i+1)%imgs.length;imgs[i].loading='eager';imgs[i].classList.add('on');cr.textContent=imgs[i].dataset.credit},6500);
const els=document.querySelectorAll('main section:not(.hero) h2, .lede, .pill, .card, .box, .tier, .nums>*, .donate-card, .inq');
if(rm||!('IntersectionObserver'in window))return;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>{t.classList.remove('reveal','in');t.style.transitionDelay=''},1200)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach((el,k)=>{el.classList.add('reveal');el.style.transitionDelay=(k%4)*70+'ms';io.observe(el)});})();

/* v3: count-up stats */
(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm||!('IntersectionObserver'in window))return;
document.querySelectorAll('.num b').forEach(b=>{const m=b.textContent.match(/^([\d,]+)(.*)$/);if(!m)return;const end=+m[1].replace(/,/g,''),suf=m[2],fmt=n=>n.toLocaleString('en-US')+suf;b.textContent=fmt(0);
const io=new IntersectionObserver(es=>{if(!es[0].isIntersecting)return;io.disconnect();const t0=performance.now(),D=1600;const f=t=>{const p=Math.min((t-t0)/D,1),e=1-Math.pow(1-p,3);b.textContent=fmt(Math.round(end*e));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)},{threshold:.4});io.observe(b)})})();

(function(){
  var info={Seedling:{p:"$1,000 / year",d:"logo on our website, an annual impact report and a social media thank you.",m:"We'd like to support Evergreen Commons as a Seedling sponsor."},
    Canopy:{p:"$5,000 / year",d:"everything in Seedling plus a private team volunteer day, event signage and quarterly updates.",m:"We're interested in a Canopy sponsorship and a team volunteer day."},
    Watershed:{p:"$15,000 / year",d:"everything in Canopy plus a named project, two team volunteer days and custom ESG impact metrics.",m:"We'd like to explore a Watershed sponsorship with a named project."}};
  var tiers=document.querySelectorAll('.tier[data-tier]'),sel=document.getElementById('tierSel'),note=document.getElementById('tierNote'),msg=document.getElementById('tierMsg'),btn=document.getElementById('tierBtn');
  if(!tiers.length||!sel)return;
  function pick(n,scroll){
    tiers.forEach(function(t){t.classList.toggle('feat',t.dataset.tier===n)});
    sel.value=n;var i=info[n];
    if(i){note.innerHTML='<strong>'+n+' ('+i.p+'):</strong> '+i.d;msg.placeholder=i.m;btn.textContent='Send '+n+' inquiry'}
    else{note.textContent='Not sure which tier fits? Tell us your goals and we will suggest one.';msg.placeholder='Tell us about your goals';btn.textContent='Send inquiry'}
    if(scroll)document.querySelector('.inq').scrollIntoView({behavior:'smooth',block:'center'});
  }
  tiers.forEach(function(t){t.addEventListener('click',function(){pick(t.dataset.tier,true)});t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(t.dataset.tier,true)}})});
  sel.addEventListener('change',function(){pick(sel.value,false)});
  pick('Canopy',false);
})();
