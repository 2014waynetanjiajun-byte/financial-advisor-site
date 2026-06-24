// Animate stat numbers when they scroll into view
const statNumbers = document.querySelectorAll('.stat-number');

function animateValue(el, target) {
  const isDecimal = target % 1 !== 0;
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * progress;
    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : target;
    }
  }
  requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.dataset.target);
      if (!Number.isNaN(target) && target !== 0) {
        animateValue(entry.target, target);
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach((el) => observer.observe(el));

// Tool links (placeholder hrefs until real tool URLs are added)
document.querySelectorAll('.tool-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
      alert('This tool link is not set up yet. Replace the href in tools.html with the live URL.');
    }
  });
});

// Contact form (placeholder behavior)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received. (Connect this form to an email service or backend to receive real submissions.)');
    form.reset();
  });
}
