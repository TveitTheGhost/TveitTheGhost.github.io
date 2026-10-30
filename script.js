// Project cards are generated from projects.json, which the GitHub profile's
// auto-update workflow also reads, so adding a project there updates both.
// Set `live` to a URL once a project has a public demo, and a "Live demo" link appears.
// Projects with `private: true` show a lock label instead of a code link; remove it
// once the repo is public.
let projects = [];

const grid = document.getElementById('project-grid');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// A fake terminal window for CLI projects. `lines` is a list of [style, text] pairs.
function terminalPreview(lines) {
  const term = el('div', 'terminal mono');
  term.setAttribute('aria-hidden', 'true');
  const dots = el('div', 'dots');
  dots.append(el('span'), el('span'), el('span'));
  term.append(dots, ...lines.map(([style, text]) => el('div', style, text)));
  return term;
}

function renderProject(project, index) {
  const card = el('article', 'project card');
  card.style.animationDelay = `${index * 60}ms`;

  const thumb = el('div', 'thumb');
  if (project.terminal) {
    thumb.appendChild(terminalPreview(project.terminal));
  } else {
    const img = el('img');
    img.src = project.image;
    img.alt = `${project.name} screenshot`;
    img.loading = 'lazy';
    thumb.appendChild(img);
  }

  const body = el('div', 'project-body');
  const title = el('h3');
  title.append(el('span', '', project.emoji), project.name);

  const highlights = el('ul', 'highlights');
  project.highlights.forEach((h) => highlights.appendChild(el('li', '', h)));

  const tags = el('div', 'tags');
  project.tags.forEach((t) => tags.appendChild(el('span', 'tag', t)));

  const links = el('div', 'project-links');
  if (project.private) {
    const lock = el('span', 'private', '🔒 Private repo');
    lock.title = 'Source code is private for now';
    links.appendChild(lock);
  } else {
    const repo = el('a', '', 'Code ↗');
    repo.href = project.repo;
    repo.target = '_blank';
    repo.rel = 'noopener';
    links.appendChild(repo);
  }
  if (project.live) {
    const live = el('a', '', 'Live demo ↗');
    live.href = project.live;
    live.target = '_blank';
    live.rel = 'noopener';
    links.appendChild(live);
  }

  body.append(title, el('p', '', project.description), highlights, tags, links);
  card.append(thumb, body);
  return card;
}

function render(filter = 'all') {
  grid.innerHTML = '';
  projects
    .filter((p) => filter === 'all' || p.categories.includes(filter))
    .forEach((p, i) => grid.appendChild(renderProject(p, i)));
}

async function loadProjects() {
  try {
    const res = await fetch('projects.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.statusText);
    projects = await res.json();
  } catch {
    grid.appendChild(el('p', 'muted', "Couldn't load projects right now. Please refresh the page."));
    return;
  }
  document.getElementById('stat-projects').textContent = projects.length;
  document.getElementById('stat-tests').textContent = projects.reduce((sum, p) => sum + (p.tests ?? 0), 0);
  render();
}

document.querySelectorAll('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === btn));
    render(btn.dataset.filter);
  });
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
});

document.getElementById('year').textContent = new Date().getFullYear();

loadProjects();
