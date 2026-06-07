/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);
});

/* ── FOOTER YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400);
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinkEls.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => obs.observe(s));

/* ── TYPING ANIMATION ── */
const phrases = ['data stories.', 'ML pipelines.', 'predictive models.', 'interactive dashboards.', 'actionable insights.'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typedText');
function type() {
  const phrase = phrases[pi];
  el.textContent = deleting ? phrase.slice(0, --ci) : phrase.slice(0, ++ci);
  let delay = deleting ? 60 : 90;
  if (!deleting && ci === phrase.length) { delay = 2000; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
setTimeout(type, 1200);

/* ── REVEAL ON SCROLL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── SKILL BAR ANIMATION ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sb-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.proficiency').forEach(el => barObs.observe(el));

/* ── BACK TO TOP ── */
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── CONTACT FORM ── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  let valid = true;

  const fields = [
    { id: 'cfName',    errId: 'nameErr',  check: v => v.trim().length > 1 },
    { id: 'cfEmail',   errId: 'emailErr', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'cfMessage', errId: 'msgErr',   check: v => v.trim().length > 9 },
  ];

  fields.forEach(({ id, errId, check }) => {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    const ok = check(input.value);
    input.classList.toggle('error', !ok);
    err.classList.toggle('show', !ok);
    if (!ok) valid = false;
  });

  if (valid) {
    console.log('Form data:', Object.fromEntries(new FormData(form)));
    form.reset();
    document.getElementById('formSuccess').classList.add('show');
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }
});
