#!/usr/bin/env node
import { program } from "commander";
import readline from "readline";
import { createRequire } from "module";

const API = process.env.PROMPTFORGE_API || "http://localhost:5000";

function optimizeLocally(raw) {
  let improved = raw.trim();
  if (raw.split(" ").length < 5) improved = `Write a comprehensive piece about: "${improved}"`;
  improved += ". Aim for 400–600 words. Use a clear, professional tone. Structure with an intro, main sections, and a conclusion.";
  return { improved, score: 87, verdict: "⚔️ Claude gives more detailed responses (demo mode)" };
}

async function runOptimize(prompt, opts) {
  console.log("\n⚡ PromptForge AI — Optimizing...\n");
  try {
    const res = await fetch(`${API}/optimize/demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    printResult(data);
  } catch {
    const data = optimizeLocally(prompt);
    console.log("⚠️  Server offline — using local optimizer\n");
    printResult(data);
  }
}

function printResult({ improved, score, verdict, claude, gpt, improvements }) {
  const scoreColor = score >= 80 ? "\x1b[32m" : score >= 60 ? "\x1b[33m" : "\x1b[31m";
  console.log(`${scoreColor}⚡ Score: ${score}/100\x1b[0m\n`);
  if (improvements?.length) {
    console.log("\x1b[36m✓ Improvements applied:\x1b[0m");
    improvements.forEach(i => console.log(`  • ${i}`));
    console.log("");
  }
  console.log("\x1b[35m✨ Optimized Prompt:\x1b[0m");
  console.log("─".repeat(60));
  console.log(improved);
  console.log("─".repeat(60));
  if (verdict) {
    console.log(`\n\x1b[33m${verdict}\x1b[0m`);
  }
  if (claude) {
    console.log("\n\x1b[35m🟣 Claude 3.5:\x1b[0m", claude.slice(0, 120) + "...");
  }
  if (gpt) {
    console.log("\x1b[36m🔵 GPT-4o:\x1b[0m   ", gpt.slice(0, 120) + "...");
  }
  console.log("\n\x1b[32m⭐ Star PromptForge AI: https://github.com/iamjagadishkumar24/promptforge-ai\x1b[0m\n");
}

program
  .name("promptforge")
  .description("⚡ PromptForge AI — The Ultimate Prompt Engineering CLI")
  .version("2.0.0");

program
  .command("optimize <prompt>")
  .description("Optimize a prompt and get AI comparison")
  .action(runOptimize);

program
  .command("interactive")
  .alias("i")
  .description("Launch interactive mode")
  .action(() => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log("\n\x1b[35m⚡ PromptForge AI — Interactive Mode\x1b[0m");
    console.log("Type your prompt and press Enter. Type 'exit' to quit.\n");
    const ask = () => {
      rl.question("\x1b[36mPrompt > \x1b[0m", async (input) => {
        if (input.toLowerCase() === "exit") { console.log("👋 Bye!"); rl.close(); return; }
        if (input.trim()) await runOptimize(input);
        ask();
      });
    };
    ask();
  });

program
  .command("templates")
  .description("Show available prompt templates")
  .action(() => {
    const templates = [
      "🔥 Viral LinkedIn Post",
      "🚀 Startup Idea Generator",
      "📹 YouTube Script",
      "📧 Cold Email",
      "💼 Business Plan",
      "🤖 AI System Prompt",
      "📝 Blog Post",
      "💡 Product Description",
    ];
    console.log("\n\x1b[35m⚡ PromptForge Templates:\x1b[0m\n");
    templates.forEach(t => console.log(`  ${t}`));
    console.log("\n\x1b[36mUse: promptforge optimize \"<your prompt here>\"\x1b[0m\n");
  });

program.parse();
