// ===================================
// BearAware Romania - Interactive JS
// ===================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isActive);
  });

  // Close mobile menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Navbar Background Change on Scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
  });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  let hasDecimal = false;

  // Check if target has decimal points
  if (target % 1 !== 0) {
    hasDecimal = true;
  }

  function updateCounter() {
    start += increment;
    if (start < target) {
      if (hasDecimal) {
        element.textContent = start.toFixed(1);
      } else {
        element.textContent = Math.ceil(start).toLocaleString();
      }
      requestAnimationFrame(updateCounter);
    } else {
      if (hasDecimal) {
        element.textContent = target.toFixed(1);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
  }

  updateCounter();
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Observer for general scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer for stat counters
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find all stat numbers in this section
      const statNumbers = entry.target.querySelectorAll('.stat-number, .impact-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!isNaN(target) && target > 0 && stat.textContent === '0') {
          animateCounter(stat, target, 2500);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // Animate statistics
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Animate impact statistics
  const impactSection = document.querySelector('.impact-section');
  if (impactSection) {
    statsObserver.observe(impactSection);
  }

  // Load studies if on studies page
  const studiesRoot = document.getElementById('studies-root');
  if (studiesRoot) {
    loadStudies(studiesRoot);
  }
});

// Studies Loading Function
async function loadStudies(root) {
  try {
    const res = await fetch('studies/studies.json', { cache: 'no-store' });
    const data = await res.json();
    const items = (data && Array.isArray(data.studies)) ? data.studies : [];

    if (items.length === 0) {
      root.innerHTML = '<article class="card"><p class="muted">No studies listed yet. Add files to <code>/studies</code> and entries to <code>studies/studies.json</code>.</p></article>';
      return;
    }

    root.classList.add('grid', 'two');

    for (const it of items) {
      const ext = (it.filename || '').split('.').pop().toLowerCase();
      const isPdf = ext === 'pdf';
      const tags = (it.tags || []).map(t => `<span class="tag">#${t}</span>`).join('');
      const meta = [
        it.authors ? it.authors : null,
        it.year ? it.year : null
      ].filter(Boolean).join(' · ');

      const card = document.createElement('article');
      card.className = 'study-card';
      card.innerHTML = `
        <h3>${it.title || it.filename || 'Untitled study'}</h3>
        <p class="study-meta">${meta || ''}</p>
        <div>${tags}</div>
        <div class="study-actions">
          <a href="studies/${it.filename}" download>Download</a>
          <a href="studies/${it.filename}" target="_blank" rel="noopener">Open</a>
        </div>
        ${isPdf ? `<div class="study-preview"><iframe src="studies/${it.filename}"></iframe></div>` : ''}
      `;
      root.appendChild(card);
    }
  } catch (e) {
    root.innerHTML = '<article class="card"><p class="muted">Could not load studies.json. Ensure the file exists at <code>/studies/studies.json</code>.</p></article>';
  }
}

// Parallax Effect for Hero Section (optional)
window.addEventListener('scroll', () => {
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.scrollY < window.innerHeight) {
    const scrolled = window.scrollY;
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
