/* ========================
   CONFIG — Ubah di sini
======================== */
const WA_NUMBER  = '6285161128325';       // Nomor WhatsApp Fauzan
const EMAIL_ADDR = 'zanm84864@gmail.com'; // Email Fauzan

/* ========================
   NAVBAR — scroll effect
======================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ========================
   HAMBURGER MENU
======================== */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ========================
   SCROLL REVEAL
======================== */
const revealEls = () => {
  // Add reveal class to target elements
  const targets = document.querySelectorAll(
    '#about .about-grid > *, .timeline-item, ' +
    '.skill-card, .service-card, .contact-card, ' +
    '.order-form, .section-label, .section-title, .section-sub'
  );
  targets.forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      const delay = ['reveal-d1','reveal-d2','reveal-d3','reveal-d4','reveal-d5','reveal-d6'];
      el.classList.add(delay[i % 6]);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

/* ========================
   SKILL BAR ANIMATION
======================== */
const animateSkillBars = () => {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.width;
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
};

/* ========================
   ACTIVE NAV LINK
======================== */
const setActiveNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        if (!link.classList.contains('nav-cta')) {
          link.style.color = 'var(--sage-dark)';
        }
      }
    });
  });
};

/* ========================
   ORDER FORM — WA & Email
======================== */
const initOrderForm = () => {
  const btn       = document.getElementById('btn-submit');
  const errBox    = document.getElementById('form-error');

  btn.addEventListener('click', () => {
    const name    = document.getElementById('f-name').value.trim();
    const contact = document.getElementById('f-contact').value.trim();
    const service = document.getElementById('f-service').value;
    const desc    = document.getElementById('f-desc').value.trim();
    const sendVia = document.querySelector('input[name="send-via"]:checked').value;

    // Validation
    if (!name || !contact || !service || !desc) {
      errBox.textContent = '⚠️ Semua field bertanda * wajib diisi ya!';
      errBox.style.display = 'block';
      return;
    }
    errBox.textContent = '';

    // Build message
    const msg =
      `Halo Fauzan! 👋\n\n` +
      `Saya ingin memesan layanan dari portofolio Anda.\n\n` +
      `📌 *Detail Order:*\n` +
      `• Nama      : ${name}\n` +
      `• Kontak    : ${contact}\n` +
      `• Layanan   : ${service}\n` +
      `• Keterangan: ${desc}\n\n` +
      `Mohon info lebih lanjutnya, terima kasih! 🙏`;

    if (sendVia === 'wa') {
      // Open WhatsApp
      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank');
    } else {
      // Open Email client
      const subject = encodeURIComponent(`[Order] ${service} — dari ${name}`);
      const body    = encodeURIComponent(msg);
      window.location.href = `mailto:${EMAIL_ADDR}?subject=${subject}&body=${body}`;
    }

    // Success feedback
    btn.textContent = '✅ Berhasil Dikirim!';
    btn.classList.add('success');

    setTimeout(() => {
      btn.textContent = '🚀 Kirim Sekarang';
      btn.classList.remove('success');
      // Clear form
      document.getElementById('f-name').value    = '';
      document.getElementById('f-contact').value = '';
      document.getElementById('f-service').value = '';
      document.getElementById('f-desc').value    = '';
    }, 3000);
  });
};

/* ========================
   DIRECT CONTACT CARD WA LINK
======================== */
const setupDirectLinks = () => {
  // Quick WA link from hero button (if any)
  const heroWA = document.querySelector('.btn-primary[href="#contact"]');
  if (heroWA) {
    // Keep as scroll anchor, that's fine
  }
};

/* ========================
   INIT
======================== */
document.addEventListener('DOMContentLoaded', () => {
  revealEls();
  animateSkillBars();
  setActiveNavLink();
  initOrderForm();
  setupDirectLinks();
});
