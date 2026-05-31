import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Bot, MessageSquare, Zap, ShieldAlert, Cpu, 
  RefreshCw, Layers, CheckCircle2, ChevronRight, Volume2, VolumeX
} from "lucide-react";
import { UserMessage } from "../types";
import { playUiFeedback, startAIVoicePulseHum, stopAIVoicePulseHum } from "../audio";

interface AiAssistantProps {
  chatHistory: UserMessage[];
  onSendMessage: (msg: string) => void;
  isGenerating: boolean;
  systemInstruction: string;
}

export default function AiAssistant({ 
  chatHistory, 
  onSendMessage, 
  isGenerating,
  systemInstruction
}: AiAssistantProps) {
  const [inputText, setInputText] = useState("");
  const [voiceSynthesizerMode, setVoiceSynthesizerMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const coreCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isGenerating]);

  // Voice Pulse Hum sound
  useEffect(() => {
    if (isGenerating && voiceSynthesizerMode) {
      startAIVoicePulseHum();
    } else {
      stopAIVoicePulseHum();
    }
    return () => stopAIVoicePulseHum();
  }, [isGenerating, voiceSynthesizerMode]);

  // Holographic Cybernetic Core animation inside Canvas!
  useEffect(() => {
    const canvas = coreCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scaleFactor = isGenerating ? 1.25 : 1.0;
      const pulseRate = isGenerating ? Math.sin(Date.now() * 0.01) * 10 : Math.sin(Date.now() * 0.003) * 6;

      // Draw outer glowing ring
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 70 * scaleFactor + pulseRate, 0, Math.PI * 2);
      ctx.stroke();

      // Draw orbit core rotating ring A
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([20, 15, 5, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, 55 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw orbit core counter-rotating ring B
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-rotation * 1.6);
      ctx.strokeStyle = "rgba(255, 0, 85, 0.45)"; // glowing red orbital
      ctx.lineWidth = 1.2;
      ctx.setLineDash([10, 20]);
      ctx.beginPath();
      ctx.arc(0, 0, 42 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner glowing energy sphere
      const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28 * scaleFactor + Math.abs(pulseRate));
      gradient.addColorStop(0, isGenerating ? "rgba(255, 0, 85, 0.85)" : "rgba(0, 240, 255, 0.85)");
      gradient.addColorStop(0.5, isGenerating ? "rgba(255, 0, 85, 0.3)" : "rgba(0, 240, 255, 0.3)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 30 * scaleFactor + Math.abs(pulseRate), 0, Math.PI * 2);
      ctx.fill();

      // Draw technical crosshairs
      ctx.strokeStyle = "rgba(0, 240, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 85, cy); ctx.lineTo(cx - 75, cy);
      ctx.moveTo(cx + 75, cy); ctx.lineTo(cx + 85, cy);
      ctx.moveTo(cx, cy - 85); ctx.lineTo(cx, cy - 75);
      ctx.moveTo(cx, cy + 75); ctx.lineTo(cx, cy + 85);
      ctx.stroke();

      rotation += isGenerating ? 0.05 : 0.01;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query || isGenerating) return;

    playUiFeedback("click");
    onSendMessage(query);
    setInputText("");
  };

  const loadPresetQuery = (promptText: string) => {
    if (isGenerating) return;
    playUiFeedback("click");
    onSendMessage(promptText);
  };

  const toggleVoiceMode = () => {
    playUiFeedback("beep");
    setVoiceSynthesizerMode(!voiceSynthesizerMode);
  };

  // Predefined highly stylish cybersecurity AI prompts
  const suggestions = [
    { title: "Simulate MITM Exploit", text: "Explain how to model or simulate a MITM attack in secure VPC and give a prevention protocol." },
    { title: "Review Zero-Day Patch", text: "Generate standard threat intelligence audit instructions for zero-day software exploit patching." },
    { title: "Evaluate Firewall Gaps", text: "Create a checklist to locate hidden vulnerabilities inside a company's database gateway firewalls." },
    { title: "Explain Defense Metrics", text: "What are the key military cybersecurity logs standard that Neural X monitors in realtime?" }
  ];

  return (
    <div id="ai-assistant-hud-panel" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Column A: Holographic orbital core Reactor and system guidelines */}
      <div className="bg-[#0a0c14] border border-cyber-cyan/15 p-5 rounded-lg flex flex-col items-center justify-between text-center relative overflow-hidden h-[540px]">
        {/* scanner line */}
        <div className="laser-scanner absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

        <div className="w-full">
          <span className="text-xs text-cyber-cyan font-mono tracking-widest font-bold uppercase block mb-1">
            CORE INTEGRATED NEURAL AI REACTOR
          </span>
          <span className="text-[10px] text-gray-400 font-mono uppercase block">
            CLASSIFIED AGENT // PROTOCOLS SYNCED
          </span>
        </div>

        {/* Animated canvas core */}
        <div className="flex flex-col items-center justify-center my-6 relative">
          <canvas ref={coreCanvasRef} width={200} height={200} className="block cursor-crosshair" />
          
          <div className="mt-4">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-black/80 rounded border ${
              isGenerating 
                ? "border-cyber-red text-cyber-red animate-pulse shadow-[0_0_10px_rgba(255,0,85,0.2)]" 
                : "border-cyber-cyan text-cyber-cyan"
            }`}>
              {isGenerating ? "NEURAL ENGINE DEEP COGNITION ACTIVE" : "AI SYSTEM LISTENING NODE"}
            </span>
          </div>
        </div>

        {/* Technical information readout */}
        <div className="w-full text-left space-y-3 font-mono text-xs bg-black/60 p-4 rounded border border-cyber-cyan/10">
          <div className="flex justify-between items-center text-gray-400">
            <span>Model Core</span>
            <span className="text-white">gemini-3.5-flash-v1</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Server Proxy Mode</span>
            <span className="text-cyber-green">● LINKED SECURE</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Telemetry Response</span>
            <span className="text-cyber-cyan">ACTIVE SSL</span>
          </div>

          <button 
            id="synth-sound-assist-btn"
            onClick={toggleVoiceMode}
            className={`w-full flex items-center justify-center gap-2 cursor-pointer border py-1.5 rounded transition-all duration-200 mt-2 ${
              voiceSynthesizerMode 
                ? "bg-cyber-red/20 border-cyber-red text-cyber-red animate-pulse" 
                : "bg-cyber-blue/10 border-cyber-blue/40 text-cyber-blue hover:bg-cyber-blue/20"
            }`}
          >
            {voiceSynthesizerMode ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[10px] font-bold tracking-wider uppercase">
              {voiceSynthesizerMode ? "AI PROTOTYPE AUDIO ON (BEEP-PULSE)" : "ACTIVATE SOUND GENERATOR MUTE"}
            </span>
          </button>
        </div>
      </div>

      {/* Column B: Primary chat feed interface */}
      <div className="lg:col-span-2 bg-[#050508] border border-cyber-cyan/15 rounded-lg flex flex-col justify-between h-[540px]">
        
        {/* Header bar of Chat */}
        <div className="bg-[#0a0c14] border-b border-cyber-cyan/15 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1 bgColor bg-cyber-cyan/15 rounded text-cyber-cyan">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                AI MILITARY CYBER DEFENDER CHAT CORE
              </h3>
              <p className="text-[9px] text-gray-500 font-mono">
                Ask anomalies, log signatures or request dynamic malware mitigations
              </p>
            </div>
          </div>
          
          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-900/20 border border-cyan-800/40 px-2.5 py-0.5 rounded uppercase">
            SECURE DIRECT DIALOGUE CHANNEL
          </span>
        </div>

        {/* Conversation flow container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#050510]/30 scroll-smooth">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
              <MessageSquare className="w-10 h-10 text-gray-700" />
              <div>
                <span className="font-mono font-bold text-gray-400 block uppercase">INITIALIZED SECURE DIALOGUE THREAD</span>
                <span className="font-mono text-xs text-gray-500 block max-w-sm mt-1">
                  Input custom anomalous log records, security scripts, or click one of our preset threat intelligence queries to review real-time AI defensive mitigations.
                </span>
              </div>
            </div>
          ) : (
            chatHistory.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded shrink-0 border flex items-center justify-center text-xs font-mono ${
                  message.role === "user" 
                    ? "bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue" 
                    : "bg-cyber-cyan/15 border-cyber-cyan/30 text-cyber-cyan"
                }`}>
                  {message.role === "user" ? "USR" : <Bot className="w-4 h-4 text-cyber-cyan" />}
                </div>

                {/* Bubble */}
                <div className={`p-3.5 rounded text-xs leading-relaxed font-mono ${
                  message.role === "user" 
                    ? "bg-cyber-blue/15 border border-cyber-blue/25 text-white" 
                    : "bg-cyber-card border border-cyber-cyan/15 text-gray-150 relative"
                }`}>
                  {/* Print micro timestamp */}
                  <span className="text-[9px] text-gray-500 block mb-1 text-right select-none">{message.timestamp}</span>
                  
                  {/* Message plain code parser to make it look highly stylized */}
                  <div className="whitespace-pre-wrap selection:bg-cyber-cyan/35 select-text">
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {isGenerating && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded bg-cyber-red/10 border border-cyber-red/30 flex items-center justify-center font-mono text-xs text-cyber-red uppercase animate-pulse">
                AI
              </div>
              <div className="bg-[#120a10] border border-cyber-red/35 p-3 rounded text-xs font-mono text-cyber-red">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>DECOMPILING ANALYTICAL METRICS... COGNATING RESPONSE PLOTS</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Quick Chips */}
        <div className="px-4 py-2 bg-black/60 border-t border-cyber-cyan/10">
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
            Suggested Intelligence Actions
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                id={`preset-query-${idx}`}
                onClick={() => loadPresetQuery(s.text)}
                disabled={isGenerating}
                className="text-[9px] shrink-0 font-mono bg-[#0b0e1a] border border-cyan-500/15 hover:border-cyber-cyan hover:bg-[#11162b] cursor-pointer text-cyber-cyan px-2.5 py-1 rounded transition-all"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSubmit} className="bg-[#0a0c14] border-t border-cyber-cyan/15 p-3 flex gap-2">
          <input 
            id="chat-query-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder="Type your security threat question to the cyber AI core..."
            className="flex-1 bg-black/75 rounded border border-cyber-cyan/10 text-white font-mono text-xs px-3 py-2 outline-none focus:border-cyber-cyan/40 placeholder-gray-600 disabled:opacity-50"
            autoComplete="off"
          />
          <button 
            id="chat-send-btn"
            type="submit"
            disabled={isGenerating || !inputText.trim()}
            className="bg-cyber-cyan hover:bg-cyber-cyan/90 cursor-pointer disabled:bg-gray-800 disabled:text-gray-500 font-mono text-black font-bold text-xs tracking-wider px-4 py-2 rounded flex items-center gap-1.5 transition-all"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
