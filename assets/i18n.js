const I18N = (function(){
  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem('lang') || DEFAULT_LANG;
  let translations = {};

  async function load(lang){
    try{
      const res = await fetch(`assets/i18n/${lang}.json`, {cache:'no-store'});
      translations = await res.json();
      currentLang = lang;
      localStorage.setItem('lang', lang);
      apply();
    }catch(e){
      console.warn('i18n load failed, falling back to default', e);
      if(lang !== DEFAULT_LANG) return load(DEFAULT_LANG);
    }
  }

  function t(key){
    return key.split('.').reduce((acc, k) => (acc && acc[k] != null) ? acc[k] : null, translations) || key;
  }

  function apply(){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if(val == null) return;
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){
        const attr = el.getAttribute('data-i18n-attr') || 'placeholder';
        el.setAttribute(attr, val);
      }else{
        el.innerHTML = val;
      }
    });
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    const selector = document.getElementById('langSelect');
    if(selector){ selector.value = currentLang; }
  }

  function init(){
    const selector = document.getElementById('langSelect');
    if(selector){
      selector.addEventListener('change', (e) => load(e.target.value));
    }
    load(currentLang);
  }

  return { init, load, t };
})();

document.addEventListener('DOMContentLoaded', () => {
  I18N.init();
});


