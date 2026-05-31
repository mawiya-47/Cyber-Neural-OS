import React, { useState } from "react";
import { Send, Terminal as TerminalIcon, Radio, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";
import { playUiFeedback } from "../audio";

export default function ContactView() {
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [targetHost, setTargetHost] = useState("SEC-HOST-90A1");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !details) return;

    playUiFeedback("critical");
    setIsSubmitting(true);
    setLogs([">> INITIALIZING CRYPTOGRAPHIC ENVELOPE...", ">> RESOLVING TACTICAL AGENCY GATEWAYS..."]);

    // Simulated terminal packet trace dispatch
    setTimeout(() => {
      setLogs(prev => [...prev, ">> SUCCESS: Encrypting packet with RSA-4096-ECC key.", ">> SENDING PAYLOAD TO: 127.0.0.1:3000..."]);
    }, 800);

    setTimeout(() => {
      setLogs(prev => [...prev, ">> TRANSMITTING TACTICAL SYSTEM ANOMALY DIAL TO CYBER AGENCY GATEWAYS...", ">> DISPATCH INDEX CHECKED: SUCCESS."]);
    }, 1600);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playUiFeedback("beep");
    }, 2400);
  };

  const handleReset = () => {
    setName("");
    setAgency("");
    setTargetHost("SEC-HOST-90A1");
    setDetails("");
    setSubmitted(false);
    setLogs([]);
  };

  return (
    <div id="classified-contact-panel" className="space-y-6">
      
      {/* Header bar info */}
      <div className="flex justify-between items-center bg-cyber-card border border-cyber-cyan/15 px-5 py-4 rounded-lg">
        <div>
          <h2 className="text-md font-bold font-mono text-white tracking-widest uppercase flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyber-red animate-ping" />
            SECURE EXPLOIT DISPATCH & TELEMETRY SUBMIT FORUM
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Dispatch diagnostic log traces or critical exploit reports directly to intelligence commands.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form panel */}
        <div className="bg-[#0b0e1a] border border-cyber-cyan/15 p-5 rounded-lg relative overflow-hidden hud-corner-brackets flex flex-col justify-between">
          {!submitted ? (
            <form onSubmit={handleSubmitDispatch} className="space-y-4 font-mono text-xs">
              <span className="text-[10px] text-cyber-cyan tracking-widest font-bold uppercase block mb-2 border-b border-cyber-cyan/15 pb-1">
                SECURE AGENCY REGISTRATION FORM
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="agent-name" className="text-gray-400 block text-[9px] uppercase font-bold">
                    Tactical Agent Identifier Name *
                  </label>
                  <input 
                    id="agent-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Guest Admin Mawiya"
                    className="w-full bg-black border border-cyber-cyan/15 rounded p-2 text-white outline-none focus:border-cyber-cyan/40"
                    autoComplete="off"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="agent-agency" className="text-gray-400 block text-[9px] uppercase font-bold">
                    Assigned Cyber Security Agency
                  </label>
                  <input 
                    id="agent-agency"
                    type="text"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="e.g., GUEST-OPERATIVE"
                    className="w-full bg-black border border-cyber-cyan/15 rounded p-2 text-white outline-none focus:border-cyber-cyan/40"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="agent-host" className="text-gray-400 block text-[9px] uppercase font-bold">
                  Vulnerable Target Host Code
                </label>
                <input 
                  id="agent-host"
                  type="text"
                  value={targetHost}
                  onChange={(e) => setTargetHost(e.target.value)}
                  placeholder="SEC-HOST-90A1"
                  className="w-full bg-black border border-cyber-cyan/15 rounded p-2 text-white outline-none focus:border-cyber-cyan/40"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="agent-details" className="text-gray-400 block text-[9px] uppercase font-bold">
                  Exploit Signature Signal / Diagnostic Message *
                </label>
                <textarea 
                  id="agent-details"
                  required
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide logs, SSH entry point diagnostic payloads, or security questions..."
                  className="w-full bg-black border border-cyber-cyan/15 rounded p-2 text-white outline-none focus:border-cyber-cyan/40"
                />
              </div>

              <button 
                id="dispatch-telemetry-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyber-red border border-cyber-red hover:bg-cyber-red/90 cursor-pointer disabled:bg-gray-800 disabled:border-gray-700 disabled:text-gray-500 font-bold tracking-widest text-xs uppercase py-2.5 px-4 rounded transition-all flex items-center justify-center gap-2 text-white shadow-[0_0_12px_rgba(255,0,85,0.2)]"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "DIGITIZING CRYPTO STREAM..." : "DISPATCH ENCRYPTED SYSTEM LOGS"}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-cyber-green animate-bounce" />
              <div>
                <h4 className="font-mono font-bold text-white text-md uppercase">CRYPTOGRAPHIC DISPATCH RESOLVED CORRECTLY</h4>
                <p className="font-mono text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                  Your secure telemetry report was packaged, sealed with ECC key rulesets, and dispatched. The intelligence command center will inspect your logs shortly.
                </p>
              </div>
              <button 
                id="reset-contact-btn"
                onClick={handleReset}
                className="bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/25 cursor-pointer font-bold tracking-widest text-[10px] p-2 rounded uppercase"
              >
                OPEN NEW TELEMETRY CHANNELS
              </button>
            </div>
          )}
        </div>

        {/* Real-time Transmission Logger Console side box */}
        <div className="bg-black border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-cyber-cyan font-bold block uppercase mb-4 border-b border-cyber-cyan/10 pb-1.5 flex items-center gap-1">
              <TerminalIcon className="w-4 h-4 animate-pulse" />
              TRANSMISSION PACKET DISPATCH LOGGER
            </span>

            <div className="space-y-2.5 max-h-80 overflow-y-auto font-mono text-xs text-cyber-green">
              {logs.length === 0 ? (
                <div className="text-gray-600 text-center py-20 uppercase">
                  READY TO ENGAGE SSL SECURE CHANNEL TRANSMITTER.
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="leading-snug">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#0b0e1a] p-3 border border-cyan-500/5 mt-4 rounded">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>CIPHER: AES-GCM-256</span>
              <span className="text-cyber-green">● LINKED DIAL</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
