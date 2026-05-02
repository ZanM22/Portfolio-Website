/* ========================
   CONFIG
======================== */
const WA_NUMBER  = '6285161128325';
const EMAIL_ADDR = 'zanm84864@gmail.com';

/* ========================
   CUSTOM CURSOR
======================== */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && window.innerWidth > 600) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .svc-card, .tool-chip').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

/* ========================
   NAVBAR
======================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ========================
   HAMBURGER MENU
======================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ========================
   SCROLL REVEAL
======================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 4) * 0.1 + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ========================
   SKILL BARS
======================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-bars');
if (skillsSection) skillObserver.observe(skillsSection);

/* ========================
   ACTIVE NAV LINK
======================== */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      if (!link.classList.contains('nav-cta')) {
        link.style.color = '#818cf8';
      }
    }
  });
});

/* ========================
   ORDER FORM
======================== */
const btn    = document.getElementById('btn-submit');
const errBox = document.getElementById('form-error');

btn.addEventListener('click', () => {
  const name    = document.getElementById('f-name').value.trim();
  const contact = document.getElementById('f-contact').value.trim();
  const service = document.getElementById('f-service').value;
  const desc    = document.getElementById('f-desc').value.trim();
  const via     = document.querySelector('input[name="via"]:checked').value;

  if (!name || !contact || !service || !desc) {
    errBox.textContent = '⚠️ Please fill in all required fields.';
    errBox.style.display = 'block';
    return;
  }
  errBox.textContent = '';

  const msg =
    `Hello Fauzan! 👋\n\n` +
    `I'd like to order a service from your portfolio.\n\n` +
    `📌 *Order Details:*\n` +
    `• Name    : ${name}\n` +
    `• Contact : ${contact}\n` +
    `• Service : ${service}\n` +
    `• Notes   : ${desc}\n\n` +
    `Looking forward to hearing from you! 🙏`;

  if (via === 'wa') {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  } else {
    const sub  = encodeURIComponent(`[Order] ${service} — from ${name}`);
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${EMAIL_ADDR}?subject=${sub}&body=${body}`;
  }

  btn.textContent = '✅ Message Sent!';
  btn.classList.add('success');
  setTimeout(() => {
    btn.textContent = '🚀 Send Message';
    btn.classList.remove('success');
    document.getElementById('f-name').value    = '';
    document.getElementById('f-contact').value = '';
    document.getElementById('f-service').value = '';
    document.getElementById('f-desc').value    = '';
  }, 3000);
});

/* ========================
   HAMBURGER CSS TOGGLE
======================== */
const style = document.createElement('style');
style.textContent = `
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(style);
