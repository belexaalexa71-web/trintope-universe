const body = document.body;
const opening = document.getElementById('opening');
const openingVideo = document.getElementById('openingVideo');
const openingCard = document.getElementById('openingCard');
const enterWorld = document.getElementById('enterWorld');
const skipOpening = document.getElementById('skipOpening');
const replay = document.getElementById('replay');
const progress = document.getElementById('progress');

function showOpeningCard(){ openingCard.classList.add('show'); }
function unlockVideos(){ document.querySelectorAll('video').forEach(v => { v.muted = v.autoplay || v.classList.contains('hero-video') ? true : v.muted; v.playsInline = true; v.play?.().catch(()=>{}); }); }
function closeOpening(){ opening.classList.add('hidden'); body.classList.remove('is-locked'); unlockVideos(); setTimeout(()=>document.querySelector('#home')?.scrollIntoView({behavior:'smooth'}),120); }
function playOpening(){ opening.classList.remove('hidden'); openingCard.classList.remove('show'); body.classList.add('is-locked'); openingVideo.muted=true; openingVideo.playsInline=true; openingVideo.currentTime=0; const p=openingVideo.play(); if(p?.catch) p.catch(showOpeningCard); setTimeout(showOpeningCard,5600); }
window.addEventListener('load', playOpening);
openingVideo.addEventListener('ended', showOpeningCard);
openingVideo.addEventListener('error', showOpeningCard);
enterWorld.addEventListener('click', closeOpening);
skipOpening.addEventListener('click', showOpeningCard);
replay.addEventListener('click', playOpening);
document.addEventListener('pointerdown', unlockVideos, {once:true});

const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.14});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${Math.max(0, Math.min(100, scrollY / max * 100))}%`; }, {passive:true});

document.querySelectorAll('.gallery img').forEach(img => img.addEventListener('click', () => { const box=document.createElement('div'); box.className='lightbox'; box.appendChild(img.cloneNode()); box.addEventListener('click',()=>box.remove()); document.body.appendChild(box); }));
function showToast(message){ let toast=document.querySelector('.toast'); if(!toast){toast=document.createElement('div');toast.className='toast';document.body.appendChild(toast);} toast.textContent=message; toast.classList.add('show'); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),3600); }
document.querySelectorAll('.support-action').forEach(btn=>btn.addEventListener('click',()=>showToast(btn.dataset.message || 'Support link is coming soon.')));
document.querySelectorAll('.share-action').forEach(btn=>btn.addEventListener('click',async()=>{ const shareData={title:'Trintope Universe',text:'Become part of Trintope Universe — Chapter I: The Ocean Kingdom.',url:location.href.split('#')[0]}; if(navigator.share){try{await navigator.share(shareData);return;}catch(e){}} try{await navigator.clipboard.writeText(shareData.url);showToast('Site link copied. Share the Universe.');}catch(e){showToast('Share this page with friends and help the Universe grow.');} }));
