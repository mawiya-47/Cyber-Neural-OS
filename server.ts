import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chat assistant will fallback to mock-intelligent responses.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Endpoint: Chat Assistant Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;
    
    // Fallback if no messages are provided
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message history format." });
    }

    const client = getGeminiClient();
    if (!client) {
      // Simulate real-looking, highly technical AI-assistant replies if API key is not configured
      const lastMessage = messages[messages.length - 1]?.content || "";
      const fallbackReply = generateFallbackResponse(lastMessage);
      return res.json({ text: fallbackReply, source: "offline-simulator" });
    }

    // Format messages for the @google/genai format
    // The gemini-3.5-flash handles systemInstruction elegantly inside config.
    const lastUserMsg = messages[messages.length - 1];
    const previousHistory = messages.slice(0, messages.length - 1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Perform query
    const chatInstance = client.chats.create({
      model: "gemini-3.5-flash",
      history: previousHistory,
      config: {
        systemInstruction: systemInstruction || "You are the NEURAL X AI Core, a highly analytical military-grade cyber defense intelligence agent. Speak in high-tech, slightly robotic, precise, futuristic, but helpful terms. Suggest specific remedies for system threats, and analyze network anomalies, log records, and source intelligence.",
        temperature: 0.7,
      }
    });

    const result = await chatInstance.sendMessage({
      message: lastUserMsg.content
    });

    res.json({ text: result.text || "Diagnostic failed to render output payload.", source: "gemini-core" });
  } catch (err: any) {
    console.error("Gemini API Error in /api/chat:", err);
    res.status(500).json({ 
      error: "Neural Core connection timeout. Cyber threat bypass protocol generated a localized override warning.",
      details: err.message 
    });
  }
});

// Fallback algorithm for simulated security core
function generateFallbackResponse(msg: string): string {
  const query = msg.toLowerCase();
  if (query.includes("vulnerability") || query.includes("exploit") || query.includes("simulate")) {
    return `[NEURAL X LOCAL SECURITY EMULATOR - ACTIVE OVERRIDE]

SIMULATED VULNERABILITY ANALYSIS INJECTED:
- Target Host: SEC-SYS-NODE-09a8
- Entry Point: Buffer overflow detected in raw SSH response parsing
- Diagnostic Risk: HIGH (CVSS: 8.9)
- Isolation Procedure: Deploy firewall ruleset \`RULE_SSH_RATE_BLOCK\` immediately.
- AI Recommendation: Patch custom crypto routines. Rotate API credentials on next block.
\n\n*(Setup a real GEMINI_API_KEY in the Settings > Secrets menu to experience live, full-spectrum AI model capabilities)*`;
  }
  
  if (query.includes("threat") || query.includes("attack") || query.includes("malware") || query.includes("ddos")) {
    return `[NEURAL X THREAT DISPATCH LOGGER]

ANOMALY ANALYSIS:
- Dynamic attack vector signatures match decentralized telemetry arrays.
- Automated defenses successfully triggered localized virtual micro-containment tags.
- Integrity: 98.4% nominal. Active defenses are executing threat-mitigation protocols.
- Active Shield Status: ENGAGED on Port 3000.
\n\n*(Deploy your GEMINI_API_KEY under Settings > Secrets to unleash full-spectrum military-grade threat analysis)*`;
  }

  if (query.includes("report") || query.includes("intel") || query.includes("generate")) {
    return `[NEURAL X REPORT PROTOCOL 204C]

INTELLIGENCE SUMMARY:
1. Threat vectors mitigated: 147 within past operational period
2. Firewall rating: CLASS-S (Optimized shield rate)
3. Cyber attack map active nodes: 18 regional vectors
4. Local secure telemetry index: OK

Recommend executing periodic system scans to locate hidden backdoor micro-implants.`;
  }

  return `[NEURAL X CORE] Welcome to the military-grade offline simulation terminal.
AI Cyber Defense Agent is online. I can simulate anomalies, run defensive protocols, analyze security profiles, or catalog threat mitigations.

SYSTEM PROTOCOL ADVISORY:
To enable real generative AI intelligence, link your **GEMINI_API_KEY** in the Secrets drawer.`;
}

// Hook up Vite middleware or production build
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    // Production: serve static build files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static distribution files.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NEURAL OPERATING SYSTEM STARTED]`);
    console.log(`Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
