const $ = (selector, scope = document) => scope.querySelector(selector);
const loader = $('.page-loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 350));

const nav = $('.nav-wrap');
const backTop = $('.back-top');
const sections = [...document.querySelectorAll('main section[id], main section.hero')];
const links = [...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 35);
  backTop.classList.toggle('visible', window.scrollY > 600);
  let current = 'top';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 180) current = section.id || 'top'; });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}, { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.hero-reveal').forEach((el, i) => setTimeout(() => el.classList.add('visible'), 650 + i * 140));

$('.menu-toggle').addEventListener('click', e => { const open = $('.nav-links').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', open); });
links.forEach(link => link.addEventListener('click', () => $('.nav-links').classList.remove('open')));
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
$('#year').textContent = new Date().getFullYear();

$('.contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $('.form-status', form);
  if (!form.checkValidity()) { form.reportValidity(); return; }
  status.textContent = 'Thanks — your message is ready to send.';
  form.reset();
});
