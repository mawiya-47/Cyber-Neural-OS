import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldAlert, ShieldCheck, Cpu, Database, Network, Flame, 
  Activity, RefreshCw, Radio, Terminal as TerminalIcon, AlertCircle, Play
} from "lucide-react";
import { SystemLog, SecurityScore, DiagnosticMetrics } from "../types";
import { playUiFeedback } from "../audio";

interface DashboardProps {
  logs: SystemLog[];
  metrics: DiagnosticMetrics;
  score: SecurityScore;
  onNavigate: (tab: any) => void;
  triggerNewAlert: () => void;
  runDecontaminate: () => void;
}

export default function Dashboard({ 
  logs, 
  metrics, 
  score, 
  onNavigate, 
  triggerNewAlert,
  runDecontaminate
}: DashboardProps) {
  const [coreTemp, setCoreTemp] = useState(42.4);
  const [activeDefenses, setActiveDefenses] = useState<string[]>([
    "Quantum Layer Firewall",
    "AI Anomaly Scanner Core",
    "Holographic HoneyPot Node B"
  ]);
  const [isDecontaminating, setIsDecontaminating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Core temperature micro-fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      setCoreTemp(prev => {
        const diff = (Math.random() - 0.48) * 0.4;
        return Number(Math.max(38.0, Math.min(68.5, prev + diff)).toFixed(1));
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Live telemetry canvas chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw cyber mesh grid
      ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw wave representation of network packet burst
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 240, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00f0ff";

      for (let i = 0; i < width; i++) {
        const angle = (i + offset) * 0.04;
        const mainWave = Math.sin(angle) * (height * 0.25);
        const subWave = Math.sin(angle * 2.5) * (height * 0.1);
        const noise = (Math.random() - 0.5) * 4;
        const y = height * 0.5 + mainWave + subWave + noise;

        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Secondary warning red pulse wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 85, 0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i++) {
        const angle = (i - offset * 0.8) * 0.03;
        const y = height * 0.6 + Math.cos(angle) * (height * 0.2) + (Math.random() - 0.5) * 6;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      offset += 1.8;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleDeconAction = () => {
    playUiFeedback("critical");
    setIsDecontaminating(true);
    runDecontaminate();
    setTimeout(() => {
      setIsDecontaminating(false);
      setActiveDefenses(prev => {
        if (!prev.includes("Quantum Threat Quarantine Cluster")) {
          return [...prev, "Quantum Threat Quarantine Cluster"];
        }
        return prev;
      });
    }, 2500);
  };

  return (
    <div id="dashboard-hud-container" className="space-y-6">
      {/* HUD Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/30 border border-cyan-900/50 p-4 rounded-lg gap-4 relative overflow-hidden backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <div>
          <div className="flex items-center gap-2 text-cyber-cyan">
            <Radio className="w-5 h-5 animate-pulse text-cyber-cyan" />
            <h2 className="text-xl font-bold font-mono tracking-widest uppercase">TACTICAL COMMAND OVERVIEW</h2>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-1">
            CLASS: Classified Military Security Core // Operational Local Time (STABLE)
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            id="dash-inject-threat-btn"
            onClick={() => { playUiFeedback("click"); triggerNewAlert(); }}
            className="flex items-center gap-2 bg-cyber-red/20 border border-cyber-red text-cyber-red hover:bg-cyber-red/30 cursor-pointer px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_10px_rgba(255,0,85,0.2)]"
          >
            <AlertCircle className="w-4 h-4 animate-bounce" />
            Inject Simulated Cyber Attack
          </button>
          
          <button 
            id="dash-decon-btn"
            onClick={handleDeconAction}
            disabled={isDecontaminating}
            className={`flex items-center gap-2 border cursor-pointer px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
              isDecontaminating 
                ? "bg-cyber-yellow/20 border-cyber-yellow text-cyber-yellow animate-pulse" 
                : "bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isDecontaminating ? "animate-spin" : ""}`} />
            {isDecontaminating ? "QUARANTINING SYSTEM..." : "RUN SECURITY SWEPT DECON"}
          </button>
        </div>
      </div>

      {/* Main Stats Bento Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Shield */}
        <div className="bg-slate-900/25 border border-cyan-900/50 backdrop-blur-sm p-5 rounded-lg relative overflow-hidden hud-corner-brackets flex flex-col justify-between h-40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">Core Sentinel Shield</span>
              <span className="text-2xl font-bold font-mono text-white mt-2 block">{score.coreShield}%</span>
            </div>
            <div className="p-2 bg-cyber-cyan/10 rounded border border-cyber-cyan/30">
              <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-cyber-cyan/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyber-cyan h-full transition-all duration-1000" 
                style={{ width: `${score.coreShield}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono mt-1 text-gray-500">
              <span>STATUS: SECURE</span>
              <span>GRID-S BLOCK</span>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1 laser-scanner bg-gradient-to-b from-transparent via-cyber-cyan to-transparent" />
        </div>

        {/* Threat Level */}
        <div className="bg-slate-900/25 border border-red-900/50 backdrop-blur-sm p-5 rounded-lg relative overflow-hidden hud-corner-brackets-red flex flex-col justify-between h-40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-cyber-red uppercase tracking-widest block">AI Threat Index Rating</span>
              <span className="text-2xl font-bold font-mono text-cyber-red mt-2 block">
                {score.threatIntegrity < 15 ? "CRITICAL OUTBREAK" : score.threatIntegrity < 50 ? "WARNING: BREACHED" : "OPTIMIZED SECURE"}
              </span>
            </div>
            <div className="p-2 bg-cyber-red/10 rounded border border-cyber-red/30 block">
              <ShieldAlert className="w-5 h-5 text-cyber-red animate-pulse" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-cyber-red/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyber-red h-full transition-all duration-1000" 
                style={{ width: `${100 - score.threatIntegrity}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono mt-1 text-gray-500">
              <span>ACTIVE THREAT GAUGES</span>
              <span>INTEGRITY: {score.threatIntegrity}%</span>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-1 laser-scanner bg-gradient-to-b from-transparent via-cyber-red to-transparent" />
        </div>

        {/* AI core status */}
        <div className="bg-slate-900/25 border border-cyan-900/50 backdrop-blur-sm p-5 rounded-lg relative overflow-hidden hud-corner-brackets flex flex-col justify-between h-40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-cyber-blue uppercase tracking-widest block">AI Core Synchronicity</span>
              <span className="text-2xl font-bold font-mono text-white mt-2 block">{score.aiCoreConfidence}%</span>
            </div>
            <div className="p-2 bg-cyber-blue/10 rounded border border-cyber-blue/30">
              <Cpu className="w-5 h-5 text-cyber-blue" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-cyber-blue/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyber-blue h-full transition-all duration-1000" 
                style={{ width: `${score.aiCoreConfidence}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono mt-1 text-gray-500">
              <span>NEURAL MATRIX SYNCHED</span>
              <span>MODEL: 3.5-FLASH</span>
            </div>
          </div>
        </div>

        {/* Reactor Core Temperature */}
        <div className="bg-slate-900/25 border border-cyan-900/50 backdrop-blur-sm p-5 rounded-lg relative overflow-hidden hud-corner-brackets flex flex-col justify-between h-40 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-cyber-yellow uppercase tracking-widest block">OS CPU Temp Core</span>
              <span className="text-2xl font-bold font-mono text-white mt-2 block">{coreTemp} °C</span>
            </div>
            <div className="p-2 bg-cyber-yellow/10 rounded border border-cyber-yellow/30">
              <Flame className="w-5 h-5 text-cyber-yellow animate-bounce" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-cyber-yellow/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-cyber-yellow h-full transition-all duration-300" 
                style={{ width: `${(coreTemp / 80) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono mt-1 text-gray-500">
              <span>REACTORS: NORMAL</span>
              <span>COOLING VALVE: 68%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Live Flow, Passive Shield status, System Health Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Real-time data wave & active cyber shields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cybernetic wave monitor */}
          <div className="bg-slate-900/20 border border-cyan-900/50 backdrop-blur-sm rounded-lg p-5 relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyber-cyan animate-pulse" />
                <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase">NEURAL ADAPTIVE TELEMETRY BURSTS</h3>
              </div>
              <span className="text-[10px] font-mono bg-cyber-cyan/10 text-cyber-cyan px-2 py-0.5 rounded border border-cyber-cyan/20">
                FREQUENCY MODULATION ACTIVE
              </span>
            </div>

            <div className="relative">
              <canvas 
                ref={canvasRef} 
                width={700} 
                height={160} 
                className="w-full bg-black/60 rounded border border-cyber-cyan/10 block h-40"
              />
              <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/80 px-2 py-1 border border-cyber-cyan/25 text-cyber-cyan">
                SYS_BURST: ENABLED
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-500 bg-black/40 px-1 rounded">
                SCALE: 2.8ms
              </div>
            </div>

            <p className="text-xs text-gray-400 font-mono mt-3 leading-relaxed">
              *The neural adapter continuously captures network telemetry packages and feeds anomaly signatures directly to the underlying DeepMind AI protection models.
            </p>
          </div>

          {/* Active Cyber Security Defenses Control */}
          <div className="bg-slate-900/20 border border-cyan-900/50 backdrop-blur-sm rounded-lg p-5">
            <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
              ACTIVE COMMAND SHIELDS & PROTOCOLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDefenses.map((shield, i) => (
                <div key={i} className="flex justify-between items-center bg-black/40 border border-cyber-cyan/10 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                    <span className="text-xs font-mono text-gray-300">{shield}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-cyber-cyan/15 text-cyber-cyan px-2 py-0.5 rounded uppercase border border-cyber-cyan/20">
                    ACTIVE
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-black/20 border border-dashed border-cyber-red/30 p-3 rounded opacity-75">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-red" />
                  <span className="text-xs font-mono text-gray-500">Autonomous Decoy Cluster</span>
                </div>
                <button 
                  onClick={() => {
                    playUiFeedback("beep");
                    setActiveDefenses(prev => [...prev, "Autonomous Decoy Cluster"]);
                  }}
                  className="text-[9px] font-mono bg-cyber-red/10 border border-cyber-red/30 hover:bg-cyber-red/25 cursor-pointer text-cyber-red px-2 py-0.5 rounded uppercase"
                >
                  DEACTIVATE SAFEBY/LAUNCH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Instant Real-time Logs Block */}
        <div className="bg-slate-900/20 border border-cyan-900/50 backdrop-blur-sm rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-cyber-cyan/10 pb-2">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-cyber-cyan" />
                <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase">ANOMALY DETECTOR FEED</h3>
              </div>
              <button 
                onClick={() => { playUiFeedback("click"); onNavigate("TERMINAL"); }}
                className="text-[10px] font-mono text-cyber-cyan hover:underline hover:text-white"
              >
                OPEN CONSOLE
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <div className="text-center py-10 font-mono text-xs text-gray-500">
                  SYSTEM NOMINAL. NO ADVISORY THREATS CAPTURED.
                </div>
              ) : (
                logs.slice().reverse().map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-2 rounded text-xs border font-mono ${
                      log.severity === "CRITICAL" || log.severity === "HIGH" 
                        ? "bg-cyber-red/5 border-cyber-red/30" 
                        : "bg-black/40 border-cyber-cyan/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9px] px-1 rounded font-bold ${
                        log.severity === "CRITICAL"
                          ? "bg-cyber-red text-white"
                          : log.severity === "HIGH"
                          ? "bg-cyber-yellow text-black"
                          : "bg-cyber-cyan/20 text-cyber-cyan"
                      }`}>
                        [{log.severity}]
                      </span>
                      <span className="text-[9px] text-gray-500">{log.timestamp}</span>
                    </div>
                    <div className="text-gray-200 break-all font-semibold">{log.vector}</div>
                    <div className="text-[10px] text-gray-400 mt-1">Payload: <code className="text-cyber-cyan">{log.payload}</code></div>
                    <div className="flex justify-between items-center mt-1 text-[9px]">
                      <span className="text-gray-500">Node: {log.sourceNode}</span>
                      <span className={`font-semibold ${
                        log.status === "BLOCKED" || log.status === "MITIGATED" 
                          ? "text-cyber-green" 
                          : "text-cyber-yellow"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cyber-cyan/10">
            <div className="bg-black/70 p-3 rounded border border-cyber-cyan/10">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Core System Integrator status</span>
                <span className="text-cyber-green">● OPTIMIZED</span>
              </div>
              <div className="w-full bg-cyber-green/5 h-2 rounded-full overflow-hidden border border-cyber-green/15">
                <div className="bg-cyber-green h-full w-[94%] animate-pulse" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
