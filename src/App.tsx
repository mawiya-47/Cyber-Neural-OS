import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, ShieldAlert, Cpu, Database, Network, Radio, Sparkles, Terminal as TerminalIcon, 
  Settings, Play, Volume2, VolumeX, Menu, X, ExternalLink, RefreshCw, Layers, CheckCircle, FileText
} from "lucide-react";

import { 
  SystemLog, SecurityScore, ConnectionNode, NetworkConnection, ThreatEvent, DiagnosticMetrics, UserMessage, ActiveTab 
} from "./types";
import { 
  initSoundEngine, toggleSoundEnabled, getSoundStatus, playBootSequence, playUiFeedback 
} from "./audio";

// Sub-components import page nodes
import Dashboard from "./components/Dashboard";
import Terminal from "./components/Terminal";
import ThreatCenter from "./components/ThreatCenter";
import AiAssistant from "./components/AiAssistant";
import NetworkMonitor from "./components/NetworkMonitor";
import AnalyticsView from "./components/AnalyticsView";
import ReportsView from "./components/ReportsView";
import ContactView from "./components/ContactView";

export default function App() {
  // Boot Sequence State
  const [isBooted, setIsBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStatusStrings, setBootStatusStrings] = useState<string[]>([
    "MOUNTING QUANTUM CYBER CHANNELS...",
    "INITIATING ENCRYPTED HOST DIALS...",
    "SYNCING DEEPMIND AI RECOURSE MODELS...",
    "ENGAGING CLASS-S SENTINEL CORE FIREWALL..."
  ]);
  const [currentBootStatus, setCurrentBootStatus] = useState("LOCATING COMMAND TERMINAL INTERFACE...");

  // Sound Engine Enable
  const [soundsActive, setSoundsActive] = useState(false);

  // Active Operating System State Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Live Simulated Logs Array
  const [logsList, setLogsList] = useState<SystemLog[]>([
    {
      id: "log-1",
      timestamp: "20:25:10",
      sourceNode: "QUANTUM_FIREWALL",
      severity: "LOW",
      vector: "Dynamic UDP Port Scan Mitigation",
      payload: "PORTSWEEP_53_80",
      status: "BLOCKED"
    },
    {
      id: "log-2",
      timestamp: "20:26:02",
      sourceNode: "DB_CLUSTER_B",
      severity: "MEDIUM",
      vector: "Anomalous SQL Validation Check Attempt",
      payload: "SELECT * FROM administrators;--",
      status: "CONTAINED"
    }
  ]);

  // Security Integrity Gauges
  const [securityScore, setSecurityScore] = useState<SecurityScore>({
    coreShield: 97,
    firewallRating: 95,
    aiCoreConfidence: 98,
    threatIntegrity: 98
  });

  // Dynamic Metrics Updates
  const [metrics, setMetrics] = useState<DiagnosticMetrics>({
    cpuUsage: [25, 30, 22, 45, 38],
    ramUsage: [61, 62, 60, 63, 62],
    networkIn: [142, 190, 85, 300, 240],
    networkOut: [88, 110, 52, 180, 150],
    scanPulse: 100
  });

  // Threat Event nodes on Map
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([
    {
      id: "threat-1",
      title: "Reflective UDP Scan Outbreak",
      country: "Germany",
      ipAddress: "109.28.14.92",
      threatType: "DNS ampl DDoS reflect",
      severity: "HIGH",
      x: 35,
      y: 40,
      timestamp: "20:27:14",
      durationLeft: 20
    },
    {
      id: "threat-2",
      title: "Encrypted DB Root Intrusions",
      country: "USA",
      ipAddress: "172.56.230.14",
      threatType: "DB Buffer overflow attempt",
      severity: "CRITICAL",
      x: 65,
      y: 48,
      timestamp: "20:28:02",
      durationLeft: 40
    }
  ]);

  // AI Assistant Chat Messages State
  const [aiChatHistory, setAiChatHistory] = useState<UserMessage[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);

  // High-precision clock state for Immersive UI
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, "0");
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
      setSystemTime(`${hrs}:${mins}:${secs}.${ms}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 50);
    return () => clearInterval(interval);
  }, []);

  // Sound toggler handler
  const handleToggleSound = () => {
    const res = toggleSoundEnabled();
    setSoundsActive(res);
  };

  // Launch boot sequence simulator
  const handleTriggerLaunch = () => {
    // Enable system audio
    initSoundEngine();
    setSoundsActive(true);
    playBootSequence();

    let prog = 0;
    const interval = setInterval(() => {
      prog += 4;
      setBootProgress(prog);

      // Mutate progress subtitle text strings for tech aesthetics
      if (prog < 25) {
        setCurrentBootStatus("DISSOLVING SECURE QUANTUM NETWORKS...");
      } else if (prog < 50) {
        setCurrentBootStatus("MOUNTING DYNAMIC DETECTOR BEACONS...");
      } else if (prog < 75) {
        setCurrentBootStatus("INDEXING REALTIME CYBER ATTACK THREATS...");
      } else if (prog < 95) {
        setCurrentBootStatus("COMMUNICATING COMPILER WITH DEEPMIND AI...");
      } else {
        setCurrentBootStatus("NEURAL CORE STABILIZED. WELCOME OPERATOR!");
      }

      if (prog >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooted(true);
          setActiveTab("DASHBOARD");
        }, 500);
      }
    }, 90);
  };

  // Automated threat simulation injection: every 18 seconds, trigger an internal anomaly
  useEffect(() => {
    if (!isBooted) return;

    const threatTimer = setInterval(() => {
      const isCritical = Math.random() > 0.6;
      const attackCountries = ["USA", "Germany", "India", "Japan", "Brazil", "UK"];
      const randomIp = `185.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
      const randomCountry = attackCountries[Math.floor(Math.random() * attackCountries.length)];
      
      const novelThreat: ThreatEvent = {
        id: `threat-${Date.now()}`,
        title: isCritical ? "Massive Core Buffer Bypass Attempt" : "Endpoint Port sweep activity Detected",
        country: randomCountry,
        ipAddress: randomIp,
        threatType: isCritical ? "SQL Injection Breach" : "Port sweep scan",
        severity: isCritical ? "CRITICAL" : "HIGH",
        x: Math.floor(25 + Math.random() * 60),
        y: Math.floor(20 + Math.random() * 65),
        timestamp: new Date().toLocaleTimeString(),
        durationLeft: 45
      };

      setThreatEvents(prev => [...prev, novelThreat]);
      
      // Inject Log corresponding to threat
      const novelLog: SystemLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        sourceNode: "QUANTUM_FIREWALL",
        severity: isCritical ? "CRITICAL" : "HIGH",
        vector: novelThreat.title,
        payload: isCritical ? "UNION SELECT ALL password_hashes FROM system_users;--" : "SYN_PORT_PING",
        status: "MONITORING"
      };

      setLogsList(prev => [...prev.slice(-30), novelLog]); // keep last 30 logs

      // Play alert chime
      playUiFeedback(isCritical ? "critical" : "beep");

      // Detract score temporarily
      setSecurityScore(prev => ({
        ...prev,
        coreShield: Math.max(72, prev.coreShield - (isCritical ? 6 : 3)),
        threatIntegrity: Math.max(50, prev.threatIntegrity - (isCritical ? 10 : 5))
      }));

    }, 18000);

    return () => clearInterval(threatTimer);
  }, [isBooted]);

  // Core Actions
  const handleIsolateThreatSingle = (id: string) => {
    setThreatEvents(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, isolated: true };
      }
      return t;
    }));

    // Inject alert mitigated log
    const remedyLog: SystemLog = {
      id: `log-rem-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNode: "AI_CORE_DEFENDER",
      severity: "LOW",
      vector: "Dynamic threat isolated completely",
      payload: "SHIELD_GATE_REDEPLOY",
      status: "MITIGATED"
    };
    setLogsList(prev => [...prev, remedyLog]);

    // Restore rating
    setSecurityScore(prev => ({
      ...prev,
      coreShield: Math.min(100, prev.coreShield + 5),
      threatIntegrity: Math.min(100, prev.threatIntegrity + 8)
    }));
  };

  const handleMitigateAllGlobally = () => {
    setThreatEvents(prev => prev.map(t => ({ ...t, isolated: true })));
    
    const wipeLog: SystemLog = {
      id: `log-wipe-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNode: "COMMAND_HYPERVISOR",
      severity: "LOW",
      vector: "Autonomous Decoy quarantine deployment executed.",
      payload: "WIPE_ACTIVE_VECTOR_PATHS",
      status: "MITIGATED"
    };
    setLogsList(prev => [...prev, wipeLog]);

    setSecurityScore({
      coreShield: 99,
      firewallRating: 98,
      aiCoreConfidence: 100,
      threatIntegrity: 100
    });
  };

  // API Call: Gemini Chat Agent proxy dispatcher
  const handleSendChatMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMsgObj: UserMessage = {
      id: `msg-usr-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setAiChatHistory(prev => [...prev, userMsgObj]);
    setAiGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...aiChatHistory, userMsgObj].map(m => ({
            role: m.role,
            content: m.content
          })),
          systemInstruction: "You are the NEURAL X AI Core, a highly analytical military-grade cyber defense intelligence agent. Speak in high-tech, slightly robotic, precise, futuristic, but helpful terms. Suggest specific remedies for system threats, and analyze network anomalies, log records, and source intelligence."
        })
      });

      if (!response.ok) {
        throw new Error("HTTP error network failure.");
      }

      const data = await response.json();
      const botMsgObj: UserMessage = {
        id: `msg-bot-${Date.now()}`,
        role: "assistant",
        content: data.text || "Cognition buffer parse failed to emit string content.",
        timestamp: new Date().toLocaleTimeString()
      };

      setAiChatHistory(prev => [...prev, botMsgObj]);
    } catch (err: any) {
      console.warn("AI Core Gateway warning. Using localized smart-assistant diagnostics proxy.", err);
      
      // Local highly technical fallback matching query patterns
      const query = userInput.toLowerCase();
      let fallbackText = "";

      if (query.includes("ddos") || query.includes("scan")) {
        fallbackText = `[NEURAL X LOCAL EMERGENCY OVERRIDE]

ANALYTICAL METRICS FOR DNS REFLECTIVE DETECT:
- Status: Mitigated with Epsilon-2 decoy honeypot.
- Target Port: 53 UDP Inbound.
- Protocol: Firewall block deployed autonomously under ruleset BLOCK_53.
- Source vectors: Logged and quarantined. Core reactor temperature stabilized at nominal levels.`;
      } else {
        fallbackText = `[LOCAL INTEGRITY DIAGNOSTIC DETECTED]

Secure communication linked nominally. The neural defender analyzed your input signature.
Core status checks out secure with Grade AAA cyber shield rating locked.

*(To experience live generative AI response logic, configure a real GEMINI_API_KEY in the Secrets side drawers)*`;
      }

      const botMsgObj: UserMessage = {
        id: `msg-bot-fail-${Date.now()}`,
        role: "assistant",
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString()
      };
      setAiChatHistory(prev => [...prev, botMsgObj]);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleManualInjectAttack = () => {
    // Inject massive simulated attack right now
    const randomIp = "142.250.190.46";
    const manualThreat: ThreatEvent = {
      id: `threat-manual-${Date.now()}`,
      title: "Tactical Overlap Buffer Ingress Attack",
      country: "JAPAN",
      ipAddress: randomIp,
      threatType: "Root level RCE vulnerability attempt",
      severity: "CRITICAL",
      x: 75,
      y: 25,
      timestamp: new Date().toLocaleTimeString(),
      durationLeft: 50
    };

    setThreatEvents(prev => [...prev, manualThreat]);

    const attackLog: SystemLog = {
      id: `log-manual-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      sourceNode: "QUANTUM_FIREWALL",
      severity: "CRITICAL",
      vector: "ALERT: Buffer overflow ingress attempted.",
      payload: "RCE_OVERLINK_0x8fcc01a",
      status: "MONITORING"
    };
    setLogsList(prev => [...prev, attackLog]);

    setSecurityScore(prev => ({
      ...prev,
      coreShield: Math.max(68, prev.coreShield - 10),
      threatIntegrity: Math.max(45, prev.threatIntegrity - 15)
    }));

    playUiFeedback("critical");
  };

  const handleClearTerminalDiagData = () => {
    setLogsList([]);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans selection:bg-cyber-cyan/35 select-none relative overflow-x-hidden pt-2 pb-12 crt-flicker">
      <div className="scanlines" />

      {/* Grid overlay */}
      <div className="absolute inset-0 digital-grid pointer-events-none z-0" />

      {/* A. CINEMATIC INTRO BOOT SCREEN */}
      {!isBooted ? (
        <div className="min-h-screen flex flex-col items-center justify-center relative z-15 p-6 bg-gradient-to-tr from-[#0b0f19] via-cyber-black to-[#060910] flex-1">
          <div className="max-w-xl w-full text-center space-y-6 bg-slate-900/40 border border-cyan-900/50 p-8 rounded-lg relative backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            
            {/* Holographic scanner indicator */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none laser-scanner" />

            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-cyber-cyan/15 rounded-full border border-cyber-cyan animate-pulse">
                <Shield className="w-12 h-12 text-cyber-cyan animate-spin" />
              </div>
              <h1 className="text-4xl font-extrabold font-sans tracking-widest text-white mt-3">
                NEURAL <span className="text-cyber-cyan font-bold block md:inline">X OPERATING SYSTEM</span>
              </h1>
              <p className="text-xs text-cyber-cyan font-mono uppercase tracking-widest">
                Classified Military Guard-Net Core V9.14 // Ready
              </p>
            </div>

            <p className="text-xs text-gray-400 font-mono leading-relaxed px-4">
              “DEFEND THE DIGITAL FUTURE” <br />
              AI-powered military-grade cyber defense intelligence command center built for high-risk network analysis and quantum boundary intrusion blockades.
            </p>

            {/* Launch Actions */}
            <div className="space-y-4 pt-4">
              {bootProgress === 0 ? (
                <div className="flex flex-col gap-3">
                  <button 
                    id="boot-launch-btn"
                    onClick={handleTriggerLaunch}
                    className="w-full bg-cyber-cyan text-black font-extrabold font-mono text-sm tracking-widest py-3 rounded cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] uppercase flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Launch Cyber OS Command Center
                  </button>
                </div>
              ) : (
                <div className="space-y-3 font-mono">
                  <div className="flex justify-between text-xs text-cyber-cyan">
                    <span>{currentBootStatus}</span>
                    <span className="font-bold">{bootProgress}%</span>
                  </div>
                  
                  {/* Cyber load progress line bar */}
                  <div className="w-full bg-[#111624] h-2.5 rounded overflow-hidden border border-cyber-cyan/30">
                    <div 
                      className="bg-cyber-cyan h-full transition-all duration-150 shadow-[0_0_10px_#00f0ff]" 
                      style={{ width: `${bootProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="text-[9px] font-mono text-gray-600 uppercase pt-2">
              Caution: High-intensity graphic diagnostic interfaces enabled inside.
            </div>

          </div>
        </div>
      ) : (
        
        // B. PRIMARY COGNITIVE WORKSPACE LAYOUT
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10 flex flex-col min-h-screen justify-between">
          
          {/* Header OS Control panel */}
          <header className="flex justify-between items-center border-b border-cyan-900/50 bg-black/40 backdrop-blur-md pb-4 mb-6 pt-3 px-4 relative z-20">
            <div className="flex items-center gap-3">
              {/* Dynamic menu button for mobile layout */}
              <button 
                id="sidebar-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 border border-cyber-cyan/35 text-cyber-cyan rounded cursor-pointer"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div 
                className="flex items-center cursor-pointer"
                onClick={() => { playUiFeedback("click"); setActiveTab("DASHBOARD"); }}
              >
                <div className="w-8 h-8 border border-cyber-cyan flex items-center justify-center rotate-45 mr-3 select-none">
                  <div className="w-4 h-4 bg-cyber-cyan rotate-45 animate-pulse"></div>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold tracking-[0.2em] italic font-sans text-cyber-cyan">NEURAL <span className="text-white">X</span></span>
                  <div className="ml-4 hidden md:block px-3 py-1 border border-cyber-red/50 bg-cyber-red/10 text-[10px] text-cyber-red font-mono tracking-widest">
                    SECURE PROTOCOL ACTIVE
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive high-tech telemetry from Design scheme */}
            <div className="hidden lg:flex items-center gap-8 font-mono text-[11px] opacity-80 border-l border-r border-cyan-900/30 px-6 py-1 h-fit">
              <div className="flex flex-col items-end">
                <span className="text-cyan-200">SYSTEM TIME SO_UTC</span>
                <span className="text-white font-bold">{systemTime || "00:00:00.00"}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-cyan-200">UPLINK STREAM</span>
                <span className="text-cyber-green font-bold">STABLE (99.2%)</span>
              </div>
              <div className="flex flex-col items-end text-cyber-red">
                <span className="opacity-70">DEFENSE LAYER STATE</span>
                <span className="font-bold">{securityScore.coreShield < 90 ? "CRITICAL" : "NOMINAL"}</span>
              </div>
            </div>

            {/* Audio Toggle control and links */}
            <div className="flex items-center gap-3">
              <button 
                id="audio-toggle-top-btn"
                onClick={handleToggleSound}
                className={`p-2 rounded border border-cyan-900/50 cursor-pointer transition-all duration-300 ${
                  soundsActive 
                    ? "bg-cyber-cyan/25 border-cyber-cyan text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]" 
                    : "bg-black/80 border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
                title="Toggle cyber OS synthesize sounds"
              >
                {soundsActive ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
              </button>

              {/* Enter direct Command link */}
              <button 
                id="header-enter-cmd-btn"
                onClick={() => { playUiFeedback("click"); setActiveTab("TERMINAL"); }}
                className="hidden sm:flex items-center gap-1.5 bg-cyber-cyan text-black hover:bg-white cursor-pointer text-xs font-bold font-mono py-1.5 px-3 rounded uppercase tracking-wider transition-all"
              >
                <TerminalIcon className="w-4 h-4" />
                Terminal Console
              </button>
            </div>
          </header>

          {/* Primary View Area Grid Splitter */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start flex-1 mb-8">
            
            {/* Sidebar OS Tab Menu Navigators */}
            <div className={`lg:col-span-1 space-y-4 ${sidebarOpen ? "block fixed inset-y-0 left-0 bg-[#05070a] z-30 w-64 p-5 pt-20 border-r border-cyan-900/40 lg:relative lg:block lg:inset-auto lg:bg-transparent lg:z-auto lg:w-full lg:p-0 lg:border-none" : "hidden lg:block"}`}>
              <div className="bg-slate-900/25 border border-cyan-900/50 rounded-lg p-4 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                <span className="text-[10px] text-cyber-cyan font-mono tracking-widest font-bold uppercase block mb-4 border-b border-cyan-900/30 pb-2">
                  Operating System Interfaces
                </span>

                <nav className="space-y-1.5">
                  {[
                    { id: "DASHBOARD", label: "Command Center HUD", icon: Cpu },
                    { id: "THREAT_CENTER", label: "Threat Center Map", icon: ShieldAlert },
                    { id: "AI_ASSISTANT", label: "AI Cyber Assistant", icon: Sparkles },
                    { id: "NETWORK", label: "Logical Linkage Monitor", icon: Network },
                    { id: "ANALYTICS", label: "Metrics & Heatmaps", icon: Radio },
                    { id: "REPORTS", label: "Defense Intel Briefs", icon: FileText },
                    { id: "TERMINAL", label: "Military Emulator Console", icon: TerminalIcon },
                    { id: "CONTACT", label: "Cryptographic Dispatch", icon: Settings }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button 
                        key={tab.id}
                        id={`nav-tab-${tab.id}`}
                        onClick={() => { 
                          playUiFeedback("click"); 
                          setActiveTab(tab.id as ActiveTab); 
                          setSidebarOpen(false); 
                        }}
                        className={`w-full flex items-center justify-between text-left cursor-pointer px-3.5 py-2.5 rounded text-xs font-mono transition-all duration-200 uppercase ${
                          isActive 
                            ? "bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold" 
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <TabIcon className={`w-4 h-4 ${isActive ? "text-cyber-cyan" : "text-gray-500"}`} />
                          <span>{tab.label}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Defensive scoring system widget */}
              <div className="bg-slate-900/25 border border-cyan-900/50 p-4 rounded-lg font-mono text-[11px] text-gray-400 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                <span className="text-white font-bold block mb-1 uppercase text-xs">
                  Autonomic Safeguard Standard
                </span>
                <p className="leading-relaxed text-gray-500 mb-3 uppercase">
                  ACTIVE DECOYS ROUTINE SECURE_MODE_X EXECUTING IN REZ LOOP.
                </p>
                <div className="flex justify-between items-center bg-black p-2 border border-cyber-cyan/5 rounded">
                  <span>DNS FIREWALL STATE:</span>
                  <span className="text-cyber-green font-bold">● CLASS-S Nominal</span>
                </div>
              </div>
            </div>

            {/* Dynamic Content Frame */}
            <div className="lg:col-span-3">
              {activeTab === "DASHBOARD" && (
                <Dashboard 
                  logs={logsList}
                  metrics={metrics}
                  score={securityScore}
                  onNavigate={(tab) => { playUiFeedback("click"); setActiveTab(tab); }}
                  triggerNewAlert={handleManualInjectAttack}
                  runDecontaminate={() => {
                    // Refresh score logic
                    setSecurityScore({
                      coreShield: 99,
                      firewallRating: 98,
                      aiCoreConfidence: 100,
                      threatIntegrity: 100
                    });
                  }}
                />
              )}

              {activeTab === "THREAT_CENTER" && (
                <ThreatCenter 
                  threats={threatEvents}
                  onIsolateThreat={handleIsolateThreatSingle}
                  onMitigateAll={handleMitigateAllGlobally}
                />
              )}

              {activeTab === "AI_ASSISTANT" && (
                <AiAssistant 
                  chatHistory={aiChatHistory}
                  onSendMessage={handleSendChatMessage}
                  isGenerating={aiGenerating}
                  systemInstruction="You are the NEURAL X AI Core, a highly analytical military-grade cyber defense intelligence agent."
                />
              )}

              {activeTab === "NETWORK" && (
                <NetworkMonitor />
              )}

              {activeTab === "ANALYTICS" && (
                <AnalyticsView />
              )}

              {activeTab === "REPORTS" && (
                <ReportsView />
              )}

              {activeTab === "TERMINAL" && (
                <Terminal 
                  onTriggerSimulatedAttack={handleManualInjectAttack}
                  onClearDiagnostics={handleClearTerminalDiagData}
                />
              )}

              {activeTab === "CONTACT" && (
                <ContactView />
              )}
            </div>

          </div>

          {/* Majestic Cyberpunk Glowing Footer */}
          <footer className="border-t border-cyber-cyan/15 pt-6 mt-12 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-500 gap-4">
            <div>
              <p className="uppercase">
                © {new Date().getFullYear()} NEURAL X NETWORKS LTD. ALL DATA ENCRYPTED SEC-S9.
              </p>
              <p className="text-[10px] text-cyber-cyan/60 mt-0.5">
                CLASS: RECTIFIER DIRECTIVE // DESIGN_VIBE: FBI SCIFI CMD CENTER
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="bg-gradient-to-r from-cyber-cyan via-[#ffffff] to-cyber-cyan bg-clip-text text-transparent font-extrabold tracking-widest text-xs uppercase animate-pulse select-none">
                SYSTEM ENGINEERED BY MUHAMMAD MAWIYA
              </span>
              <div className="flex gap-1 mt-1 justify-end w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
                <span className="text-[9px] text-[#00f0ff] uppercase tracking-wider">HOLOGRAPHIC SIGNAL SEAL APPROVED</span>
              </div>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
