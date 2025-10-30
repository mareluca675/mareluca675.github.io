// ================================================
// BearAware Romania - Clean JavaScript
// ================================================

// ================================================
// Navigation
// ================================================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile navigation toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking links
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// ================================================
// Scroll Animations
// ================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ================================================
// Counter Animation
// ================================================

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target.toLocaleString('ro-RO');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString('ro-RO');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      if (counter.textContent === '0') {
        animateCounter(counter);
      }
      counterObserver.unobserve(counter);
    }
  });
}, observerOptions);

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// ================================================
// Language Switching
// ================================================

const translations = {
  ro: {
    // Navigation
    'nav.home': 'Acasă',
    'nav.about': 'Despre',
    'nav.team': 'Echipa',
    'nav.app': 'Aplicația',
    'nav.docs': 'Documentație',
    'nav.studies': 'Studii',
    'nav.contact': 'Contact',

    // Hero
    'hero.badge': 'FAZĂ DE PROTOTIPARE',
    'hero.title': 'Protejăm fauna sălbatică prin inteligență artificială',
    'hero.description': 'Sistem integrat de detectare și monitorizare a urșilor pentru comunități sigure și conservare responsabilă în Munții Carpați',
    'hero.cta1': 'Descoperă Proiectul',
    'hero.cta2': 'Documentație Tehnică',

    // Stats
    'stats.bears': 'Urși în România',
    'stats.bears.desc': 'Cea mai mare populație de urși bruni din Europa',
    'stats.accuracy': 'Acuratețe AI',
    'stats.accuracy.desc': 'Detectare precisă cu YOLOv8',
    'stats.monitoring': 'Monitorizare',
    'stats.monitoring.desc': 'Supraveghere continuă în timp real',

    // Problem
    'problem.title': 'Provocarea',
    'problem.subtitle': 'Urșii au părăsit pădurile și se apropie tot mai mult de localități, devenind dependenți de hrană umană. Numărul urșilor a crescut peste 6.000, iar conflictele om-urs sunt în creștere.',

    // Solution
    'solution.system1': 'Sistem Fix',
    'solution.system1.desc': 'Unități instalate pe stâlpi cu ultrasunete, infrasunete și AI pentru detectare automată. Emit sunete intermitent pentru a îndepărta urșii fără a-i răni.',
    'solution.system2': 'Sistem Mobil',
    'solution.system2.desc': 'Dronă echipată cu camere termice și RGB, soluție naturală pe bază de mentol. Intervenție rapidă și monitorizare aeriană în zone extinse.',
    'solution.system3': 'Aplicație Mobilă',
    'solution.system3.desc': 'Hartă interactivă în timp real, alerte instant, chatbot educațional AI. Disponibilă pentru drumeți, rangeri și comunități locale.',

    // Technology
    'tech.title': 'Tehnologie Avansată',
    'tech.subtitle': 'Combinăm AI, IoT și soluții naturale pentru o abordare etică și eficientă',
    'tech.ai': 'YOLOv8 AI',
    'tech.ai.desc': 'Rețea neuronală convoluțională pentru detectare în timp real cu 98% acuratețe',
    'tech.ultrasound': 'Ultrasunete/Infrasunete',
    'tech.ultrasound.desc': 'Frecvențe de 21 kHz emise intermitent pentru îndepărtare non-letală',
    'tech.menthol': 'Soluție Mentolată',
    'tech.menthol.desc': 'Repelent natural pe bază de mentol, mentonă și eucaliptol pentru îndepărtare sigură',
    'tech.firebase': 'Firebase & React',
    'tech.firebase.desc': 'Realtime database, cloud functions și aplicație React Native pentru alerte instant',

    // How It Works
    'how.title': 'Cum Funcționează',
    'how.step1': 'Detectare',
    'how.step1.desc': 'Camere monitorizează zonele cu risc',
    'how.step2': 'Analiză AI',
    'how.step2.desc': 'YOLOv8 identifică urșii',
    'how.step3': 'Alertă',
    'how.step3.desc': 'Notificări în timp real',
    'how.step4': 'Acțiune',
    'how.step4.desc': 'Îndepărtare non-letală',

    // CTA
    'cta.title': 'Alătură-te Proiectului',
    'cta.description': 'Contribuie la protejarea faunei sălbatice și a comunităților din România prin tehnologie open-source',
    'cta.github': 'Vezi pe GitHub',
    'cta.contact': 'Contactează-ne',

    // Footer
    'footer.tagline': 'Protejăm fauna sălbatică și comunitățile prin tehnologie AI inovatoare',
    'footer.project': 'Proiect',
    'footer.resources': 'Resurse',
    'footer.contact': 'Contact',
    'footer.contact.form': 'Formular Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Confidențialitate',
    'footer.terms': 'Termeni',
    'footer.copyright': 'Conservare inteligentă pentru Carpați.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.app': 'App',
    'nav.docs': 'Documentation',
    'nav.studies': 'Studies',
    'nav.contact': 'Contact',

    // Hero
    'hero.badge': 'PROTOTYPING PHASE',
    'hero.title': 'Protecting wildlife through artificial intelligence',
    'hero.description': 'Integrated bear detection and monitoring system for safe communities and responsible conservation in the Carpathian Mountains',
    'hero.cta1': 'Discover the Project',
    'hero.cta2': 'Technical Documentation',

    // Stats
    'stats.bears': 'Bears in Romania',
    'stats.bears.desc': 'Europe\'s largest brown bear population',
    'stats.accuracy': 'AI Accuracy',
    'stats.accuracy.desc': 'Precise detection with YOLOv8',
    'stats.monitoring': 'Monitoring',
    'stats.monitoring.desc': 'Continuous real-time surveillance',

    // Problem
    'problem.title': 'The Challenge',
    'problem.subtitle': 'Bears have left the forests and are increasingly approaching settlements, becoming dependent on human food. The bear population has grown beyond 6,000, and human-bear conflicts are on the rise.',

    // Solution
    'solution.system1': 'Fixed System',
    'solution.system1.desc': 'Pole-mounted units with ultrasound, infrasound and AI for automatic detection. Emit intermittent sounds to deter bears without harming them.',
    'solution.system2': 'Mobile System',
    'solution.system2.desc': 'Drone equipped with thermal and RGB cameras, natural menthol-based solution. Rapid intervention and aerial monitoring in extended areas.',
    'solution.system3': 'Mobile Application',
    'solution.system3.desc': 'Real-time interactive map, instant alerts, educational AI chatbot. Available for hikers, rangers and local communities.',

    // Technology
    'tech.title': 'Advanced Technology',
    'tech.subtitle': 'We combine AI, IoT and natural solutions for an ethical and efficient approach',
    'tech.ai': 'YOLOv8 AI',
    'tech.ai.desc': 'Convolutional neural network for real-time detection with 98% accuracy',
    'tech.ultrasound': 'Ultrasound/Infrasound',
    'tech.ultrasound.desc': '21 kHz frequencies emitted intermittently for non-lethal deterrence',
    'tech.menthol': 'Menthol Solution',
    'tech.menthol.desc': 'Natural repellent based on menthol, menthone and eucalyptol for safe deterrence',
    'tech.firebase': 'Firebase & React',
    'tech.firebase.desc': 'Realtime database, cloud functions and React Native app for instant alerts',

    // How It Works
    'how.title': 'How It Works',
    'how.step1': 'Detection',
    'how.step1.desc': 'Cameras monitor risk areas',
    'how.step2': 'AI Analysis',
    'how.step2.desc': 'YOLOv8 identifies bears',
    'how.step3': 'Alert',
    'how.step3.desc': 'Real-time notifications',
    'how.step4': 'Action',
    'how.step4.desc': 'Non-lethal deterrence',

    // CTA
    'cta.title': 'Join the Project',
    'cta.description': 'Contribute to protecting wildlife and communities in Romania through open-source technology',
    'cta.github': 'View on GitHub',
    'cta.contact': 'Contact Us',

    // Footer
    'footer.tagline': 'Protecting wildlife and communities through innovative AI technology',
    'footer.project': 'Project',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact',
    'footer.contact.form': 'Contact Form',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': 'Smart conservation for the Carpathians.'
  }
};

let currentLang = localStorage.getItem('lang') || 'ro';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Update all translated elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang]?.[key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update language button
  const langText = document.getElementById('langText');
  if (langText) {
    langText.textContent = lang.toUpperCase();
  }
}

// Language toggle
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'ro' ? 'en' : 'ro');
  });
}

// Initialize language
setLanguage(currentLang);
