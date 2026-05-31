import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, AlertTriangle, Play, Cpu, ShieldAlert } from "lucide-react";
import { playUiFeedback, playAlertAlarm } from "../audio";

interface TerminalProps {
  onTriggerSimulatedAttack: () => void;
  onClearDiagnostics: () => void;
}

export default function Terminal({ onTriggerSimulatedAttack, onClearDiagnostics }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "NEURAL X SECURE HYPERVISOR V9.14 ONLINE",
    "INITIALIZATION STATE: FULLY COMPILED",
    "TYPE 'help' TO ACCESS MILITARY-GRADE CONTROL SYSTEMS.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const [showMatrixRain, setShowMatrixRain] = useState(true);
  
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-scroll inside console prompt
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix code rain animation inside canvas
  useEffect(() => {
    if (!showMatrixRain) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = 160;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 160;
    };
    window.addEventListener("resize", handleResize);

    const katakana = "ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890$#@%+*";
    const alphabet = katakana.split("");

    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize);

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * -100;
    }

    let animId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 240, 255, 0.5)"; // neon cyber glow teal rain
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Highlight head character in bright white
        if (Math.random() > 0.97) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(text, x, y);
          ctx.fillStyle = "rgba(0, 240, 255, 0.5)";
        }

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [showMatrixRain]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim();
    if (!command) return;

    playUiFeedback("click");
    const outputList = [...history, `neural-x://guest$ ${command}`];

    const cleanCmd = command.toLowerCase().trim();

    if (cleanCmd === "help") {
      outputList.push(
        "---------------------------------------------------------",
        "AVAILABLE MILITARY-GRADE EXECUTABLE ROUTINES:",
        "  help                     List command utility vectors",
        "  scan --network           Audit current logical channels for anomalies",
        "  ai-threat-detect         Command AI protection agent to simulate audit check",
        "  launch-defense-protocol  Engage heavy dynamic military shield vectors",
        "  security-grade           Readout classified real-time diagnostic rating",
        "  wipe-diagnostics         Clear all current telemetry logs inside system buffers",
        "  trigger-attack           Inject simulated cyber breach sequence on root nodes",
        "  matrix                   Toggle background matrix rain streams (Cyan-glow)",
        "  clear                    Flush consoles and clear lines",
        "---------------------------------------------------------"
      );
    } else if (cleanCmd === "scan --network") {
      outputList.push(
        ">> CRITICAL INTEGRITY SCAN LAUNCHED...",
        ">> AUDITING INTERNET PROTOCOL SEGMENTS...",
        ">> OK: Localhost on 0.0.0.0:3000 mapped successfully.",
        ">> DETECTED: 1 anomalous dynamic package flowing through SEC-NODE-4.",
        ">> SHIELD RATE REBUILT IN REAL TIME."
      );
    } else if (cleanCmd === "ai-threat-detect") {
      outputList.push(
        ">> [AI DEFENDER ANALYSIS INTEL] ...",
        "   - Threat Potential: HIGH - Decentralized vectors spotted on deep sensors",
        "   - Recourse: Run SSH patch 2.4.9 immediately.",
        "   - Protection Rating: Grade AAA Active Defense Synchronized."
      );
    } else if (cleanCmd === "launch-defense-protocol") {
      playAlertAlarm();
      onTriggerSimulatedAttack();
      outputList.push(
        "⚡⚡⚡⚡⚡⚡⚡⚡ [SECURITY ALARM SIGNAL SENT] ⚡⚡⚡⚡⚡⚡⚡⚡",
        ">> ENGAGING HEAVY SHIELD DEFENSE ARRAYS...",
        ">> FIRED: Sentinel defensive protocol SECURE_MODE_X engaged.",
        ">> STATUS: ALL ENCRYPTED CHANNELS SECURED."
      );
    } else if (cleanCmd === "security-grade") {
      outputList.push(
        ">> Sentinel index rating: Grade AAA Excellent Secure Integrity.",
        "   Firewall bypass detection modules reporting 0 core slips."
      );
    } else if (cleanCmd === "wipe-diagnostics") {
      onClearDiagnostics();
      outputList.push(">> DIAGNOSTICS BUFFER WIPED. ALL INTERNAL TRACES REMOVED.");
    } else if (cleanCmd === "trigger-attack") {
      onTriggerSimulatedAttack();
      outputList.push("⚡ WARNING: SIMULATED INBOUND MASSIVE CYBER VECTOR INJECTED! CHECK COMMAND CENTER AND RADAR.");
    } else if (cleanCmd === "matrix") {
      setShowMatrixRain(!showMatrixRain);
      outputList.push(`>> Matrix code rain has been ${!showMatrixRain ? "ENABLED" : "DISABLED"}.`);
    } else if (cleanCmd === "clear") {
      setHistory(["[CONSOLES FLUSHED]", ""]);
      setInputVal("");
      return;
    } else {
      outputList.push(`>> COMMAND PROTOCOL NOT FOUND: '${command}'. Type 'help' to audit system commands.`);
    }

    outputList.push(""); // spacer
    setHistory(outputList);
    setInputVal("");
  };

  return (
    <div id="hacker-terminal-emulator" className="bg-slate-900/10 border border-cyan-900/50 backdrop-blur-md rounded-lg overflow-hidden flex flex-col h-[550px] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      
      {/* Terminal Header */}
      <div className="bg-black/60 border-b border-cyan-900/30 px-4 py-2 flex justify-between items-center text-xs font-mono text-cyan-400">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 animate-pulse" />
          <span className="font-bold tracking-widest text-cyber-cyan">NEURAL_X_TERMINAL_V9.1 // LIVE CORE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-red animate-ping" />
          <span className="text-[10px] text-gray-500 mr-2">SYS_LOCK: DEMO_GUEST</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      </div>

      {/* Embedded Matrix Rain Visualizer Frame */}
      {showMatrixRain && (
        <div className="relative border-b border-cyber-cyan/10 bg-black overflow-hidden h-40">
          <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-2 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 px-3 py-1 text-cyber-cyan border border-cyber-cyan/20 rounded">
            Holographic Matrix Data Stream Matrix-OS
          </div>
        </div>
      )}

      {/* Terminal buffer output logs */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-cyber-cyan space-y-2.5 bg-black/50 backdrop-blur-sm">
        <div className="text-gray-500 text-[10px] border-b border-dashed border-cyan-500/10 pb-2 mb-2">
          OPERATIONAL LOGS LOGGED SUBSCALE: 0.14e-4s // SECURE CONNECTION BUFFER ACTIVE
        </div>
        
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap select-text">
            {line.startsWith("neural-x://") ? (
              <span className="text-white font-bold">{line}</span>
            ) : line.includes("⚡") ? (
              <span className="text-cyber-red font-semibold">{line}</span>
            ) : line.startsWith("  ") ? (
              <span className="text-gray-400">{line}</span>
            ) : (
              <span className="text-cyber-green">{line}</span>
            )}
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>

      {/* CMD prompt input */}
      <form onSubmit={handleCommandSubmit} className="bg-black/75 border-t border-cyan-900/35 px-4 py-3 flex items-center">
        <label htmlFor="terminal-input" className="text-white font-bold font-mono mr-2 shrink-0 select-none">
          neural-x://guest$
        </label>
        <input 
          id="terminal-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter intelligence script (e.g., 'help', 'scan --network', 'launch-defense-protocol')..."
          className="flex-1 bg-transparent border-none text-cyber-green outline-none font-mono text-xs placeholder-gray-600 focus:ring-0 w-full"
          autoComplete="off"
        />
        <button 
          id="terminal-submit-btn"
          type="submit" 
          className="ml-3 font-mono text-[10px] bg-cyber-cyan/15 border border-cyber-cyan/40 hover:bg-cyber-cyan/35 cursor-pointer text-cyber-cyan tracking-widest px-3 py-1 rounded transition-all"
        >
          EXECUTE
        </button>
      </form>

    </div>
  );
}
