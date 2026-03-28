// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3.5 3.5 6.5-8"/></svg>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M5 11H3.5A1.5 1.5 0 012 9.5v-7A1.5 1.5 0 013.5 1h7A1.5 1.5 0 0112 2.5V5"/></svg>';
      }, 2000);
    });
  });
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.feature-card, .philosophy-card, .cli-card, .step, .constraint, .agent-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Stagger animation for grid items
const gridObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('.feature-card, .cli-card, .constraint');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 50}ms`;
          child.classList.add('visible');
        });
        gridObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

document.querySelectorAll('.features-grid, .cli-grid, .constraints-grid').forEach(grid => {
  gridObserver.observe(grid);
});
