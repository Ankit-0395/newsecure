
import React, { useState } from 'react';
import { APP_CONFIG } from '../config';

const Settings: React.FC = () => {
  const [policies, setPolicies] = useState({
    owasp: true,
    sans25: false,
    pci: false,
    hipaa: false,
    secrets: true,
  });

  const togglePolicy = (key: string) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key as keyof typeof policies] }));
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Security Engine Settings</h2>
        <p className="text-slate-400">Configure the AI scanning logic and compliance requirements for {APP_CONFIG.SYSTEM_NAME}.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700 shadow-xl overflow-hidden">
        {APP_CONFIG.COMPLIANCE_POLICIES.map((item) => (
          <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-700/20 transition-colors">
            <div className="space-y-1">
              <p className="font-bold text-slate-200">{item.label}</p>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
            <button
              onClick={() => togglePolicy(item.id)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                policies[item.id as keyof typeof policies] ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                policies[item.id as keyof typeof policies] ? 'left-7' : 'left-1'
              }`}></div>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 flex gap-4">
        <i className="fa-solid fa-triangle-exclamation text-amber-500 text-xl mt-1"></i>
        <div className="space-y-2">
          <p className="font-bold text-amber-500">Enterprise Feature: Real-time CI/CD</p>
          <p className="text-sm text-slate-400">
            Hooking into GitHub Actions or GitLab CI requires the Pro Tier. 
            Currently simulating CI/CD environment for demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
