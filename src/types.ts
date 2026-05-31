export interface SystemLog {
  id: string;
  timestamp: string;
  sourceNode: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  vector: string;
  payload: string;
  status: "BLOCKED" | "CONTAINED" | "MONITORING" | "MITIGATED";
}

export interface UserMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SecurityScore {
  coreShield: number;
  firewallRating: number;
  aiCoreConfidence: number;
  threatIntegrity: number;
}

export interface ConnectionNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "ai-core" | "firewall" | "database" | "endpoint" | "user-node";
  status: "nominal" | "scanning" | "compromised";
  integrity: number;
}

export interface NetworkConnection {
  from: string;
  to: string;
  packetFlowSpeed: number;
  status: "active" | "congested" | "attacked";
}

export interface ThreatEvent {
  id: string;
  title: string;
  country: string;
  ipAddress: string;
  threatType: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  x: number; // For interactive map coordinate placement
  y: number;
  timestamp: string;
  durationLeft: number; // counts down for simulated dynamic attacks
  attackPath?: string[];
  isolated?: boolean;
}

export interface DiagnosticMetrics {
  cpuUsage: number[];
  ramUsage: number[];
  networkIn: number[];
  networkOut: number[];
  scanPulse: number;
}

export type ActiveTab = 
  | "HOME" 
  | "THREAT_CENTER" 
  | "AI_ASSISTANT" 
  | "DASHBOARD" 
  | "NETWORK" 
  | "ANALYTICS" 
  | "REPORTS" 
  | "TERMINAL" 
  | "CONTACT";
