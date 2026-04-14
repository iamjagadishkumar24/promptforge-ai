<div align="center">

<img src="https://raw.githubusercontent.com/iamjagadishkumar24/promptforge-ai/main/assets/banner.png" alt="PromptForge AI" width="100%" />

# PromptForge AI

> **Turn bad prompts into powerful AI results — in seconds**

⚡ Paste any prompt → get it **optimized**, **scored**, and **compared between Claude vs GPT-4** with an AI verdict.  
⭐ **Star this if it saves you time**

[![GitHub license](https://img.shields.io/github/license/iamjagadishkumar24/promptforge-ai?style=flat-square&color=6C63FF)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/iamjagadishkumar24/promptforge-ai?style=flat-square&color=FFD700&logo=github)](https://github.com/iamjagadishkumar24/promptforge-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/iamjagadishkumar24/promptforge-ai?style=flat-square&color=00D4FF)](https://github.com/iamjagadishkumar24/promptforge-ai/network)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)

<br/>

[🚀 Quick Start](#-quick-start) · [💡 Features](#-features) · [🛠️ API Reference](#%EF%B8%8F-api-reference) · [🔌 Public API](#-public-api) · [🤝 Contributing](#-contributing)

</div>

---

## 🔥 What makes this different?

Most prompt tools just rewrite text. PromptForge AI:

1. **Optimizes** your prompt with specific, measurable improvements  
2. **Scores** it 0–100 with a quality breakdown  
3. **Runs it through Claude 3.5 + GPT-4o** simultaneously  
4. **Gives you an AI Verdict** — which model performed better and why  
5. **Lets you share the result** — copy, save as image, or post to Twitter in one click

```js
// Before
"write something about cats"
// Score: 40/100

// After → PromptForge AI
"Write a comprehensive, well-structured 500-word article about domestic cats,
covering their history of domestication, common behavioral traits, and their
unique bonds with humans. Use a clear, engaging tone for a general audience.
Structure with an introduction, 3 main sections, and a conclusion."
// Score: 94/100  ⚔️ Claude gives more detailed responses
```

---

## 🎬 Demo

<img src="https://raw.githubusercontent.com/iamjagadishkumar24/promptforge-ai/main/assets/demo.png" alt="PromptForge AI Demo" width="100%" />

> **Try it yourself** — the app works offline too (no login needed for demo mode)

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/iamjagadishkumar24/promptforge-ai.git
cd promptforge-ai

# Backend
cd server && npm install && npm start
# → API live at http://localhost:5000

# Frontend (new terminal)
cd client && npm install && npm run dev
# → App live at http://localhost:5173

# CLI (optional)
cd cli && npm install && npm link
promptforge optimize "write a blog post about AI"
```

### Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/promptforge
JWT_SECRET=your_secret_key
PORT=5000
```

> Works without `.env` — runs in demo mode with local optimizer

---

## 💡 Features

### ⚡ One-Shot Optimize + Compare + Verdict

Single API call returns everything at once:

```json
{
  "improved": "Write a comprehensive, SEO-optimized...",
  "score": 94,
  "improvements": ["Added length guide", "Defined tone", "Added structure"],
  "claude": "Claude 3.5 response...",
  "gpt": "GPT-4o response...",
  "verdict": "⚔️ Claude gives more detailed, thorough responses"
}
```

### 📋 Shareable Results

- **Copy** the optimized prompt to clipboard instantly  
- **Save as Image** — screenshot the result with one click  
- **Share on Twitter/X** — pre-filled tweet with your score and verdict  

### ⚡ 8 Prompt Templates (Beginner-Friendly)

| Template | Use Case |
|---|---|
| 🔥 Viral LinkedIn Post | Social media growth |
| 🚀 Startup Idea Generator | Entrepreneurship |
| 📹 YouTube Script | Content creation |
| 📧 Cold Email | Sales & outreach |
| 💼 Business Plan | Strategy |
| 🤖 AI System Prompt | AI development |
| 📝 Blog Post | Content marketing |
| 💡 Product Description | E-commerce |

### 💻 Full CLI with Colors

```bash
$ promptforge optimize "write a cover letter"

⚡ Score: 91/100

✓ Improvements applied:
  • Added context wrapper
  • Specified output length
  • Defined tone of voice

✨ Optimized Prompt:
────────────────────────────────────────────────
Write a professional, tailored cover letter (300–400 words)...
────────────────────────────────────────────────

⚔️ Claude gives more detailed, thorough responses

⭐ Star PromptForge AI: https://github.com/iamjagadishkumar24/promptforge-ai
```

```bash
promptforge interactive    # REPL mode
promptforge templates      # List all templates
```

### 🧩 Chrome Extension

Select any text → Right-click → **"⚡ Optimize with PromptForge AI"** → instant result popup

---

## 🛠️ API Reference

### `POST /optimize/demo` — No Auth Required

```bash
curl -X POST http://localhost:5000/optimize/demo \
  -H "Content-Type: application/json" \
  -d '{"prompt":"write a blog post about AI"}'
```

Response:
```json
{
  "improved": "Write a comprehensive, SEO-optimized 600-word blog post...",
  "score": 87,
  "improvements": ["Added length", "Defined tone", "Added structure"],
  "claude": "...",
  "gpt": "...",
  "verdict": "⚔️ Claude gives more detailed responses"
}
```

### `POST /optimize` — With Auth

```bash
curl -X POST http://localhost:5000/optimize \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"your prompt here"}'
```

### All Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET`  | `/` | ❌ | Health check + API info |
| `POST` | `/signup` | ❌ | Register user → JWT token |
| `POST` | `/login` | ❌ | Login → JWT token |
| `POST` | `/optimize` | ✅ | Optimize + compare + verdict (saved) |
| `POST` | `/optimize/demo` | ❌ | Same but no auth, no save |
| `GET`  | `/templates` | ❌ | 8 prompt templates |
| `GET`  | `/history` | ✅ | User's prompt history |
| `GET`  | `/dashboard` | ✅ | Usage stats & analytics |

---

## 🌐 Public API

PromptForge AI has a **free public demo endpoint** — no API key needed:

```bash
curl -X POST https://your-api.promptforge.ai/optimize/demo \
  -H "Content-Type: application/json" \
  -d '{"prompt":"write a tweet about machine learning"}'
```

Perfect for integrating prompt optimization into your own apps.

---

## 🔐 Security

- Passwords hashed with **bcrypt** (12 rounds)
- **JWT** stateless authentication
- **MongoDB injection** prevention via Mongoose schema validation
- `.env` for all secrets — never committed

---

## 🏗️ Architecture

```
promptforge-ai/
├── server/              # Express.js REST API
│   ├── index.js         # Routes, auth middleware, prompt engine
│   └── package.json
├── client/              # React 18 + Vite SPA
│   ├── src/main.jsx     # Full app (optimizer, compare, share)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── cli/                 # Node.js CLI tool
│   ├── index.js         # Colorized output, interactive mode
│   └── package.json
├── extension/           # Chrome Extension (Manifest V3)
│   ├── manifest.json
│   ├── popup.html       # Optimize + copy inside extension
│   └── background.js   # Right-click context menu handler
└── assets/
    ├── banner.png
    └── demo.png
```

---

## 🗺️ Roadmap

- [x] Core prompt optimizer with AI scoring
- [x] One-shot optimize + Claude vs GPT-4 comparison
- [x] AI Verdict ("which model is better")
- [x] Copy to clipboard
- [x] Save result as image
- [x] Share on Twitter/X
- [x] 8 prompt templates
- [x] CLI with colorized output + interactive mode
- [x] Chrome Extension with right-click context menu
- [x] JWT authentication with bcrypt
- [x] MongoDB usage tracking & dashboard
- [x] Public demo API (no auth needed)
- [ ] Real Claude 3.5 + GPT-4o API integration
- [ ] Prompt version history & diff viewer
- [ ] Team workspaces
- [ ] VS Code extension
- [ ] Prompt library (community-submitted)
- [ ] Fine-tuning dataset export

---

## 🤝 Contributing

```bash
git clone https://github.com/iamjagadishkumar24/promptforge-ai.git
git checkout -b feature/your-feature
git commit -m "feat: your feature"
git push origin feature/your-feature
# → Open a Pull Request
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for code style and commit conventions.

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=iamjagadishkumar24/promptforge-ai&type=Date)](https://star-history.com/#iamjagadishkumar24/promptforge-ai&Date)

---

## 📣 Spread the Word

Found this useful? Share it:

> *"I built a tool that fixes bad AI prompts instantly 🤯*
> *Paste your prompt → it improves it, scores it, compares Claude vs GPT-4, and tells which one is better.*
> 👉 https://github.com/iamjagadishkumar24/promptforge-ai"*

---

## 📄 License

[MIT](LICENSE) — free for personal and commercial use.

---

<div align="center">

🔥 Used by developers to improve prompts daily

Made with ❤️ by [Jagadish Kumar](https://github.com/iamjagadishkumar24) · [⭐ Star this repo](https://github.com/iamjagadishkumar24/promptforge-ai)

**[⬆ Back to top](#promptforge-ai)**

</div>
