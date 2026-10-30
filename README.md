# 👻 TveitTheGhost · Portfolio

My personal portfolio site: who I am, what I'm exploring, and the projects I've built. It's hand-built with plain HTML, CSS and JavaScript, with no frameworks and no build step.

### 🌐 [Visit it live → tveittheghost.github.io](https://tveittheghost.github.io/)

<img src="screenshot.jpg" alt="Portfolio screenshot" width="600">

## ✨ Features

- **Data-driven project cards:** every card is generated from one `PROJECTS` array in `script.js`, so adding a project means adding one entry
- **Project filters** for Web apps, Games and CLI
- **Light and dark mode** that follows your system and remembers your choice
- **Terminal-style preview** for the command-line project, built in CSS
- **Sticky blurred nav**, smooth scrolling, a floating ghost 👻, and fade-in cards
- **Respects "reduce motion"** settings for people who prefer less animation
- **Responsive:** single-column layout on phones with no sideways scrolling

## ➕ Adding a project

Add an entry to `PROJECTS` in `script.js`:

```js
{
  name: 'My New Project',
  emoji: '🚀',
  type: 'app',                 // 'app' | 'game' | 'cli'
  image: 'images/my-project.jpg',
  description: 'One or two sentences about it.',
  highlights: ['Something impressive', 'Something else'],
  tags: ['JavaScript', 'CSS'],
  repo: 'https://github.com/TveitTheGhost/my-new-project',
  live: null,                  // set to a URL to show a "Live demo" link
  private: true,               // shows "🔒 Private repo" instead of a code link
}
```

The project count in the hero updates automatically.

## 🛠️ Built with

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

Made by [TveitTheGhost](https://github.com/TveitTheGhost) · MIT License
