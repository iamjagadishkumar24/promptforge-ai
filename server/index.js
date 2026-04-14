import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Database ───────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/promptforge")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(() => console.log("⚠️  MongoDB not connected — running in demo mode"));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  usage: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const HistorySchema = new mongoose.Schema({
  userId: String,
  original: String,
  improved: String,
  score: Number,
  verdict: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
const History = mongoose.model("History", HistorySchema);

// ─── Auth Middleware ─────────────────────────────────────────────────────────
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    req.user = jwt.verify(token, process.env.JWT_SECRET || "promptforge_secret");
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized — please login" });
  }
}

// ─── Prompt Engine ───────────────────────────────────────────────────────────
function optimizePrompt(raw) {
  const words = raw.trim().split(" ").length;
  const hasLength = /\d+\s*(word|sentence|paragraph)/i.test(raw);
  const hasTone = /professional|formal|casual|funny|technical/i.test(raw);
  const hasAudience = /for (a |an )?(developer|beginner|student|business|child)/i.test(raw);
  const hasFormat = /bullet|list|table|step[- ]by[- ]step|essay|article/i.test(raw);

  let improved = raw.trim();
  let score = 40;
  const improvements = [];

  // Add specificity
  if (words < 5) {
    improved = `Write a comprehensive, well-structured piece about: "${improved}"`;
    improvements.push("Added context wrapper");
    score += 10;
  }
  if (!hasLength) {
    improved += ". Aim for 400–600 words.";
    improvements.push("Specified output length");
    score += 15;
  }
  if (!hasTone) {
    improved += " Use a clear, engaging, and professional tone.";
    improvements.push("Defined tone of voice");
    score += 12;
  }
  if (!hasAudience) {
    improved += " Write for a general audience with no prior expertise assumed.";
    improvements.push("Defined target audience");
    score += 13;
  }
  if (!hasFormat) {
    improved += " Structure your response with an introduction, key sections, and a conclusion.";
    improvements.push("Added output structure");
    score += 10;
  }

  return { improved: improved.trim(), score: Math.min(score, 98), improvements };
}

function getVerdict(claudeLen, gptLen) {
  const diff = Math.abs(claudeLen - gptLen);
  if (diff < 50) return "Both models performed equally well for this prompt";
  if (claudeLen > gptLen) return "⚔️ Claude gives more detailed, thorough responses";
  return "⚔️ GPT-4 gives more concise, direct responses";
}

function simulateClaudeResponse(prompt) {
  return `[Claude 3.5 Sonnet] Here is a thoughtful, detailed response to your prompt: "${prompt.slice(0, 60)}..." — Claude tends to provide nuanced analysis with supporting context, breaking down complex ideas into digestible sections while maintaining accuracy and depth throughout the response.`;
}

function simulateGPTResponse(prompt) {
  return `[GPT-4o] Here is a focused response to: "${prompt.slice(0, 60)}..." — GPT-4 delivers structured, concise answers optimized for clarity, typically leading with the core answer then providing supporting details as needed.`;
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => res.json({
  service: "PromptForge AI API",
  version: "2.0.0",
  status: "running",
  endpoints: ["/signup", "/login", "/optimize", "/history", "/templates", "/dashboard"]
}));

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hash });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "promptforge_secret");
    res.json({ token, email, message: "Account created successfully!" });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: "Email already registered" });
    res.status(500).json({ error: "Signup failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "promptforge_secret");
    res.json({ token, email, usage: user.usage });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

// ✨ Core: Optimize + Compare + Verdict (all in one!)
app.post("/optimize", auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const { improved, score, improvements } = optimizePrompt(prompt);
    const claude = simulateClaudeResponse(improved);
    const gpt = simulateGPTResponse(improved);
    const verdict = getVerdict(claude.length, gpt.length);

    // Save to history
    try {
      await History.create({ userId: req.user.id, original: prompt, improved, score, verdict });
      await User.findByIdAndUpdate(req.user.id, { $inc: { usage: 1 } });
    } catch { /* non-critical */ }

    res.json({ improved, score, claude, gpt, verdict, improvements });
  } catch {
    res.status(500).json({ error: "Optimization failed" });
  }
});

// Demo optimize (no auth needed — for public API examples)
app.post("/optimize/demo", (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });
  const { improved, score, improvements } = optimizePrompt(prompt);
  const claude = simulateClaudeResponse(improved);
  const gpt = simulateGPTResponse(improved);
  res.json({ improved, score, claude, gpt, verdict: getVerdict(claude.length, gpt.length), improvements, demo: true });
});

// Prompt Templates
app.get("/templates", (req, res) => {
  res.json([
    { id: 1, label: "🔥 Viral LinkedIn Post", prompt: "Write a viral LinkedIn post about [your topic] that drives engagement and showcases thought leadership" },
    { id: 2, label: "🚀 Startup Idea Generator", prompt: "Generate a unique, profitable startup idea in the [industry] space solving [problem] for [target audience]" },
    { id: 3, label: "📹 YouTube Script", prompt: "Write a complete YouTube video script for a 10-minute video about [topic] with hook, sections, and CTA" },
    { id: 4, label: "📧 Cold Email", prompt: "Write a compelling cold email to [recipient type] offering [your product/service] that gets a response" },
    { id: 5, label: "💼 Business Plan", prompt: "Create a concise business plan outline for [business idea] including market, revenue model, and go-to-market strategy" },
    { id: 6, label: "🤖 AI System Prompt", prompt: "Create a detailed system prompt for an AI assistant specialized in [role/domain] with clear behavioral guidelines" },
    { id: 7, label: "📝 Blog Post", prompt: "Write a comprehensive SEO-optimized blog post about [topic] with subheadings, statistics, and actionable takeaways" },
    { id: 8, label: "💡 Product Description", prompt: "Write a compelling product description for [product] that converts visitors into buyers, highlighting benefits over features" }
  ]);
});

// History
app.get("/history", auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch {
    res.json([]);
  }
});

// Dashboard / Analytics
app.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const total = await History.countDocuments({ userId: req.user.id });
    const avgScore = await History.aggregate([
      { $match: { userId: String(req.user.id) } },
      { $group: { _id: null, avg: { $avg: "$score" } } }
    ]);
    res.json({
      email: user?.email,
      usage: user?.usage || 0,
      totalOptimizations: total,
      avgScore: Math.round(avgScore[0]?.avg || 0),
      memberSince: user?.createdAt
    });
  } catch {
    res.json({ usage: 0, totalOptimizations: 0, avgScore: 0 });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 PromptForge API running on http://localhost:${PORT}`));
