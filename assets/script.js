
function toggleNav(){
  const ul = document.getElementById('navlist');
  const btn = document.querySelector('.nav-toggle');
  const open = ul.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}


document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('studies-root');
  if(!root) return;
  try{
    const res = await fetch('studies/studies.json', {cache:'no-store'});
    const data = await res.json();
    const items = (data && Array.isArray(data.studies)) ? data.studies : [];
    if(items.length === 0){
      root.innerHTML = '<article class="card"><p class="muted">No studies listed yet. Add files to <code>/studies</code> and entries to <code>studies/studies.json</code>.</p></article>';
      return;
    }
    root.classList.add('grid','two');
    for(const it of items){
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
  }catch(e){
    root.innerHTML = '<article class="card"><p class="muted">Could not load studies.json. Ensure the file exists at <code>/studies/studies.json</code>.</p></article>';
  }
});
