
export enum Severity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export type TicketStatus = 'Open' | 'In Progress' | 'Verification' | 'Resolved';

export interface Vulnerability {
  id: string;
  type: string;
  severity: Severity;
  description: string;
  fixSuggestion: string;
  remediationCode?: string;
  status: TicketStatus;
}

export interface AttackNode {
  id: string;
  label: string;
  type: 'entry' | 'vulnerability' | 'target';
  threatLevel: number;
}

export interface AttackLink {
  source: string;
  target: string;
  description: string;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  vulnerabilities: Vulnerability[];
  overallRiskScore: number;
  summary: string;
  fileName: string;
  attackPath?: {
    nodes: AttackNode[];
    links: AttackLink[];
  };
}

export interface Dependency {
  name: string;
  version: string;
  status: 'secure' | 'vulnerable' | 'warning';
  latestVersion: string;
  riskReason?: string;
  cve?: string;
}

export interface TrafficLog {
  id: string;
  timestamp: string;
  ip: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'allowed' | 'blocked' | 'flagged';
  threatType?: string;
  score: number;
}
