
export const APP_CONFIG = {
  VERSION: '3.1.2-ALPHA',
  SYSTEM_NAME: 'SENTINEL-NODE',
  SCAN_THRESHOLDS: {
    CRITICAL: 80,
    HIGH: 60,
    MEDIUM: 40,
  },
  REFRESH_INTERVALS: {
    TRAFFIC_MS: 3000,
    SYSTEM_HEALTH_MS: 10000,
  },
  DEFAULTS: {
    THEME: 'dark',
    MAX_HISTORY_ITEMS: 50,
    AUTO_FIX: false,
  },
  COMPLIANCE_POLICIES: [
    { id: 'owasp', label: 'OWASP Top 10 (2024)', desc: 'Standard awareness document for developers and web application security.' },
    { id: 'sans25', label: 'SANS Top 25', desc: 'Widespread and critical errors that can lead to serious vulnerabilities.' },
    { id: 'pci', label: 'PCI-DSS Compliance', desc: 'Security standards for organizations that handle branded credit cards.' },
    { id: 'secrets', label: 'Secret Detection', desc: 'Automatically identify hardcoded API keys, tokens, and credentials.' },
  ]
};

export type PolicyId = 'owasp' | 'sans25' | 'pci' | 'secrets';
