import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import * as htmlToImage from "html-to-image";

const API = "http://localhost:5000";

const TEMPLATES = [
  { label: "🔥 Viral LinkedIn Post", prompt: "Write a viral LinkedIn post about AI productivity that drives engagement" },
  { label: "🚀 Startup Idea", prompt: "Generate a profitable startup idea in the health-tech space solving mental wellness" },
  { label: "📹 YouTube Script", prompt: "Write a YouTube script for a 10-minute video about passive income in 2025" },
  { label: "📧 Cold Email", prompt: "Write a cold email to startup founders offering AI automation services" },
  { label: "💼 Business Plan", prompt: "Create a business plan for a SaaS tool that helps freelancers manage clients" },
  { label: "🤖 System Prompt", prompt: "Create a system prompt for an AI assistant specialized in code review" },
  { label: "📝 Blog Post", prompt: "Write a blog post about the future of remote work with statistics" },
  { label: "💡 Product Pitch", prompt: "Write a 60-second elevator pitch for a new AI writing tool for marketers" },
];

const styles = {
  root: {
    fontFamily: "'Inter', sans-serif",
    background: "#0d1117",
    minHeight: "100vh",
    color: "#e6edf3",
    margin: 0,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "1px solid #21262d",
    background: "rgba(13,17,23,0.95)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "1.3rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #a855f7, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
  },
  navRight: { display: "flex", gap: "1rem", alignItems: "center" },
  navBtn: {
    padding: "0.45rem 1.1rem",
    borderRadius: "8px",
    border: "1px solid #30363d",
    background: "transparent",
    color: "#e6edf3",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  hero: {
    textAlign: "center",
    padding: "4rem 1rem 2rem",
    maxWidth: "700px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    background: "rgba(168,85,247,0.15)",
    border: "1px solid rgba(168,85,247,0.4)",
    borderRadius: "999px",
    fontSize: "0.78rem",
    color: "#c084fc",
    marginBottom: "1.5rem",
    letterSpacing: "0.05em",
  },
  h1: {
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    margin: "0 0 1rem",
    background: "linear-gradient(135deg, #ffffff 0%, #a855f7 60%, #06b6d4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#8b949e",
    marginBottom: "0.5rem",
    lineHeight: 1.6,
  },
  starCta: {
    fontSize: "0.9rem",
    color: "#6e7681",
    marginBottom: "2rem",
    fontStyle: "italic",
  },
  main: { maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 3rem" },
  card: {
    background: "#161b22",
    border: "1px solid #21262d",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "1rem",
    transition: "border-color 0.2s",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.5rem",
    display: "block",
  },
  textarea: {
    width: "100%",
    minHeight: "130px",
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: "8px",
    color: "#e6edf3",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.95rem",
    padding: "0.85rem 1rem",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: 1.6,
    transition: "border-color 0.2s",
  },
  templateGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.75rem",
  },
  chip: {
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    border: "1px solid #30363d",
    background: "#21262d",
    color: "#c9d1d9",
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "'Inter', sans-serif",
  },
  optimizeBtn: {
    width: "100%",
    padding: "0.9rem",
    background: "linear-gradient(135deg, #7c3aed, #0891b2)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: "0.5rem",
  },
  resultCard: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "12px",
    padding: "1.5rem",
    position: "relative",
  },
  scoreBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.3rem 0.9rem",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #4c1d95, #0c4a6e)",
    border: "1px solid rgba(168,85,247,0.4)",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#e9d5ff",
    marginBottom: "1rem",
  },
  improvedText: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.88rem",
    background: "#0d1117",
    border: "1px solid #238636",
    borderRadius: "8px",
    padding: "1rem",
    lineHeight: 1.7,
    color: "#3fb950",
    marginBottom: "1rem",
  },
  improvements: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  impChip: {
    padding: "0.2rem 0.65rem",
    background: "rgba(35,134,54,0.15)",
    border: "1px solid rgba(35,134,54,0.4)",
    borderRadius: "999px",
    fontSize: "0.75rem",
    color: "#3fb950",
  },
  actionRow: {
    display: "flex",
    gap: "0.6rem",
    flexWrap: "wrap",
    marginTop: "0.75rem",
  },
  copyBtn: {
    padding: "0.5rem 1.1rem",
    background: "#21262d",
    border: "1px solid #30363d",
    borderRadius: "8px",
    color: "#e6edf3",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  },
  compareCard: (color) => ({
    background: "#0d1117",
    border: `1px solid ${color}`,
    borderRadius: "10px",
    padding: "1rem",
  }),
  compareLabel: (color) => ({
    fontSize: "0.78rem",
    fontWeight: 700,
    color,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.6rem",
  }),
  compareText: {
    fontSize: "0.82rem",
    color: "#8b949e",
    lineHeight: 1.6,
  },
  verdictBanner: {
    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(8,145,178,0.15))",
    border: "1px solid rgba(168,85,247,0.3)",
    borderRadius: "10px",
    padding: "0.9rem 1.2rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#c084fc",
    textAlign: "center",
    marginBottom: "1rem",
    letterSpacing: "0.02em",
  },
  error: {
    background: "rgba(248,81,73,0.1)",
    border: "1px solid rgba(248,81,73,0.4)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#f85149",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  demoNote: {
    background: "rgba(56,139,253,0.1)",
    border: "1px solid rgba(56,139,253,0.3)",
    borderRadius: "8px",
    padding: "0.6rem 1rem",
    color: "#58a6ff",
    fontSize: "0.82rem",
    marginBottom: "1rem",
  },
  footer: {
    borderTop: "1px solid #21262d",
    padding: "2rem",
    textAlign: "center",
    color: "#6e7681",
    fontSize: "0.85rem",
  },
};

function ScoreRing({ score }) {
  const color = score >= 80 ? "#3fb950" : score >= 60 ? "#d29922" : "#f85149";
  return (
    <span style={{ ...styles.scoreBadge, borderColor: `${color}40`, color }}>
      ⚡ Score: {score}/100
    </span>
  );
}

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [savingImg, setSavingImg] = useState(false);
  const resultRef = useRef(null);

  async function optimize() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // Try demo endpoint first (no auth needed)
      const res = await fetch(`${API}/optimize/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data);
    } catch (e) {
      // Offline fallback
      const { improved, score, improvements } = localOptimize(prompt);
      setResult({
        improved,
        score,
        improvements,
        claude: `[Claude 3.5] Thoughtful analysis of "${prompt.slice(0, 50)}..." — Claude would provide structured, nuanced insights with deep contextual understanding.`,
        gpt: `[GPT-4o] Direct response to "${prompt.slice(0, 50)}..." — GPT-4 would deliver concise, well-organized content optimized for clarity.`,
        verdict: "⚔️ Claude gives more detailed, thorough responses",
        demo: true,
      });
    }
    setLoading(false);
  }

  function localOptimize(raw) {
    let improved = raw.trim();
    const improvements = [];
    if (raw.split(" ").length < 5) { improved = `Write a comprehensive, well-structured piece about: "${improved}"`; improvements.push("Added context"); }
    improved += ". Aim for 400–600 words. Use a clear, professional tone. Structure with introduction, main sections, and conclusion.";
    improvements.push("Added length guide", "Defined tone", "Added structure");
    return { improved, score: 87, improvements };
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result.improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function shareAsImage() {
    if (!resultRef.current) return;
    setSavingImg(true);
    try {
      const dataUrl = await htmlToImage.toPng(resultRef.current, { backgroundColor: "#161b22" });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "promptforge-result.png";
      a.click();
    } catch { alert("Failed to save image"); }
    setSavingImg(false);
  }

  function shareOnTwitter() {
    const text = encodeURIComponent(
      `Just optimized my AI prompt with PromptForge AI — score went from mediocre to ${result.score}/100! 🔥\n${result.verdict}\n\nTry it free: https://github.com/iamjagadishkumar24/promptforge-ai`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  return (
    <div style={styles.root}>
      {/* Nav */}
      <nav style={styles.nav}>
        <span style={styles.logo}>⚡ PromptForge AI</span>
        <div style={styles.navRight}>
          <span style={{ fontSize: "0.8rem", color: "#6e7681" }}>🔥 Used by developers daily</span>
          <a href="https://github.com/iamjagadishkumar24/promptforge-ai" target="_blank"
            style={{ ...styles.navBtn, background: "#21262d", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ⭐ Star on GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.badge}>🚀 v2.0 — Now with AI Verdict</div>
        <h1 style={styles.h1}>Turn Bad Prompts Into<br />Powerful AI Results</h1>
        <p style={styles.subtitle}>
          Paste any prompt → Get it optimized, scored, compared between Claude &amp; GPT-4, with an AI verdict — in seconds.
        </p>
        <p style={styles.starCta}>⭐ Star if it saves you time · Built for developers, writers, and AI enthusiasts</p>
      </div>

      {/* Main */}
      <main style={styles.main}>
        {/* Input */}
        <div style={styles.card}>
          <label style={styles.label}>Your Prompt</label>
          <textarea
            style={styles.textarea}
            placeholder='e.g. "write something about cats" — paste any rough idea and watch it transform...'
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === "Enter" && e.ctrlKey && optimize()}
          />
          <div style={{ marginTop: "0.75rem" }}>
            <label style={styles.label}>⚡ Quick Templates — click to use</label>
            <div style={styles.templateGrid}>
              {TEMPLATES.map(t => (
                <button key={t.label} style={styles.chip}
                  onClick={() => setPrompt(t.prompt)}
                  onMouseOver={e => { e.target.style.borderColor = "#a855f7"; e.target.style.color = "#c084fc"; }}
                  onMouseOut={e => { e.target.style.borderColor = "#30363d"; e.target.style.color = "#c9d1d9"; }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <button
            style={{ ...styles.optimizeBtn, opacity: loading || !prompt.trim() ? 0.6 : 1 }}
            onClick={optimize}
            disabled={loading || !prompt.trim()}
            onMouseOver={e => { if (!loading && prompt.trim()) e.target.style.opacity = "0.85"; }}
            onMouseOut={e => e.target.style.opacity = "1"}
          >
            {loading ? "⚡ Optimizing..." : "⚡ Optimize + Compare AI Models →"}
          </button>
          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#6e7681", marginTop: "0.5rem" }}>
            Ctrl+Enter to optimize · No login required for demo
          </div>
        </div>

        {/* Error */}
        {error && <div style={styles.error}>⚠️ {error}</div>}

        {/* Results */}
        {result && (
          <div ref={resultRef} style={styles.resultCard}>
            {result.demo && (
              <div style={styles.demoNote}>
                ℹ️ Running in demo mode — connect to backend for full features
              </div>
            )}

            {/* Score */}
            <ScoreRing score={result.score} />

            {/* Improvements tags */}
            {result.improvements?.length > 0 && (
              <div style={styles.improvements}>
                {result.improvements.map(i => <span key={i} style={styles.impChip}>✓ {i}</span>)}
              </div>
            )}

            {/* Improved prompt */}
            <label style={styles.label}>✨ Optimized Prompt</label>
            <div style={styles.improvedText}>{result.improved}</div>

            {/* Action Buttons */}
            <div style={styles.actionRow}>
              <button style={styles.copyBtn} onClick={copyResult}
                onMouseOver={e => e.target.style.borderColor = "#a855f7"}
                onMouseOut={e => e.target.style.borderColor = "#30363d"}>
                {copied ? "✅ Copied!" : "📋 Copy Result"}
              </button>
              <button style={styles.copyBtn} onClick={shareAsImage} disabled={savingImg}
                onMouseOver={e => e.target.style.borderColor = "#06b6d4"}
                onMouseOut={e => e.target.style.borderColor = "#30363d"}>
                {savingImg ? "⏳ Saving..." : "🖼️ Save as Image"}
              </button>
              <button style={{ ...styles.copyBtn, borderColor: "#1d9bf0", color: "#1d9bf0" }} onClick={shareOnTwitter}
                onMouseOver={e => e.target.style.background = "rgba(29,155,240,0.1)"}
                onMouseOut={e => e.target.style.background = "#21262d"}>
                𝕏 Share on Twitter
              </button>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #21262d", margin: "1.25rem 0" }} />

            {/* Model Comparison */}
            <label style={styles.label}>⚔️ Claude 3.5 vs GPT-4o Response</label>
            <div style={styles.compareGrid}>
              <div style={styles.compareCard("rgba(168,85,247,0.4)")}>
                <div style={styles.compareLabel("#c084fc")}>🟣 Claude 3.5 Sonnet</div>
                <div style={styles.compareText}>{result.claude}</div>
              </div>
              <div style={styles.compareCard("rgba(6,182,212,0.4)")}>
                <div style={styles.compareLabel("#22d3ee")}>🔵 GPT-4o</div>
                <div style={styles.compareText}>{result.gpt}</div>
              </div>
            </div>

            {/* Verdict */}
            <div style={styles.verdictBanner}>{result.verdict}</div>
          </div>
        )}

        {/* Public API Example */}
        <div style={{ ...styles.card, marginTop: "2rem" }}>
          <label style={styles.label}>🔌 Public API — Integrate in Your Project</label>
          <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", background: "#0d1117", border: "1px solid #30363d", borderRadius: "8px", padding: "1rem", color: "#79c0ff", overflow: "auto", margin: 0 }}>
{`curl -X POST https://your-api.com/optimize/demo \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"write a blog post about AI"}'

# Response:
{
  "improved": "Write a comprehensive, SEO-optimized article...",
  "score": 87,
  "claude": "...",
  "gpt": "...",
  "verdict": "⚔️ Claude gives more detailed responses"
}`}
          </pre>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>⚡ PromptForge AI · MIT License · <a href="https://github.com/iamjagadishkumar24/promptforge-ai" style={{ color: "#a855f7", textDecoration: "none" }}>⭐ Star on GitHub</a></p>
        <p style={{ marginTop: "0.4rem", fontSize: "0.78rem" }}>Built with ❤️ by <a href="https://github.com/iamjagadishkumar24" style={{ color: "#58a6ff", textDecoration: "none" }}>Jagadish Kumar</a></p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
