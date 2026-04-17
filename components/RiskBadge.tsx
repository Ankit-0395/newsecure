
import React from 'react';
import { Severity } from '../types';

const RiskBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const colors = {
    [Severity.LOW]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    [Severity.MEDIUM]: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    [Severity.HIGH]: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    [Severity.CRITICAL]: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold border uppercase tracking-wider ${colors[severity]}`}>
      {severity}
    </span>
  );
};

export default RiskBadge;
