// Basic slide navigation and deep-linking
(function(){
  const slidesEl = document.getElementById('slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progressFill = document.querySelector('.progress-fill');

  let index = 0;

  function clamp(n){ return Math.max(0, Math.min(total - 1, n)); }

  function update() {
    index = clamp(index);
    slidesEl.style.transform = `translateX(-${index * 100}vw)`;
    const fill = Math.round(((index + 1) / total) * 100);
    if (progressFill) progressFill.style.width = fill + '%';
    history.replaceState(null, '', `#${index + 1}`);
  }

  function go(n){
    index = n;
    update();
  }
  function next(){ go(index + 1) }
  function prev(){ go(index - 1) }

  // click navigation (click left/right half)
  slidesEl.addEventListener('click', (e) => {
    const rect = slidesEl.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) next();
    else prev();
  });

  // button navigation
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

  // keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
    if (e.key === 'Home') go(0);
    if (e.key === 'End') go(total - 1);
  });

  // on load, read hash like #3
  const h = parseInt(location.hash.replace('#',''), 10);
  if (!isNaN(h) && h >= 1 && h <= total) index = h - 1;
  update();

  // ensure viewport alignment on resize
  window.addEventListener('resize', update);
})();