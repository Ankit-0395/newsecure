
import React, { useState } from 'react';
import { analyzeCodeSecurity, verifyPatch } from '../services/geminiService';
import { ScanResult, Severity } from '../types';
import RiskBadge from './RiskBadge';
import AttackPath from './AttackPath';

const DEFAULT_CODE = `import sqlite3
import os

def delete_profile(user_id):
    db = sqlite3.connect("users.db")
    # MISSING AUTH: Anyone can call this
    # INJECTION: Direct string formatting
    db.execute(f"DELETE FROM profiles WHERE id = {user_id}")
    db.commit()

AWS_SECRET = "MIIEpAIBAAKCAQEA75X..." # Simulated credential leak`;

const Scanner: React.FC<{ onResult: (res: ScanResult) => void }> = ({ onResult }) => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showFix, setShowFix] = useState<number | null>(null);
  const [verifying, setVerifying] = useState<number | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);
    try {
      const scan = await analyzeCodeSecurity(code, "profile_manager.py");
      setResult(scan);
      onResult(scan);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setIsScanning(false);
    }
  };

  const handleVerify = async (idx: number) => {
    if (!result) return;
    setVerifying(idx);
    try {
      const v = result.vulnerabilities[idx];
      const check = await verifyPatch(code, v.remediationCode || '');
      alert(check.verified ? "✅ Verification Successful: Patch mitigates threat." : "❌ Verification Failed: Potential regression.");
    } finally {
      setVerifying(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">Tactical Security Engine</h2>
          <p className="text-slate-400 text-sm">Deep Audit Stage 4: Predictive Logic Active</p>
        </div>
        <button
          onClick={handleScan}
          disabled={isScanning || !code.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-3 rounded-xl font-black transition-all flex items-center gap-3 shadow-2xl shadow-emerald-500/20"
        >
          {isScanning ? <i className="fa-solid fa-sync fa-spin"></i> : <i className="fa-solid fa-radar"></i>}
          {isScanning ? "ORCHESTRATING..." : "RUN GLOBAL AUDIT"}
        </button>
      </div>

      {result?.attackPath && (
        <div className="animate-in fade-in zoom-in duration-1000">
           <AttackPath data={result.attackPath} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-slate-800/40 p-4 border-b border-slate-800 flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Repository</span>
             <span className="text-[10px] text-emerald-400 font-mono">FILE: profile_manager.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-8 bg-slate-950/50 text-emerald-500/80 mono text-sm focus:outline-none resize-none"
            spellCheck={false}
          />
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
           {isScanning && <div className="text-center py-20 text-slate-600 italic">Thinking...</div>}
           {result?.vulnerabilities.map((v, i) => (
             <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-rose-500 border border-slate-700">
                         <i className="fa-solid fa-shield-virus"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200">{v.type}</h4>
                        <RiskBadge severity={v.severity} />
                      </div>
                   </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{v.description}</p>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowFix(showFix === i ? null : i)}
                    className="flex-1 py-2 bg-slate-800 rounded-lg text-[10px] font-black uppercase text-slate-300 border border-slate-700"
                  >
                    View Patch
                  </button>
                  <button 
                    onClick={() => handleVerify(i)}
                    className="flex-1 py-2 bg-emerald-500/10 rounded-lg text-[10px] font-black uppercase text-emerald-500 border border-emerald-500/20"
                  >
                    {verifying === i ? "Verifying..." : "Verify AI Fix"}
                  </button>
                </div>

                {showFix === i && (
                  <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-emerald-500/20 animate-in slide-in-from-top-2">
                     <p className="text-[9px] font-black text-emerald-500 uppercase mb-3">Proposed Patch</p>
                     <pre className="text-[11px] text-slate-300 mono whitespace-pre-wrap">{v.remediationCode}</pre>
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
