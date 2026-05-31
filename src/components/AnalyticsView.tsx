import React, { useState, useEffect } from "react";
import { Activity, ShieldAlert, Cpu, BarChart2, Radio, Server, Compass, FileText } from "lucide-react";
import { playUiFeedback } from "../audio";

export default function AnalyticsView() {
  const [packetRating, setPacketRating] = useState<number[]>([42, 59, 31, 85, 47, 62, 70, 41, 95]);
  const [vectorRating, setVectorRating] = useState([
    { name: "SQLi Breach Attempts", value: 384, color: "bg-cyber-red" },
    { name: "SSH Brute Forcing", value: 612, color: "bg-cyber-blue" },
    { name: "DDoS Reflected Packages", value: 890, color: "bg-cyber-cyan" },
    { name: "Cross-Site Injection Signals", value: 147, color: "bg-cyber-yellow" }
  ]);
  const [securityTrend, setSecurityTrend] = useState([
    { label: "00:00", value: 94 },
    { label: "04:00", value: 96 },
    { label: "08:00", value: 89 },
    { label: "12:00", value: 98 },
    { label: "16:00", value: 92 },
    { label: "20:00", value: 95 }
  ]);

  // Dynamic metrics updates
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketRating(prev => {
        const next = [...prev.slice(1)];
        next.push(Math.floor(20 + Math.random() * 75));
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="analytics-tactical-dashboard" className="space-y-6">
      
      {/* Header telemetry info banner */}
      <div className="flex justify-between items-center bg-cyber-card border border-cyber-cyan/15 px-5 py-4 rounded-lg">
        <div>
          <h2 className="text-md font-bold font-mono text-white tracking-widest uppercase flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-cyber-yellow animate-bounce" />
            REAL-TIME SECURITY ANALYTICS ENGINE
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Raw signal metrics tracking threat patterns and active firewall blockage integrity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Cyber packet waves - Dynamic Histogram */}
        <div className="bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between h-80">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-cyber-cyan font-bold uppercase tracking-widest block">
                Continuous Packet Flow Burst Rate
              </span>
              <span className="text-[9px] font-mono text-gray-500 uppercase">SYS_INDEX: K-90</span>
            </div>

            <div className="flex items-end justify-between h-40 bg-black/60 p-4 border border-cyber-cyan/10 rounded relative">
              {/* grid helper lines */}
              <div className="absolute left-0 right-0 top-1/4 h-px border-t border-dashed border-cyan-500/5" />
              <div className="absolute left-0 right-0 top-2/4 h-px border-t border-dashed border-cyan-500/5" />
              <div className="absolute left-0 right-0 top-3/4 h-px border-t border-dashed border-cyan-500/5" />

              {packetRating.map((v, idx) => (
                <div key={idx} className="flex flex-col items-center w-full group">
                  <span className="text-[8px] font-mono text-cyber-cyan mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {v}Mb
                  </span>
                  <div 
                    className="w-4 bg-gradient-to-t from-cyber-blue to-cyber-cyan rounded-t transition-all duration-500 shadow-[0_0_10px_rgba(0,102,255,0.3)] hover:from-cyber-cyan hover:to-[#ffffff]"
                    style={{ height: `${v}%` }}
                  />
                  <span className="text-[7px] font-mono text-gray-500 mt-2">P{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-mono text-gray-500 leading-relaxed mt-2 uppercase">
            *Flow speed shows intermittent cyber package anomalies captured on direct honeypot channels.
          </p>
        </div>

        {/* 2. Vector Anomaly distributions - Horizontal Indicators */}
        <div className="bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between h-80">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-cyber-yellow font-bold uppercase tracking-widest block">
                Aggregated Breach Vector Statistics
              </span>
              <span className="text-[9px] font-mono text-gray-500">PAST OPERATIONAL PERIOD</span>
            </div>

            <div className="space-y-4">
              {vectorRating.map((v, idx) => (
                <div key={idx} className="space-y-1 font-mono">
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>{v.name}</span>
                    <span className="text-white font-bold">{v.value} vectors</span>
                  </div>
                  <div className="w-full bg-black/75 h-2 rounded-full overflow-hidden border border-cyan-500/5 relative">
                    <div 
                      className={`h-full ${v.color} transition-all duration-1000`}
                      style={{ width: `${(v.value / 1000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-mono text-gray-500 leading-relaxed mt-2 uppercase">
            *DDoS reflected traffic is dynamically mitigated by autonomic firewall layer modules.
          </p>
        </div>

        {/* 3. Security Shield over Time - Dynamic Line graph simulation using pure vectors */}
        <div className="bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between h-80 hud-corner-brackets">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-cyber-cyan font-bold uppercase tracking-widest block">
                Total Shield Health Integrity %
              </span>
              <span className="text-[9px] font-mono text-cyber-green uppercase">STATE: OPTIMIZED</span>
            </div>

            <div className="bg-black/60 border border-cyber-cyan/10 rounded p-4 relative h-40">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                {/* mesh grid inside SVG */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(0, 240, 255, 0.05)" strokeDasharray="2,2" />

                {/* Draw curve path */}
                <path 
                  d="M 5 20 Q 40 5, 80 40 T 160 10 T 200 15" 
                  fill="none" 
                  stroke="#00f0ff" 
                  strokeWidth="2.5" 
                  className="drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                />
                
                {/* Secondary curve */}
                <path 
                  d="M 5 45 Q 45 60, 90 20 T 180 30 T 200 40" 
                  fill="none" 
                  stroke="#ff0055" 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2"
                />

                {/* indicator dot pivots */}
                <circle cx="80" cy="40" r="4.5" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="160" cy="10" r="4.5" fill="#ffffff" stroke="#ff0055" strokeWidth="2" />
              </svg>

              <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[7px] font-mono text-gray-500">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mt-2">
            <span>MEDIAN RATING: <strong className="text-white">96.8%</strong></span>
            <span>SHIELD ENFORCER: ACTIVE</span>
          </div>
        </div>

      </div>

      {/* Cyber threat vectors summary metrics */}
      <div className="bg-[#0b0e1a] border border-cyber-cyan/15 rounded-lg p-5">
        <h3 className="text-sm font-mono font-bold tracking-widest text-white uppercase mb-4">
          SYSTEM HEALTH DIAGNOSTIC REPORT MATRIX
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/40 border border-cyber-cyan/10 p-4 rounded text-xs font-mono space-y-1">
            <span className="text-gray-500 uppercase block text-[10px]">Total Traffic Buffer Cap</span>
            <span className="text-xl font-bold text-cyber-cyan block">1,824,492 PKTS</span>
            <p className="text-[10px] text-gray-400">Continuous bandwidth sync index is secure across gateways.</p>
          </div>
          
          <div className="bg-black/40 border border-cyber-cyan/10 p-4 rounded text-xs font-mono space-y-1">
            <span className="text-gray-500 uppercase block text-[10px]">Autonomic Defense Actions</span>
            <span className="text-xl font-bold text-cyber-green block">14,902 SECURED</span>
            <p className="text-[10px] text-gray-400">Total volume of automated blocks triggered safely.</p>
          </div>

          <div className="bg-black/40 border border-cyber-cyan/10 p-4 rounded text-xs font-mono space-y-1">
            <span className="text-gray-500 uppercase block text-[10px]">Class Override Rating</span>
            <span className="text-xl font-bold text-cyber-red block">99.8% nominal</span>
            <p className="text-[10px] text-gray-400">AI security models correctly isolated 99.8% of anomaly events.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
