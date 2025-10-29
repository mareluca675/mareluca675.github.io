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

// ===================================
// Language Switching System
// ===================================

const translations = {
  ro: {
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.team': 'Echipa',
    'nav.app': 'Aplicația',
    'nav.docs': 'Documentație',
    'nav.studies': 'Studii',
    'nav.contact': 'Contact',

    'hero.subtitle': 'Monitorizare Faunei Sălbatice prin Inteligență Artificială',
    'hero.description': 'Protejarea comunităților și conservarea faunei sălbatice prin tehnologie avansată de detectare în Munții Carpați',
    'hero.badge': 'FAZA DE PROTOTIPARE',
    'hero.btn1': 'Explorează Misiunea Noastră',
    'hero.btn2': 'Cum Funcționează',
    'hero.scroll': 'Derulează pentru a explora',

    'stats.detections': 'Evenimente de Detectare',
    'stats.detections.desc': 'Observări de urși monitorizate în România anul acesta',
    'stats.accuracy': 'Acuratețe de Detectare',
    'stats.accuracy.desc': 'Inteligență artificială de ultimă generație asigură fiabilitatea',
    'stats.monitoring': 'Monitorizare în Timp Real',
    'stats.monitoring.desc': 'Supraveghere continuă pentru siguranța ta',

    'mission.title': 'Misiunea Noastră',
    'mission.subtitle': 'Protejarea faunei sălbatice din România prin tehnologie AI inovatoare',
    'mission.heading': 'Conservare Inteligentă pentru Carpați',
    'mission.p1': 'România găzduiește cea mai mare populație de urși bruni din Europa—peste 6.000 de exemplare care trăiesc în Munții Carpați. Pe măsură ce activitățile umane se extind în aceste zone sălbatice, nevoia de monitorizare inteligentă în timp real nu a fost niciodată mai mare.',
    'mission.p2': 'BearAware folosește AI avansat pentru a detecta urșii instantaneu, alertând comunitățile și protejând atât oamenii, cât și fauna sălbatică. Sistemul nostru funcționează 24/7, furnizând date critice pentru eforturile de conservare, menținând în siguranță drumeții și rezidenții.',
    'mission.feature1': 'Sistem fix cu ultrasunete și infrasunete',
    'mission.feature2': 'Dronă cu cameră termică și soluție naturală',
    'mission.feature3': 'Aplicație mobilă cu hartă în timp real',
    'mission.btn': 'Află Mai Multe Despre Munca Noastră',
    'mission.bears': 'Urși în România',

    'tech.title': 'Tehnologia Noastră',
    'tech.subtitle': 'Detectare bazată pe AI combinată cu acces mobil ușor de utilizat',
    'tech.fixed.title': 'Sistem Fix de Detectare',
    'tech.fixed.desc': 'Unități instalate pe stâlpi cu ultrasunete, infrasunete și recunoaștere AI bazată pe YOLOv8. Procesează video în timp real cu acuratețe de 98%, trimițând alerte instant prin Firebase.',
    'tech.drone.title': 'Sistem Mobil (Dronă)',
    'tech.drone.desc': 'Dronă cu cameră termică și RGB, soluție repelentă naturală pe bază de mentol. Detectare aeriană autonomă și intervenție rapidă în zone extinse.',
    'tech.app.title': 'Aplicație Mobilă',
    'tech.app.desc': 'Platformă mobilă React cu hărți interactive, alerte în timp real și chatbot educațional AI. Disponibilă pentru drumeți, rangeri și comunități locale.',
    'tech.btn': 'Vezi Documentația',
    'tech.app.btn': 'Vezi Aplicația',
    'tech.how.title': 'Cum Funcționează',
    'tech.how.step1': 'Rețea de Camere',
    'tech.how.step1.desc': 'Monitorizează zone cu trafic intens',
    'tech.how.step2': 'Detectare AI',
    'tech.how.step2.desc': 'YOLOv8 analizează cadre instant',
    'tech.how.step3': 'Alerte Instant',
    'tech.how.step3.desc': 'Firebase trimite notificări',
    'tech.how.step4': 'Afișare Mobilă',
    'tech.how.step4.desc': 'Locații în timp real pe hărți',

    'cta.title': 'Alătură-te Misiunii Noastre',
    'cta.text': 'Ajută-ne să protejăm fauna sălbatică și comunitățile din România. Fie că ești programator, cercetător, sau pasionat de conservare, există un loc pentru tine în misiunea noastră.',
    'cta.btn1': 'Contribuie pe GitHub',
    'cta.btn2': 'Contactează-ne',

    'footer.tagline': 'Protejarea faunei sălbatice și a comunităților prin tehnologie AI inovatoare',
    'footer.projects': 'Proiecte',
    'footer.system': 'Sistem de Detectare AI',
    'footer.app': 'Aplicație Mobilă',
    'footer.resources': 'Resurse',
    'footer.contact': 'Contact',
    'footer.contact.link': 'Formular de Contact',
    'footer.location': 'Munții Carpați, România',
    'footer.legal': 'Legal',
    'footer.privacy': 'Politica de Confidențialitate',
    'footer.terms': 'Termeni și Condiții',
    'footer.copyright': 'Facem conservarea faunei sălbatice mai inteligentă.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.app': 'App',
    'nav.docs': 'Docs',
    'nav.studies': 'Studies',
    'nav.contact': 'Contact',

    'hero.subtitle': 'AI-Powered Wildlife Monitoring',
    'hero.description': 'Protecting communities and conserving wildlife through cutting-edge detection technology in the Carpathian Mountains',
    'hero.badge': 'PROTOTYPING PHASE',
    'hero.btn1': 'Explore Our Mission',
    'hero.btn2': 'How It Works',
    'hero.scroll': 'Scroll to explore',

    'stats.detections': 'Detection Events',
    'stats.detections.desc': 'Bear sightings monitored across Romania this year',
    'stats.accuracy': 'Detection Accuracy',
    'stats.accuracy.desc': 'State-of-the-art AI ensures reliability',
    'stats.monitoring': 'Real-Time Monitoring',
    'stats.monitoring.desc': 'Continuous surveillance for your safety',

    'mission.title': 'Our Mission',
    'mission.subtitle': 'Protecting Romania\'s wildlife through innovative AI technology',
    'mission.heading': 'Smart Conservation for the Carpathians',
    'mission.p1': 'Romania is home to Europe\'s largest brown bear population—over 6,000 individuals living in the Carpathian Mountains. As human activities expand into these wilderness areas, the need for intelligent, real-time monitoring has never been greater.',
    'mission.p2': 'BearAware uses advanced AI to detect bears instantly, alerting communities and protecting both people and wildlife. Our system runs 24/7, providing critical data for conservation efforts while keeping hikers and residents safe.',
    'mission.feature1': 'Fixed system with ultrasound and infrasound',
    'mission.feature2': 'Drone with thermal camera and natural solution',
    'mission.feature3': 'Mobile app with real-time map',
    'mission.btn': 'Learn More About Our Work',
    'mission.bears': 'Bears in Romania',

    'tech.title': 'Our Technology',
    'tech.subtitle': 'AI-powered detection meets user-friendly mobile access',
    'tech.fixed.title': 'Fixed Detection System',
    'tech.fixed.desc': 'Pole-mounted units with ultrasound, infrasound and YOLOv8-based AI recognition. Processes video in real-time with 98% accuracy, sending instant alerts via Firebase.',
    'tech.drone.title': 'Mobile System (Drone)',
    'tech.drone.desc': 'Drone with thermal and RGB camera, natural menthol-based repellent solution. Autonomous aerial detection and rapid intervention in extended areas.',
    'tech.app.title': 'Mobile Application',
    'tech.app.desc': 'React mobile platform with interactive maps, real-time alerts and educational AI chatbot. Available for hikers, rangers and local communities.',
    'tech.btn': 'View Documentation',
    'tech.app.btn': 'View App',
    'tech.how.title': 'How It Works',
    'tech.how.step1': 'Camera Network',
    'tech.how.step1.desc': 'Monitors high-traffic areas',
    'tech.how.step2': 'AI Detection',
    'tech.how.step2.desc': 'YOLOv8 analyzes frames instantly',
    'tech.how.step3': 'Instant Alerts',
    'tech.how.step3.desc': 'Firebase sends notifications',
    'tech.how.step4': 'Mobile Display',
    'tech.how.step4.desc': 'Real-time locations on maps',

    'cta.title': 'Join Our Mission',
    'cta.text': 'Help us protect Romania\'s wildlife and communities. Whether you\'re a developer, researcher, or conservation enthusiast, there\'s a place for you in our mission.',
    'cta.btn1': 'Contribute on GitHub',
    'cta.btn2': 'Contact Us',

    'footer.tagline': 'Protecting wildlife and communities through innovative AI technology',
    'footer.projects': 'Projects',
    'footer.system': 'AI Detection System',
    'footer.app': 'Mobile Application',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact',
    'footer.contact.link': 'Contact Form',
    'footer.location': 'Carpathian Mountains, Romania',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    'footer.copyright': 'Making wildlife conservation smarter.'
  }
};

// Get current language from localStorage or default to Romanian
let currentLang = localStorage.getItem('language') || 'ro';

// Function to change language
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update language button text
  const langBtn = document.getElementById('currentLang');
  if (langBtn) {
    langBtn.textContent = lang.toUpperCase();
  }

  // Update page title
  if (lang === 'ro') {
    document.title = 'BearAware Romania - Sistem AI de Protecție pentru Faună Sălbatică';
  } else {
    document.title = 'BearAware Romania - AI-Powered Wildlife Protection System';
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  changeLanguage(currentLang);

  // Add event listener to language toggle button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'ro' ? 'en' : 'ro';
      changeLanguage(newLang);
    });
  }
});
