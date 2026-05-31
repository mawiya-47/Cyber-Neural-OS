import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldAlert, ShieldCheck, ShieldClose, Globe, Radio, 
  MapPin, ShieldAlert as AlertIcon, Eye, Zap, Crosshair
} from "lucide-react";
import { ThreatEvent } from "../types";
import { playUiFeedback, playAlertAlarm } from "../audio";

interface ThreatCenterProps {
  threats: ThreatEvent[];
  onIsolateThreat: (id: string) => void;
  onMitigateAll: () => void;
}

export default function ThreatCenter({ threats, onIsolateThreat, onMitigateAll }: ThreatCenterProps) {
  const [selectedThreat, setSelectedThreat] = useState<ThreatEvent | null>(null);
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Radar Sweep Scan simulation under canvas
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) - 10;

      // Draw radar background circles
      ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
      ctx.lineWidth = 1;
      
      // concentric circles
      for (let d = 0.25; d <= 1.0; d += 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * d, 0, Math.PI * 2);
        ctx.stroke();
      }

      // crosshair lines
      ctx.beginPath();
      ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
      ctx.stroke();

      // Outer rings with notches
      ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.stroke();

      // Radar scanning sweep sector
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      
      const gradient = ctx.createConicGradient(0, 0, 0);
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.4)");
      gradient.addColorStop(0.15, "rgba(0, 240, 255, 0.1)");
      gradient.addColorStop(0.4, "rgba(0, 240, 255, 0.0)");
      gradient.addColorStop(1, "rgba(0, 240, 255, 0.0)");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, -0.4, 0.4);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();

      // Plot active threats inside the radar frame
      threats.forEach((th) => {
        if (th.isolated) return;
        // Map threat's grid positions internally to radar circles
        const tx = cx + (th.x - 50) * (r / 50) * 0.7;
        const ty = cy + (th.y - 50) * (r / 50) * 0.7;

        // Draw static indicator dot
        ctx.fillStyle = th.severity === "CRITICAL" || th.severity === "HIGH" ? "#ff0055" : "#ffb700";
        ctx.beginPath();
        ctx.arc(tx, ty, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring
        const tNow = Date.now();
        const tPulse = (tNow % 1200) / 1200;
        ctx.strokeStyle = th.severity === "CRITICAL" || th.severity === "HIGH" ? "rgba(255, 0, 85, 0.5)" : "rgba(255, 183, 0, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tx, ty, 5 + tPulse * 15, 0, Math.PI * 2);
        ctx.stroke();

        // Print core threat label tag
        ctx.fillStyle = "#ffffff";
        ctx.font = "8px monospace";
        ctx.fillText(th.threatType, tx + 8, ty - 3);
      });

      angle += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [threats]);

  // 2. Global Cyber Attack Map simulation under Canvas
  useEffect(() => {
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 280;

    let animId: number;
    let step = 0;

    // Fixed dummy coordinates for countries to look stylish
    const staticCountries = [
      { name: "USA", x: 120, y: 100 },
      { name: "GERMANY", x: 300, y: 70 },
      { name: "INDIA", x: 440, y: 140 },
      { name: "JAPAN", x: 530, y: 95 },
      { name: "AUSTRALIA", x: 520, y: 220 },
      { name: "BRAZIL", x: 200, y: 190 },
      { name: "UK", x: 280, y: 65 },
      { name: "SINGAPORE", x: 470, y: 175 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw stylized pixelated technical world background grid or dots
      ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
      for (let x = 30; x < width; x += 40) {
        for (let y = 20; y < height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw country labels as cyan beacons
      staticCountries.forEach((c) => {
        const cx = (c.x / 600) * width;
        const cy = (c.y / 280) * height;

        ctx.fillStyle = "rgba(0, 240, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(0, 240, 255, 0.6)";
        ctx.font = "8px monospace";
        ctx.fillText(c.name, cx + 6, cy + 3);
      });

      // Draw vector attack paths (glowing lines with animated packets)
      threats.forEach((th) => {
        if (th.isolated) return;

        // Map target coord
        const targetX = (th.x / 100) * width;
        const targetY = (th.y / 100) * height;

        // Source country beacon coordinate mapper
        const origin = staticCountries.find(c => c.name === th.country.toUpperCase()) || staticCountries[0];
        const sourceX = (origin.x / 600) * width;
        const sourceY = (origin.y / 280) * height;

        // Draw parabolic attack path line
        ctx.beginPath();
        ctx.strokeStyle = th.severity === "CRITICAL" ? "rgba(255, 0, 85, 0.35)" : "rgba(0, 102, 255, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(sourceX, sourceY);
        ctx.quadraticCurveTo((sourceX + targetX) / 2, Math.min(sourceY, targetY) - 50, targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Draw flying cyber photon package
        ctx.fillStyle = th.severity === "CRITICAL" ? "#ff0055" : "#00f0ff";
        const tParam = (step % 100) / 100;
        
        // Quad curve interpolation helper
        const midX = (sourceX + targetX) / 2;
        const midY = Math.min(sourceY, targetY) - 50;
        const packageX = (1 - tParam) * (1 - tParam) * sourceX + 2 * (1 - tParam) * tParam * midX + tParam * tParam * targetX;
        const packageY = (1 - tParam) * (1 - tParam) * sourceY + 2 * (1 - tParam) * tParam * midY + tParam * tParam * targetY;

        ctx.beginPath();
        ctx.arc(packageX, packageY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw blast wave at target coordinator
        ctx.strokeStyle = th.severity === "CRITICAL" ? "rgba(255,0,85, 0.4)" : "rgba(0, 240, 255, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(targetX, targetY, (step % 20) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      step += 1.2;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [threats]);

  const handleDefend = (id: string) => {
    playUiFeedback("critical");
    onIsolateThreat(id);
    setSelectedThreat(null);
  };

  const handleMitigateGlobal = () => {
    playUiFeedback("beep");
    onMitigateAll();
    setSelectedThreat(null);
  };

  return (
    <div id="threat-tracker-grid" className="space-y-6">
      
      {/* Dynamic Header actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-cyber-card border border-cyber-cyan/15 px-5 py-4 rounded-lg gap-4">
        <div>
          <h2 className="text-lg font-bold font-mono text-white tracking-widest uppercase flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyber-red animate-pulse" />
            CLASS-S REALTIME GLOBAL ATTACK MAP
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Incoming threat vector streams matched from decentralised telemetry nodes.
          </p>
        </div>
        <button 
          id="mitigate-all-breaches-btn"
          onClick={handleMitigateGlobal}
          className="bg-cyber-cyan/15 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/30 cursor-pointer text-xs font-mono font-bold tracking-widest px-4 py-2 rounded uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
        >
          DEPLOY SYSTEM-WIDE AUTONOMIC BLOCKS
        </button>
      </div>

      {/* Main Map & Radar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Large interactive Canvas World Map */}
        <div className="lg:col-span-2 bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-cyber-cyan font-mono tracking-widest font-bold uppercase block">
              Global Cyber Pathways Monitor
            </span>
            <span className="text-[10px] font-mono bg-cyber-red/10 border border-cyber-red/20 text-cyber-red px-2 py-0.5 rounded uppercase">
              ATTACKS SPOTTED: {threats.filter(t => !t.isolated).length}
            </span>
          </div>

          <div className="bg-[#050508] border border-cyber-cyan/10 rounded relative h-[280px]">
            <canvas ref={mapCanvasRef} className="w-full h-full block" />
            
            {/* Overlay Grid lines for HUD military look */}
            <div className="absolute top-0 bottom-0 left-[25%] w-px bg-cyan-500/5 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-[50%] w-px bg-cyan-500/5 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-[75%] w-px bg-cyan-500/5 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[50%] h-px bg-cyan-500/5 pointer-events-none" />

            <div className="absolute top-2 left-2 flex gap-1 items-center bg-black/85 px-2 py-1 text-[8px] font-mono border border-cyber-cyan/25 text-cyber-cyan">
              <Crosshair className="w-3 h-3 text-cyber-red animate-spin" />
              COOR_AUTO_SYNCING: TRUE
            </div>
          </div>
          
          <p className="text-[11px] font-mono text-gray-500 mt-2 text-right">
            GRID PARALLEL INDEXER: EPSILON-2 // SYSTEM LOAD NOMINAL
          </p>
        </div>

        {/* Right Side: Radar Sweeper Canvas */}
        <div className="bg-[#0a0c14] border border-cyber-cyan/15 p-5 rounded-lg flex flex-col items-center justify-between">
          <div className="w-full">
            <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase text-center mb-4 flex items-center justify-center gap-1.5">
              <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
              TACTICAL SCANNING RADAR
            </h3>
            
            <div className="bg-black/80 rounded-full border border-cyber-cyan/15 p-2 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,102,255,0.05)]">
              <canvas ref={radarCanvasRef} width={220} height={220} className="rounded-full bg-black block" />
            </div>
          </div>

          <div className="w-full mt-4 text-center">
            <div className="bg-black/50 p-2 border border-cyber-cyan/10 rounded text-[11px] font-mono text-gray-400">
              RADAR GAIN: <span className="text-cyber-cyan font-bold">42dB</span> // DECOY FREQUENCY: <span className="text-cyber-cyan">94.8MHz</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Interactive Alerts Cards & Threat Intelligence Investigator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Box A: Active Threats Queue */}
        <div className="bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg">
          <h3 className="text-sm font-mono font-bold tracking-widest text-white uppercase mb-4">
            THREAT VECTOR PIPELINE OVERVIEW
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {threats.length === 0 ? (
              <div className="text-center py-10 font-mono text-xs text-gray-500">
                NO ENEMY PENETRATION SOURCE SPOTTED. CORE DEFENSES 100% NOMINAL.
              </div>
            ) : (
              threats.map((th) => (
                <div 
                  key={th.id} 
                  onClick={() => { playUiFeedback("click"); setSelectedThreat(th); }}
                  className={`border p-3 rounded cursor-pointer transition-all duration-200 ${
                    selectedThreat?.id === th.id 
                      ? "bg-cyber-cyan/10 border-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.15)]" 
                      : th.isolated 
                      ? "bg-black/10 border-cyber-green/20 opacity-60" 
                      : th.severity === "CRITICAL" 
                      ? "bg-cyber-red/5 border-cyber-red/30 hover:bg-cyber-red/10" 
                      : "bg-[#0b0e1a] border-cyan-500/10 hover:border-cyber-cyan/30"
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${th.isolated ? "bg-cyber-green" : "bg-cyber-red animate-ping"}`} />
                      <span className="font-semibold text-gray-200">{th.threatType}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                      th.isolated 
                        ? "bg-cyber-green/20 text-cyber-green" 
                        : th.severity === "CRITICAL" 
                        ? "bg-cyber-red/20 text-cyber-red" 
                        : "bg-cyber-yellow/20 text-cyber-yellow"
                    }`}>
                      {th.isolated ? "ISOLATED" : th.severity}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 mt-2">
                    <span>Source Beacon: <strong className="text-white">{th.country}</strong> // IP: {th.ipAddress}</span>
                    <span className="text-cyber-cyan text-xs font-bold hover:underline flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> INVESTIGATE
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Box B: Intel Investigator Panel */}
        <div className="bg-[#0b0e1a] border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between hud-corner-brackets">
          {selectedThreat ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-cyber-cyan/15 pb-2">
                <div>
                  <h4 className="font-mono font-bold text-white text-md uppercase">
                    RESOLVING THREAT: <span className="text-cyber-red">{selectedThreat.threatType}</span>
                  </h4>
                  <p className="text-[10px] font-mono text-gray-400 mt-0.5">
                    VECTOR UNIQUE ID: {selectedThreat.id}
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-cyber-red/15 text-cyber-red border border-cyber-red/30 px-2 py-1 rounded">
                  RISK: {selectedThreat.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-black/60 p-2 border border-cyber-cyan/10 rounded">
                  <span className="text-gray-400 block mb-0.5">Target Coordinate Index</span>
                  <span className="text-cyber-cyan font-bold">X: {selectedThreat.x} // Y: {selectedThreat.y}</span>
                </div>
                <div className="bg-black/60 p-2 border border-cyber-cyan/10 rounded">
                  <span className="text-gray-400 block mb-0.5">Bypass IP Address</span>
                  <span className="text-cyber-yellow font-bold">{selectedThreat.ipAddress}</span>
                </div>
                <div className="bg-black/60 p-2 border border-cyber-cyan/10 rounded">
                  <span className="text-gray-400 block mb-0.5">Source Country Origination</span>
                  <span className="text-white font-bold uppercase">{selectedThreat.country}</span>
                </div>
                <div className="bg-black/60 p-2 border border-cyber-cyan/10 rounded">
                  <span className="text-gray-400 block mb-0.5">Log Capture Timestamp</span>
                  <span className="text-cyber-cyan font-bold">{selectedThreat.timestamp}</span>
                </div>
              </div>

              <div className="bg-black/50 p-3 rounded border border-cyber-cyan/5 text-xs font-mono">
                <p className="text-gray-300">
                  <strong className="text-cyber-cyan font-bold block uppercase mb-1">AI Diagnostic Action:</strong>
                  Vulnerability scan detected anomalous SQL Injection signature. The payload tries to bypass raw DB validation buffers. Immediate sanitization layer quarantine suggested.
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  id={`defend-threat-${selectedThreat.id}`}
                  onClick={() => handleDefend(selectedThreat.id)}
                  disabled={selectedThreat.isolated}
                  className="flex-1 bg-cyber-red border border-cyber-red hover:bg-cyber-red/90 cursor-pointer disabled:bg-gray-800 disabled:border-gray-700 disabled:text-gray-500 text-white font-mono text-xs font-bold py-2 px-3 rounded uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2"
                >
                  <Crosshair className="w-4 h-4 animate-spin" />
                  {selectedThreat.isolated ? "SHIELD SECURED ON PORT" : "DEPLOY SANITIZING FORCEFIRE WALL"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <Crosshair className="w-12 h-12 text-gray-700 animate-pulse" />
              <div>
                <span className="font-mono font-bold text-gray-400 block uppercase">Threat Intelligence Hub</span>
                <span className="font-mono text-xs text-gray-500 block max-w-xs mt-1">
                  Select an active perimeter breach vector from the left list to isolate and launch military firewall counteractions.
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
