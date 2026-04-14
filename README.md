<div align="center">

<img src="https://raw.githubusercontent.com/iamjagadishkumar24/promptforge-ai/main/assets/banner.png" alt="PromptForge AI Banner" width="100%" />

# PromptForge AI

**The Ultimate AI Prompt Engineering Toolkit**

[![GitHub license](https://img.shields.io/github/license/iamjagadishkumar24/promptforge-ai?style=flat-square&color=6C63FF)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/iamjagadishkumar24/promptforge-ai?style=flat-square&color=6C63FF)](https://github.com/iamjagadishkumar24/promptforge-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/iamjagadishkumar24/promptforge-ai?style=flat-square&color=00D4FF)](https://github.com/iamjagadishkumar24/promptforge-ai/network)
[![GitHub issues](https://img.shields.io/github/issues/iamjagadishkumar24/promptforge-ai?style=flat-square&color=FF6B6B)](https://github.com/iamjagadishkumar24/promptforge-ai/issues)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=flat-square&logo=mongodb)](https://mongodb.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

<br/>

[📖 Documentation](#-documentation) · [🚀 Quick Start](#-quick-start) · [💡 Features](#-features) · [🛠️ API Reference](#%EF%B8%8F-api-reference) · [🤝 Contributing](#-contributing)

</div>

---

## What is PromptForge AI?

**PromptForge AI** is a full-stack SaaS platform for AI prompt engineering. It helps developers, researchers, and AI enthusiasts craft, optimize, compare, and track prompts across multiple large language models — all from a single unified platform.

```js
// PROMPT OPTIMIZATION
const result = await promptforge.optimize(prompt);    // → optimized + scored
const compare = await promptforge.compare(prompt);    // → GPT-4 vs Claude side-by-side

// AUTHENTICATION
const token = await promptforge.auth.signup(email, password);   // → JWT token
const session = await promptforge.auth.login(email, password);  // → session

// HISTORY & ANALYTICS
const history = await promptforge.history.get(userId);           // → usage records
const stats = await promptforge.analytics.dashboard(userId);     // → full analytics

// CLI
$ promptforge optimize "Write a blog post about AI"              # → terminal output
$ promptforge compare "Explain quantum computing"               # → GPT vs Claude

// CHROME EXTENSION
// Select any text → Right-click → "Optimize with PromptForge"  → instant result
```

> **PromptForge AI** transforms the way you engineer prompts:
> - ⚡ **Real-time optimization** with AI scoring and feedback
> - 🔄 **Side-by-side model comparison** (OpenAI GPT-4 vs Anthropic Claude)
> - 📊 **MongoDB-powered** usage analytics and history tracking
> - 🔐 **JWT Authentication** with secure role-based access
> - 💻 **CLI tool** for terminal-based prompt engineering
> - 🧩 **Chrome Extension** for one-click optimization anywhere on the web

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

```bash
node >= 18.0.0
npm >= 9.0.0
MongoDB Atlas account (free tier works)
```

### Installation

```bash
# Clone the repository
git clone https://github.com/iamjagadishkumar24/promptforge-ai.git
cd promptforge-ai

# Install all dependencies
npm install --prefix server
npm install --prefix client
npm install --prefix cli
```

### Configuration

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/promptforge
JWT_SECRET=your_super_secret_key_here
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PORT=5000
```

### Run Locally

```bash
# Terminal 1 — Start the backend API
cd server && npm start
# → API running on http://localhost:5000

# Terminal 2 — Start the frontend
cd client && npm run dev
# → App running on http://localhost:5173

# Install CLI globally
cd cli && npm link
promptforge --help
```

---

## 💡 Features

### 🔮 AI Prompt Optimizer

Transform rough prompt ideas into precision-engineered instructions. The optimizer analyzes clarity, specificity, context, and output formatting — then returns an improved version with a quality score.

```js
POST /optimize
Authorization: Bearer <token>

{
  "prompt": "write me something about cats"
}

// Response
{
  "improved": "Write a comprehensive 500-word article about domestic cats, covering their history of domestication, common breeds, behavioral traits, and their relationship with humans. Use a friendly, informative tone suitable for a general audience.",
  "score": 94,
  "improvements": ["Added specificity", "Defined output length", "Specified tone"]
}
```

### 🔄 Multi-Model Comparison

Compare prompt responses across OpenAI GPT-4 and Anthropic Claude simultaneously — see which model handles your use case better.

```js
POST /compare
Authorization: Bearer <token>

{
  "prompt": "Explain quantum entanglement to a 10-year-old"
}

// Response
{
  "gpt4":   { "response": "...", "tokens": 142, "latency_ms": 1240 },
  "claude": { "response": "...", "tokens": 178, "latency_ms": 980  }
}
```

### 📦 Monorepo Architecture

```
promptforge-ai/
├── server/          # Express.js REST API + MongoDB + JWT Auth
├── client/          # React 18 SPA with real-time UI
├── cli/             # Node.js CLI tool (promptforge command)
└── extension/       # Chrome Extension (Manifest V3)
```

### 🧩 Chrome Extension

Install the extension and optimize any prompt directly from any webpage:

1. **Select text** on any webpage
2. **Right-click** → "Optimize with PromptForge"
3. Get an **instant optimized version** in a popup

### 💻 CLI Tool

Use PromptForge directly from your terminal:

```bash
# Optimize a prompt
promptforge optimize "write a cover letter for a software engineer"

# Compare models
promptforge compare "what is machine learning?"

# View your history
promptforge history --limit 10

# Login
promptforge auth login --email you@example.com
```

---

## 🛠️ API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register a new user, returns JWT token |
| `POST` | `/login`  | Authenticate user, returns JWT token |

### Prompt Operations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/optimize` | ✅ | Optimize a prompt with AI scoring |
| `POST` | `/compare`  | ✅ | Compare prompt across GPT-4 & Claude |
| `GET`  | `/history`  | ✅ | Retrieve user's prompt history |

### Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/dashboard` | ✅ | Usage stats and analytics |
| `GET` | `/usage`     | ✅ | Token consumption breakdown |

### Request Headers

```http
Authorization: <your-jwt-token>
Content-Type: application/json
```

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, Vite | Interactive SPA with real-time updates |
| **Backend** | Express.js, Node.js 18+ | REST API server |
| **Database** | MongoDB + Mongoose | Prompt history & user data |
| **Auth** | JSON Web Tokens (JWT) | Secure stateless authentication |
| **AI** | OpenAI API, Anthropic Claude | LLM prompt optimization & comparison |
| **CLI** | Node.js Commander | Terminal-based prompt engineering |
| **Extension** | Chrome Manifest V3 | Browser-native prompt optimization |

---

## 📁 Project Structure

```
promptforge-ai/
│
├── server/
│   ├── index.js          # Express app, routes, middleware
│   ├── models/           # Mongoose schemas (User, Prompt, History)
│   ├── routes/           # API route handlers
│   ├── middleware/        # JWT auth middleware
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── App.jsx       # Root React component
│   │   ├── pages/        # Dashboard, Login, Optimizer, Compare
│   │   ├── components/   # Reusable UI components
│   │   └── api/          # API client functions
│   ├── index.html
│   └── package.json
│
├── cli/
│   ├── index.js          # CLI entrypoint with Commander.js
│   └── package.json
│
├── extension/
│   ├── manifest.json     # Chrome Extension Manifest V3
│   ├── popup.html        # Extension popup UI
│   ├── popup.js          # Extension logic
│   └── background.js     # Service worker
│
└── README.md
```

---

## 🔐 Security

- All routes protected by **JWT Bearer token authentication**
- Passwords hashed using **bcrypt** (salt rounds: 12)
- Environment variables via **dotenv** — never hardcode secrets
- CORS configured for production domains only
- MongoDB injection prevention via **Mongoose schema validation**

> ⚠️ **For production**, update `JWT_SECRET` in `.env` to a strong random value and never commit it to source control.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# Fork and clone your fork
git clone https://github.com/<your-username>/promptforge-ai.git

# Create a feature branch
git checkout -b feature/your-amazing-feature

# Make your changes and commit
git commit -m "feat: add your amazing feature"

# Push and open a Pull Request
git push origin feature/your-amazing-feature
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the pull request process.

---

## 📖 Documentation

Full documentation is coming soon at **[promptforge-ai.vercel.app](https://promptforge-ai.vercel.app)**

**Planned docs:**
- 🏠 Getting Started Guide
- 🔐 Authentication Deep Dive
- 🔮 Optimizer Algorithm Explained
- 🧩 Extension Installation Guide
- 💻 CLI Command Reference
- 📡 REST API Full Reference
- 🚀 Deployment Guide (Vercel + Railway + MongoDB Atlas)

---

## 🗺️ Roadmap

- [x] Core prompt optimizer API
- [x] JWT authentication system
- [x] MongoDB usage tracking
- [x] React frontend SPA
- [x] CLI tool
- [x] Chrome Extension (Manifest V3)
- [ ] GPT-4 vs Claude side-by-side comparison UI
- [ ] Prompt templates library
- [ ] Team workspaces & sharing
- [ ] Webhook support
- [ ] VS Code extension
- [ ] Prompt versioning & diff viewer
- [ ] Fine-tuning dataset export

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal and commercial purposes.

---

## ⭐ Star History

If PromptForge AI has helped you, please consider giving it a ⭐ — it helps others discover the project!

[![Star History Chart](https://api.star-history.com/svg?repos=iamjagadishkumar24/promptforge-ai&type=Date)](https://star-history.com/#iamjagadishkumar24/promptforge-ai&Date)

---

<div align="center">

Made with ❤️ by [Jagadish Kumar](https://github.com/iamjagadishkumar24)

**[⬆ Back to top](#promptforge-ai)**

</div>
