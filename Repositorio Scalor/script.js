// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('pt-BR');
  }, 16);
}

const counters = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(animateCounter);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => heroObserver.observe(c));

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.feature-card, .step, .testi-card, .pricing-card');
reveals.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── PRICING TOGGLE ──
const toggle = document.getElementById('billingToggle');
const amounts = document.querySelectorAll('.price-amount[data-monthly]');
toggle.addEventListener('change', () => {
  const key = toggle.checked ? 'annual' : 'monthly';
  amounts.forEach(el => {
    const val = +el.dataset[key];
    el.textContent = val.toLocaleString('pt-BR');
  });
});

// ── SMOOTH NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      mobileMenu.classList.remove('open');
    }
  });
});

// ── BUTTON RIPPLE ──
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;width:4px;height:4px;border-radius:50%;
      background:rgba(255,255,255,0.5);
      top:${e.clientY - rect.top}px;left:${e.clientX - rect.left}px;
      transform:scale(0);animation:rippleAnim 0.6s ease-out forwards;
      pointer-events:none;
    `;
    if (!this.style.position) this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = '@keyframes rippleAnim { to { transform: scale(80); opacity: 0; } }';
document.head.appendChild(style);
