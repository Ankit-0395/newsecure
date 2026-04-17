
import React, { useState } from 'react';
import { ScanResult, Severity } from '../types';
import RiskBadge from './RiskBadge';
import AttackPath from './AttackPath';

interface Props {
  history: ScanResult[];
}

const AuditLogs: React.FC<Props> = ({ history }) => {
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  if (history.length === 0) {
    return (
      <div className="py-40 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-2xl">
           <i className="fa-solid fa-box-archive text-3xl text-slate-700"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-400 tracking-tight">No Audit Logs Found</h3>
        <p className="text-slate-600 mt-2 max-w-xs mx-auto text-sm">The secure ledger is currently empty. Run a security scan to begin capturing threat telemetry.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-100 tracking-tight">Audit Repository</h2>
          <p className="text-slate-400 text-sm italic">Immutable ledger of security events and AI-driven scans</p>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800 flex items-center gap-6 shadow-xl">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Total Records</span>
            <p className="text-2xl font-black text-emerald-500 leading-none">{history.length}</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Avg Risk</span>
            <p className="text-2xl font-black text-amber-500 leading-none">
              {Math.round(history.reduce((acc, curr) => acc + curr.overallRiskScore, 0) / history.length)}%
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-1 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
          {history.map((scan) => (
            <div 
              key={scan.id}
              onClick={() => setSelectedScan(scan)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all group relative overflow-hidden ${
                selectedScan?.id === scan.id 
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {selectedScan?.id === scan.id && (
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${
                    scan.overallRiskScore > 70 ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                  }`}>
                    <i className={`fa-solid ${scan.overallRiskScore > 70 ? 'fa-triangle-exclamation' : 'fa-shield-check'} text-sm`}></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight text-slate-200 truncate max-w-[150px]">{scan.fileName}</h4>
                    <p className="text-[10px] text-slate-500 font-mono italic">{new Date(scan.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Risk Score</div>
                  <div className={`text-lg font-black ${scan.overallRiskScore > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {scan.overallRiskScore}%
                  </div>
                </div>
              </div>
              
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed italic mb-4">"{scan.summary}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 rounded text-[8px] font-black text-slate-400 uppercase border border-slate-700">
                    {scan.vulnerabilities.length} ISSUES
                  </span>
                  {scan.attackPath && (
                    <span className="px-2 py-0.5 bg-amber-500/10 rounded text-[8px] font-black text-amber-500 uppercase border border-amber-500/20">
                      VECTOR MAP
                    </span>
                  )}
                </div>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-700 group-hover:text-emerald-500 transition-colors"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="xl:col-span-2 min-h-[600px]">
          {selectedScan ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-24 animate-in fade-in slide-in-from-right-4 duration-500 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded border border-emerald-500/20 uppercase tracking-[0.2em]">Deep Audit Report</span>
                    <span className="text-[10px] text-slate-600 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">UUID: {selectedScan.id}</span>
                  </div>
                  <h3 className="text-4xl font-black text-slate-100 tracking-tight">{selectedScan.fileName}</h3>
                  <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-xs"></i>
                    {new Date(selectedScan.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center min-w-[160px]">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Overall Risk Index</div>
                  <div className={`text-5xl font-black ${selectedScan.overallRiskScore > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {selectedScan.overallRiskScore}<span className="text-xl opacity-30">%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <i className="fa-solid fa-quote-right text-4xl"></i>
                   </div>
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <i className="fa-solid fa-brain text-emerald-500"></i>
                      AI Executive Summary
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed italic relative z-10">"{selectedScan.summary}"</p>
                </div>
                <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                   <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <i className="fa-solid fa-chart-pie text-blue-500"></i>
                      Vulnerability Breakdown
                   </h4>
                   <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Crit', count: selectedScan.vulnerabilities.filter(v => v.severity === Severity.CRITICAL).length, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                        { label: 'High', count: selectedScan.vulnerabilities.filter(v => v.severity === Severity.HIGH).length, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                        { label: 'Med', count: selectedScan.vulnerabilities.filter(v => v.severity === Severity.MEDIUM).length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { label: 'Low', count: selectedScan.vulnerabilities.filter(v => v.severity === Severity.LOW).length, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                      ].map((item, i) => (
                        <div key={i} className={`text-center p-3 rounded-xl ${item.bg} border border-white/5`}>
                          <div className={`text-xl font-black ${item.color}`}>{item.count}</div>
                          <div className="text-[8px] font-black text-slate-500 uppercase mt-1">{item.label}</div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {selectedScan.attackPath && (
                <div className="mb-10">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-route text-amber-500"></i>
                    Threat Propagation Map
                  </h4>
                  <div className="h-[400px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner bg-slate-950/50">
                    <AttackPath data={selectedScan.attackPath} />
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-slate-400"></i>
                  Detected Vulnerabilities ({selectedScan.vulnerabilities.length})
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {selectedScan.vulnerabilities.map((v) => (
                    <div key={v.id} className="p-5 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-rose-400">
                              <i className="fa-solid fa-bug text-xs"></i>
                           </div>
                           <h5 className="font-bold text-slate-200">{v.type}</h5>
                        </div>
                        <RiskBadge severity={v.severity} />
                      </div>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">{v.description}</p>
                      <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/10 flex gap-4 items-start">
                        <div className="mt-1">
                           <i className="fa-solid fa-wand-magic-sparkles text-emerald-500 text-xs"></i>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-emerald-500 uppercase mb-1 tracking-widest">AI Remediation Strategy</p>
                           <p className="text-[11px] text-slate-300 italic leading-relaxed">{v.fixSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-[3rem] animate-pulse">
               <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-8 border border-slate-800 shadow-2xl">
                  <i className="fa-solid fa-fingerprint text-4xl text-slate-800"></i>
               </div>
               <h3 className="text-2xl font-black text-slate-600 tracking-tight">Awaiting Selection</h3>
               <p className="text-slate-700 mt-3 max-w-sm mx-auto text-sm">Select an audit record from the repository to decrypt deep telemetry and visualize attack vectors.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
