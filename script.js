const msgs={25:'$25 plants 10 native seedlings.',50:'$50 equips a volunteer cleanup crew for a day.',100:'$100 restores 50 sq ft of wetland habitat.',250:'$250 runs a school field day for 30 students.',500:'$500 funds a season of water quality testing.'};
let freq='one-time',amt=50;
const imp=document.getElementById('impact'),go=document.getElementById('give');
function upd(){const c=document.getElementById('custom').value;const a=c?+c:amt;imp.textContent=(msgs[a]||'Every gift goes straight to on-the-ground projects.')+(freq==='monthly'?' Monthly gifts let us plan ahead.':'');go.textContent=`Donate $${a||0}${freq==='monthly'?' / month':''}`}
document.querySelectorAll('.toggle button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.toggle button').forEach(x=>x.classList.remove('on'));b.classList.add('on');freq=b.dataset.f;upd()});
document.querySelectorAll('.amts button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.amts button').forEach(x=>x.classList.remove('on'));b.classList.add('on');amt=+b.dataset.a;document.getElementById('custom').value='';upd()});
document.getElementById('custom').oninput=()=>{document.querySelectorAll('.amts button').forEach(x=>x.classList.remove('on'));upd()};
go.onclick=e=>{e.preventDefault();go.textContent='Demo only: checkout would open here'};
document.querySelectorAll('form[data-demo]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const t=f.querySelector('.thanks')||f.nextElementSibling;if(t)t.style.display='block';f.querySelectorAll('button[type=submit]').forEach(b=>b.textContent='Thank you!')});
upd();
