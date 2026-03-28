// Sidebar active link tracking
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.docs-section');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;

  let current = '';
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      current = section.getAttribute('id');
    }
  });

  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Mobile sidebar toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('docs-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarBackdrop.classList.toggle('open');
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  });
}

// Close sidebar on link click (mobile)
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      sidebarBackdrop.classList.remove('open');
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Copy buttons for code blocks
document.querySelectorAll('.code-block-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.closest('.code-block');
    const code = block.querySelector('pre').textContent;
    navigator.clipboard.writeText(code).then(() => {
      const original = btn.innerHTML;
      btn.classList.add('copied');
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 2000);
    });
  });
});

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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
