// Lightweight interactivity for the church site
document.addEventListener('DOMContentLoaded', ()=>{
  // set current year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('main-nav');
  menuBtn.addEventListener('click', ()=>{
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // donation modal
  const donateBtn = document.getElementById('donate-btn');
  const modal = document.getElementById('donation-modal');
  const modalCloses = modal.querySelectorAll('.modal-close');
  function showModal(){ modal.setAttribute('aria-hidden','false'); }
  function hideModal(){ modal.setAttribute('aria-hidden','true'); }
  donateBtn.addEventListener('click', (e)=>{ e.preventDefault(); showModal(); });
  modalCloses.forEach(b=>b.addEventListener('click', hideModal));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) hideModal(); });

  // simple carousel
  const track = document.querySelector('#events-carousel .carousel-track');
  const items = Array.from(track.children);
  let index = 0;
  function updateCarousel(){
    items.forEach((it,i)=>{
      it.classList.toggle('active', i===index);
      it.style.order = i - index;
    });
  }
  updateCarousel();
  document.querySelectorAll('#events-carousel .carousel-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const dir = Number(btn.dataset.dir);
      index = (index + dir + items.length) % items.length;
      updateCarousel();
    });
  });

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  },{threshold:0.15});
  reveals.forEach(r=>obs.observe(r));

  // contact form (local only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    if(!data.get('name') || !data.get('email') || !data.get('message')){
      status.textContent = 'Please complete all fields.'; return;
    }
    status.textContent = 'Sending…';
    // simulate send
    setTimeout(()=>{ status.textContent = 'Thanks — we will be in touch.'; form.reset(); }, 900);
  });
});
