const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('loader--hidden'), 900);
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to('.hero__bg', {
    scale: 1,
    duration: 1.8,
    ease: 'power3.out'
  });

  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i < 6 ? i * 0.08 : 0,
      ease: 'power2.out',
      scrollTrigger: i < 6 ? undefined : {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

const tiltCards = document.querySelectorAll('.tilt');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rotateY = ((x / r.width) - 0.5) * 11;
    const rotateX = (0.5 - (y / r.height)) * 11;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

const slides = [...document.querySelectorAll('.review')];
let activeSlide = 0;
setInterval(() => {
  slides[activeSlide].classList.remove('is-active');
  activeSlide = (activeSlide + 1) % slides.length;
  slides[activeSlide].classList.add('is-active');
}, 4200);

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery__item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightbox.showModal();
  });
});

lightboxClose.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
