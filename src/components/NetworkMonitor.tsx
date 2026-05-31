import React, { useState, useEffect, useRef } from "react";
import { Network, Cpu, Database, Server, User, PlusCircle, RefreshCw, Radio } from "lucide-react";
import { ConnectionNode, NetworkConnection } from "../types";
import { playUiFeedback } from "../audio";

export default function NetworkMonitor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("ai-core");
  const [pingCount, setPingCount] = useState<Record<string, number>>({});
  const [connections, setConnections] = useState<NetworkConnection[]>([
    { from: "ai-core", to: "firewall", packetFlowSpeed: 2.5, status: "active" },
    { from: "ai-core", to: "database", packetFlowSpeed: 1.5, status: "active" },
    { from: "firewall", to: "user-node", packetFlowSpeed: 3, status: "active" },
    { from: "database", to: "endpoint-1", packetFlowSpeed: 1, status: "active" },
    { from: "firewall", to: "endpoint-2", packetFlowSpeed: 1.8, status: "active" }
  ]);

  const [nodes, setNodes] = useState<ConnectionNode[]>([
    { id: "ai-core", label: "Neural AI Analyzer Core", x: 250, y: 150, type: "ai-core", status: "nominal", integrity: 100 },
    { id: "firewall", label: "Quantum Boundary Firewall", x: 120, y: 80, type: "firewall", status: "scanning", integrity: 98 },
    { id: "database", label: "Encrypted SQL DB Array-9", x: 380, y: 90, type: "database", status: "nominal", integrity: 100 },
    { id: "user-node", label: "Classified User SafeGate", x: 80, y: 220, type: "user-node", status: "nominal", integrity: 99 },
    { id: "endpoint-1", label: "Autonomous Decoy Server v2", x: 420, y: 230, type: "endpoint", status: "nominal", integrity: 92 },
    { id: "endpoint-2", label: "Holographic Perimeter Hub X", x: 190, y: 240, type: "endpoint", status: "nominal", integrity: 96 }
  ]);

  // Canvas interactive neural graph simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 340;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 340;
    };
    window.addEventListener("resize", handleResize);

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw futuristic coordinate grid
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw connection wires with packet flow particles
      connections.forEach((conn) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return;

        // Scale coordinates dynamically to fill size
        const scaleX = (val: number) => (val / 500) * (width - 100) + 50;
        const scaleY = (val: number) => (val / 300) * (height - 80) + 40;

        const x1 = scaleX(fromNode.x);
        const y1 = scaleY(fromNode.y);
        const x2 = scaleX(toNode.x);
        const y2 = scaleY(toNode.y);

        // Draw connection line
        ctx.strokeStyle = conn.status === "attacked" ? "rgba(255, 0, 85, 0.5)" : "rgba(0, 240, 255, 0.18)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Draw flowing data packet dots
        const numParticles = 3;
        for (let j = 0; j < numParticles; j++) {
          const t = ((particleOffset * conn.packetFlowSpeed + j * (100 / numParticles)) % 100) / 100;
          const px = x1 + t * (x2 - x1);
          const py = y1 + t * (y2 - y1);

          ctx.fillStyle = conn.status === "attacked" ? "#ff0055" : "#00f0ff";
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Particle trail glow
          ctx.fillStyle = conn.status === "attacked" ? "rgba(255, 0, 85, 0.15)" : "rgba(0, 240, 255, 0.15)";
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Node beacons
      nodes.forEach((node) => {
        const scaleX = (val: number) => (val / 500) * (width - 100) + 50;
        const scaleY = (val: number) => (val / 300) * (height - 80) + 40;

        const nx = scaleX(node.x);
        const ny = scaleY(node.y);
        const isSelected = node.id === selectedNodeId;

        // Glowing outer halo
        ctx.strokeStyle = isSelected 
          ? "rgba(0, 240, 255, 0.8)" 
          : node.status === "compromised"
          ? "rgba(255, 0, 85, 0.4)"
          : "rgba(0, 200, 255, 0.15)";
          
        ctx.lineWidth = isSelected ? 2.5 : 1;
        
        ctx.beginPath();
        ctx.arc(nx, ny, isSelected ? 22 : 16, 0, Math.PI * 2);
        ctx.stroke();

        // Pulsing radar ring on selected
        if (isSelected) {
          const tRing = (Date.now() % 1500) / 1500;
          ctx.strokeStyle = "rgba(0, 240, 255, " + (1 - tRing) + ")";
          ctx.beginPath();
          ctx.arc(nx, ny, 22 + tRing * 25, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Inner solid core
        ctx.fillStyle = node.status === "compromised" 
          ? "#ff0055" 
          : isSelected 
          ? "rgba(0, 240, 255, 0.9)" 
          : "#0a0c14";
        
        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.fill();

        // border of inner core
        ctx.strokeStyle = node.status === "compromised" ? "#ff0055" : "#00f0ff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Print tactical identifier tag
        ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255,255,255,0.7)";
        ctx.font = isSelected ? "bold 10px monospace" : "10px monospace";
        ctx.fillText(node.label, nx + (isSelected ? 26 : 20), ny + 4);

        // Print sub details under label
        ctx.fillStyle = isSelected ? "rgba(0, 240, 255, 0.85)" : "rgba(255,255,255,0.35)";
        ctx.font = "8px monospace";
        ctx.fillText(`INTEGRITY: ${node.integrity}% [${node.status.toUpperCase()}]`, nx + (isSelected ? 26 : 20), ny + 14);
      });

      particleOffset += 0.55;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [connections, nodes, selectedNodeId]);

  // Click on canvas to map custom node detection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    const scaleX = (val: number) => (val / 500) * (width - 100) + 50;
    const scaleY = (val: number) => (val / 300) * (height - 80) + 40;

    // Search closest node
    let closestNode: ConnectionNode | null = null;
    let minDist = 30; // maximum detection radius

    nodes.forEach((node) => {
      const nx = scaleX(node.x);
      const ny = scaleY(node.y);
      const dist = Math.hypot(x - nx, y - ny);
      if (dist < minDist) {
        minDist = dist;
        closestNode = node;
      }
    });

    if (closestNode) {
      playUiFeedback("click");
      setSelectedNodeId((closestNode as ConnectionNode).id);
    }
  };

  const executePingDiagnostic = (nodeId: string) => {
    playUiFeedback("beep");
    setPingCount(prev => ({
      ...prev,
      [nodeId]: (prev[nodeId] || 0) + 1
    }));
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          status: "scanning",
          integrity: Math.min(100, Math.max(90, n.integrity + (Math.random() > 0.5 ? 1 : -1)))
        };
      }
      return n;
    }));
    setTimeout(() => {
      setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
          return { ...n, status: "nominal" };
        }
        return n;
      }));
    }, 1500);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div id="neural-network-subsystem" className="space-y-6">
      
      {/* Alert diagnostic status wrapper */}
      <div className="flex justify-between items-center bg-cyber-card border border-cyber-cyan/15 px-5 py-4 rounded-lg">
        <div>
          <h2 className="text-md font-bold font-mono text-white tracking-widest uppercase flex items-center gap-2">
            <Network className="w-5 h-5 text-cyber-cyan animate-spin" />
            VIRTUALIZED LOGICAL SUBSYSTEMS ARCHITECTURE
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Dynamic diagram monitoring continuous packet flows. Click nodes directly in the matrix graph to audit endpoints.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas Graph, Left side Panel Node details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph display canvas */}
        <div className="lg:col-span-2 bg-[#050508] border border-cyber-cyan/15 rounded-lg p-5 relative overflow-hidden flex flex-col justify-end">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block font-bold">
              SYSTEM ROUTING LINKAGES GRAPH
            </span>
            <span className="text-[10px] font-mono bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan px-2.5 py-0.5 rounded">
              LINK-FLOW DETECTED: AUTO
            </span>
          </div>

          <div className="bg-black/90 rounded border border-cyber-cyan/10 relative h-[340px]">
            <canvas 
              ref={canvasRef} 
              onClick={handleCanvasClick} 
              className="w-full h-full block cursor-pointer transition-opacity text-cyber-cyan" 
            />
            
            <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-400 bg-black/85 border border-cyan-500/25 p-1.5 flex gap-1 items-center">
              <Radio className="w-3 h-3 text-cyber-green animate-ping" />
              NEURAL_GRID_SYS: ACTIVE
            </div>
            
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded">
              *HINT: Click node dots to select
            </div>
          </div>
        </div>

        {/* Selected Endpoint details panel & actions */}
        <div className="bg-[#0b0e1a] border border-cyber-cyan/15 p-5 rounded-lg flex flex-col justify-between relative hud-corner-brackets">
          {selectedNode ? (
            <div className="space-y-5">
              <div className="border-b border-cyber-cyan/15 pb-2.5">
                <span className="text-[10px] bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/35 rounded px-2.5 py-0.5 block uppercase w-fit font-mono font-semibold">
                  {selectedNode.type} MODULE
                </span>
                <h3 className="font-mono font-bold text-white text-md tracking-wider uppercase mt-1.5">
                  {selectedNode.label}
                </h3>
              </div>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-center bg-black/55 p-2 rounded border border-cyber-cyan/5">
                  <span className="text-gray-400">Node Coordinate</span>
                  <span className="text-cyber-cyan font-bold">{selectedNode.x} index // {selectedNode.y} index</span>
                </div>
                <div className="flex justify-between items-center bg-black/55 p-2 rounded border border-cyber-cyan/5">
                  <span className="text-gray-400">Security Integrity</span>
                  <span className={`font-bold ${selectedNode.integrity > 95 ? "text-cyber-green" : "text-cyber-yellow"}`}>
                    {selectedNode.integrity}% Nominal
                  </span>
                </div>
                <div className="flex justify-between items-center bg-black/55 p-2 rounded border border-cyber-cyan/5">
                  <span className="text-gray-400">Module Routing State</span>
                  <span className="text-white uppercase font-bold">{selectedNode.status}</span>
                </div>
                <div className="flex justify-between items-center bg-black/55 p-2 rounded border border-cyber-cyan/5">
                  <span className="text-gray-400">Bypass Pings Executed</span>
                  <span className="text-cyber-cyan font-bold">{pingCount[selectedNode.id] || 0} times</span>
                </div>
              </div>

              <div className="bg-black/40 p-3 rounded border border-cyan-500/5 text-xs font-mono text-gray-400 leading-relaxed">
                <strong className="text-cyber-cyan font-bold block mb-1 uppercase text-[10px]">Logical Safe Actions:</strong>
                Each ping tests localized boundary buffers using random telemetry seeds. In case of network congestion, executing pings forces automated sanitization triggers.
              </div>

              <button 
                id={`audit-ping-${selectedNode.id}`}
                onClick={() => executePingDiagnostic(selectedNode.id)}
                className="w-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/30 cursor-pointer font-bold tracking-widest font-mono text-xs py-2 px-3 rounded uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
              >
                <RefreshCw className="w-4 h-4" />
                Trigger Sanitized Diagnostic Ping
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <PlusCircle className="w-12 h-12 text-gray-800" />
              <p className="font-mono text-xs text-gray-400 mt-2">No logical node mapped</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
