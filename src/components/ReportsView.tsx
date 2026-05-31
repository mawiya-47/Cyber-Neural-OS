import React, { useState } from "react";
import { FileText, Download, CheckCircle, Clock, ShieldAlert, Sparkles, Send } from "lucide-react";
import { playUiFeedback } from "../audio";

export default function ReportsView() {
  const [selectedReportId, setSelectedReportId] = useState("rep-01");
  const [reportText, setReportText] = useState(`[CLASSIFIED INTEL BRIEF] NEURAL X CYBER THREAT ASSESSMENT
==========================================================
CONFIDENTIALITY LEVEL: SEC-S9 DIRECTIVE // SYSTEM EXPORT
TIMESTAMP: 2026-05-24 UTC_TICK_STREAM

1. EXECUTIVE THREAT ABSTRACT
-----------------------------
Within the past operational period, Neural X sensors detected a series of 
coordinated DNS Amplification DDoS vectors targeting SEC-NODE-04. System 
autonome triggers immediately launched isolated honeypots, successfully mitigating 
100% of external anomalous packages.

2. SUSPICIOUS LOG ANOMALY DETECTED
-----------------------------------
- Attack Vector Source: 104.28.19.14 (Rotational VPN Gateway Location)
- Method: Reflective UDP Flood (Port 53)
- Max Payload Size Detected: 1420 bytes
- Integrity Impact: NULL (Core sentinel shield sustained complete defense blocks).

3. MITIGATION RESOLUTION SCHEDULE
----------------------------------
- Block Rule ID: BLOCK_RULE_UDP_53_AMP (Executed under Class-S Firewall Engine)
- AI Core Confidence Ratiocination: 98.4%
- Core Status Check: Nominally secure. All cooling valves are within nominal boundaries.

4. ENDPOINT RECOMMENDATIONS
----------------------------
Deploy standard rate-limiting on port 53. Patch raw database SQL buffer gateways to avoid complementary SQL injection sequences.`);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportsList = [
    { id: "rep-01", title: "Automated Host DNS Threat Leak", date: "May 24, 2026", type: "CRITICAL" },
    { id: "rep-02", title: "Global Database Gateway Scan Incident", date: "May 23, 2026", type: "HIGH" },
    { id: "rep-03", title: "Phishing E-Mail Injection Campaign", date: "May 20, 2026", type: "LOW" }
  ];

  const handleLoadReport = (repId: string) => {
    playUiFeedback("click");
    setSelectedReportId(repId);
    if (repId === "rep-01") {
      setReportText(`[CLASSIFIED INTEL BRIEF] NEURAL X CYBER THREAT ASSESSMENT
==========================================================
CONFIDENTIALITY LEVEL: SEC-S9 DIRECTIVE // SYSTEM EXPORT
TIMESTAMP: 2026-05-24 UTC_TICK_STREAM

1. EXECUTIVE THREAT ABSTRACT
-----------------------------
Coordinated DNS Amplification DDoS vectors targeting SEC-NODE-04 mitigated successfully.

2. SUSPICIOUS LOG ANOMALY DETECTED
-----------------------------------
- Attack Vector Source: 104.28.19.14 (Rotational VPN)
- Max Payload Size: 1420 bytes
- Core status: Sustained complete defense blocks.`);
    } else if (repId === "rep-02") {
      setReportText(`[DATABASE BREACH PREVENTION BRIEF] VULNERABILITY SCAN
==========================================================
CONFIDENTIALITY LEVEL: SEC-S4 DIRECTIVE // DATABASE ARCHIVE

1. SUMMARY OF SQL GATEWAY INTEGRITY
-----------------------------------
Anomalous SQL Injection signature detected trying to bypass raw DB validation buffers.
Immediate sanitization layer quarantine executed.

2. REMEDY EXECUTED
------------------
Dynamic rule blocking implemented on main ingress gateway. 
Security ranking restored to premium AAA standard.`);
    } else {
      setReportText(`[MAIL GATE MONITOR] PHISHING CAMPAIGN MITIGATION
==========================================================
CONFIDENTIALITY LEVEL: SEC-S1 DIRECTIVE // PERIMETER SECURE

1. INCIDENT SYNOPSIS
-------------------
Minor wave of dynamic phishing headers blocked automatically by AI classifier nodes. No endpoints compromised. Fully isolated.`);
    }
  };

  const handleExportText = () => {
    playUiFeedback("click");
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2000);
  };

  return (
    <div id="classified-reports-container" className="space-y-6">
      
      {/* Header telemetry info banner */}
      <div className="flex justify-between items-center bg-cyber-card border border-cyber-cyan/15 px-5 py-4 rounded-lg">
        <div>
          <h2 className="text-md font-bold font-mono text-white tracking-widest uppercase flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyber-cyan animate-pulse" />
            CLASSIFIED THREAT INTELLIGENCE REPORTS
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Generate and export fully formatted military-grade incident audit reports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: List of available logs reports */}
        <div className="bg-cyber-card border border-cyber-cyan/15 p-5 rounded-lg">
          <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase mb-4">
            REPORT SELECTION QUEUE
          </h3>

          <div className="space-y-3">
            {reportsList.map((r) => (
              <div 
                key={r.id}
                onClick={() => handleLoadReport(r.id)}
                className={`border p-3 rounded cursor-pointer transition-all duration-200 ${
                  selectedReportId === r.id 
                    ? "bg-cyber-cyan/15 border-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.15)]" 
                    : "bg-[#0b0e1a] border-cyan-500/10 hover:border-cyber-cyan/30"
                }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-white">{r.title}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    r.type === "CRITICAL" ? "bg-cyber-red/20 text-cyber-red" : r.type === "HIGH" ? "bg-cyber-yellow/20 text-cyber-yellow" : "bg-cyber-blue/20 text-cyber-blue"
                  }`}>
                    {r.type}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mt-2">
                  <span>ID: {r.id}</span>
                  <span>Date: {r.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black/40 p-3 rounded border border-cyan-500/5 mt-5 text-xs font-mono text-gray-400 leading-relaxed">
            <strong className="text-cyber-cyan font-bold block mb-1 uppercase text-[10px]">Autonomic Generation:</strong>
            New incident reports are logged automatically when system alert thresholds are crossed. These briefs are suitable for direct security operations center inspection.
          </div>
        </div>

        {/* Right Side: Interactive Live Text Editor Briefing Card */}
        <div className="lg:col-span-2 bg-[#0b0e1a] border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between hud-corner-brackets">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-cyber-cyan/15 pb-2">
              <span className="text-xs font-mono text-cyber-cyan tracking-widest font-bold uppercase block">
                CLASSIFIED BRIEFING RAW FILE PREVIEW
              </span>
              <button 
                id="export-report-btn"
                onClick={handleExportText}
                className="flex items-center gap-2 bg-cyber-cyan text-black hover:bg-cyber-cyan/95 cursor-pointer text-xs font-mono font-bold tracking-widest px-3 py-1.5 rounded transition-all"
              >
                <Download className="w-4 h-4" />
                {downloadSuccess ? "FILE COPIED / EXPORTED" : "EXPORT SUMMARY BRIEF"}
              </button>
            </div>

            <textarea 
              id="report-raw-textarea"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="w-full h-96 bg-black text-cyber-green outline-none border border-cyber-cyan/10 rounded font-mono text-xs p-4 focus:border-cyber-cyan/30 selection:bg-cyber-cyan/40 select-text leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-gray-500 mt-3">
            <span>FILESIZE: {Number((reportText.length / 1024).toFixed(2))} KB</span>
            <span>FORMAT: UNIX STBY // ENCRYPTION: SECURE GUEST DECRYPTION KEY ON LOCK</span>
          </div>
        </div>

      </div>

    </div>
  );
}
