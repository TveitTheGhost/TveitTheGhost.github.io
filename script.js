// All project cards are generated from this list, so adding a project is one new entry.
// Set `live` to a URL once a project has a public demo, and a "Live demo" link appears.
// Projects with `private: true` show a lock label instead of a code link; remove it
// once the repo is public.
const PROJECTS = [
  {
    name: 'Weather',
    emoji: '🌤️',
    type: 'app',
    image: 'images/weather-app.jpg',
    description: 'Search any city for current conditions and a 5-day forecast, with a sky that changes with the weather.',
    highlights: ['Live data from the Open-Meteo REST API', '°C/°F toggle, geolocation, recent searches'],
    tags: ['JavaScript', 'REST API', 'CSS'],
    repo: 'https://github.com/TveitTheGhost/weather-app',
    live: null,
    private: true,
  },
  {
    name: 'passgen',
    emoji: '🔐',
    type: 'cli',
    terminal: true,
    description: 'A secure password and passphrase generator for the command line, with zero dependencies.',
    highlights: ['Cryptographically secure randomness', 'Entropy-based strength meter, 19 tests'],
    tags: ['Node.js', 'CLI', 'Security', 'Testing'],
    repo: 'https://github.com/TveitTheGhost/password-generator-cli',
    live: null,
    private: true,
  },
  {
    name: 'Pomodoro Timer',
    emoji: '🍅',
    type: 'app',
    image: 'images/pomodoro-timer.jpg',
    description: 'A focus timer with an animated progress ring, automatic break cycle and a generated chime.',
    highlights: ['Drift-free timing in background tabs', 'Web Audio chime, keyboard shortcuts'],
    tags: ['JavaScript', 'SVG', 'Web Audio'],
    repo: 'https://github.com/TveitTheGhost/pomodoro-timer',
    live: null,
    private: true,
  },
  {
    name: 'To-Do',
    emoji: '✅',
    type: 'app',
    image: 'images/todo-app.jpg',
    description: 'A clean task manager with priorities, filters, inline editing and dark mode.',
    highlights: ['Smart sorting by status and priority', 'Saved locally, safe from HTML injection'],
    tags: ['JavaScript', 'localStorage', 'CSS'],
    repo: 'https://github.com/TveitTheGhost/todo-app',
    live: null,
    private: true,
  },
  {
    name: 'Tic-Tac-Toe',
    emoji: '❌',
    type: 'game',
    image: 'images/tic-tac-toe.jpg',
    description: 'The classic game with a two-player mode and an AI opponent that cannot be beaten.',
    highlights: ['Minimax algorithm for a perfect AI', 'Per-mode scores, animations'],
    tags: ['JavaScript', 'Algorithms', 'Game'],
    repo: 'https://github.com/TveitTheGhost/tic-tac-toe',
    live: null,
    private: true,
  },
];

const grid = document.getElementById('project-grid');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function terminalPreview() {
  const term = el('div', 'terminal mono');
  term.setAttribute('aria-hidden', 'true');
  const dots = el('div', 'dots');
  dots.append(el('span'), el('span'), el('span'));
  term.append(
    dots,
    el('div', 'prompt', '$ passgen'),
    el('div', 'pw', ':8T9K//PX8zL7R,t'),
    el('div', 'ok', 'Strength: very strong (104 bits)'),
    el('div', 'prompt', '$ passgen -p'),
    el('div', 'pw', 'Peach-Easel-Mosaic-Lunar-Apple-32'),
    el('div', 'ok', 'Strength: strong (65 bits)')
  );
  return term;
}

function renderProject(project, index) {
  const card = el('article', 'project card');
  card.style.animationDelay = `${index * 60}ms`;

  const thumb = el('div', 'thumb');
  if (project.terminal) {
    thumb.appendChild(terminalPreview());
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
  PROJECTS
    .filter((p) => filter === 'all' || p.type === filter)
    .forEach((p, i) => grid.appendChild(renderProject(p, i)));
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

document.getElementById('stat-projects').textContent = PROJECTS.length;
document.getElementById('year').textContent = new Date().getFullYear();

render();
