
import React from 'react';
import { ScanResult, Severity } from '../types';
import RiskBadge from './RiskBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { APP_CONFIG } from '../config';

interface Props {
  history: ScanResult[];
}

const DashboardOverview: React.FC<Props> = ({ history }) => {
  const totalVulns = history.reduce((acc, curr) => acc + curr.vulnerabilities.length, 0);
  
  const severityData = [
    { name: 'Critical', value: history.reduce((acc, curr) => acc + curr.vulnerabilities.filter(v => v.severity === Severity.CRITICAL).length, 0), color: '#ef4444' },
    { name: 'High', value: history.reduce((acc, curr) => acc + curr.vulnerabilities.filter(v => v.severity === Severity.HIGH).length, 0), color: '#f97316' },
    { name: 'Medium', value: history.reduce((acc, curr) => acc + curr.vulnerabilities.filter(v => v.severity === Severity.MEDIUM).length, 0), color: '#eab308' },
    { name: 'Low', value: history.reduce((acc, curr) => acc + curr.vulnerabilities.filter(v => v.severity === Severity.LOW).length, 0), color: '#3b82f6' },
  ];

  const trendData = history.slice().reverse().map((s, i) => ({
    name: `Scan ${i + 1}`,
    score: s.overallRiskScore,
  }));

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">Security Command Center</h1>
          <p className="text-slate-400">Holistic view of application integrity and threat telemetry</p>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1 bg-slate-800 text-slate-500 border border-slate-700 rounded text-[10px] font-mono">
             v{APP_CONFIG.VERSION}
           </div>
           <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold hover:bg-emerald-500/20 transition-all">
             <i className="fa-solid fa-file-export mr-2"></i> Export Report
           </button>
           <button className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">
             <i className="fa-solid fa-share-nodes mr-2"></i> Infrastructure Graph
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Infrastructure Health', value: '94%', icon: 'fa-heart-pulse', color: 'text-emerald-400', desc: '+2.4% from last audit' },
          { label: 'Critical Exposures', value: history.reduce((acc, curr) => acc + curr.vulnerabilities.filter(v => v.severity === Severity.CRITICAL).length, 0), icon: 'fa-fire-flame-curved', color: 'text-rose-500', desc: 'Requires immediate patching' },
          { label: 'AI Block Rate', value: '99.9%', icon: 'fa-shield-halved', color: 'text-blue-400', desc: 'Edge protection active' },
          { label: 'Supply Chain Risk', value: 'Medium', icon: 'fa-link-slash', color: 'text-amber-400', desc: '3 vulnerable packages' },
        ].map((stat, i) => (
          <div key={i} className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-emerald-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${stat.icon} text-xl`}></i>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black mt-1">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Risk Trend Analysis</h3>
                <div className="flex gap-4 text-[10px] font-bold">
                   <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Score Over Time</span>
                </div>
             </div>
             <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={trendData}>
                   <defs>
                     <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                   <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '12px' }}
                   />
                   <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Severity Distribution</h3>
               <div className="h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={severityData}>
                      <XAxis dataKey="name" hide />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                      <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                        {severityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>
             <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-center items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * 0.94)} className="text-emerald-500 transition-all duration-1000" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-100">94%</div>
                </div>
                <h4 className="text-sm font-bold text-slate-200">System Resilience</h4>
                <p className="text-[10px] text-slate-500 mt-1">Simulated chaos testing stability</p>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Active Perimeter Alerts</h3>
           <div className="space-y-6">
              {[
                { type: 'Blocked Request', detail: 'SQL Injection from 192.168.1.4', time: '2m ago', color: 'bg-rose-500' },
                { type: 'Policy Update', detail: 'OWASP v2024 Profile Applied', time: '14m ago', color: 'bg-blue-500' },
                { type: 'Scan Completed', detail: 'profile_manager.py (Risk: 12%)', time: '1h ago', color: 'bg-emerald-500' },
                { type: 'Auth Anomaly', detail: 'High volume from TOR Exit Node', time: '2h ago', color: 'bg-amber-500' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 group cursor-default">
                   <div className={`w-1 rounded-full ${alert.color} group-hover:w-2 transition-all`}></div>
                   <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-0.5 tracking-tighter">{alert.type}</p>
                      <p className="text-sm text-slate-200 font-medium truncate">{alert.detail}</p>
                      <p className="text-[10px] text-slate-600 font-mono italic mt-1">{alert.time}</p>
                   </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="py-20 text-center text-slate-700">
                  <i className="fa-solid fa-bell-slash text-4xl mb-4 opacity-10"></i>
                  <p className="text-xs uppercase font-black">No active alerts</p>
                </div>
              )}
           </div>
           
           <div className="mt-10 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">AI Status</span>
              </div>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">
                 "Orchestrator monitoring 1,200 egress/ingress points. No unauthorized data exfiltration detected in the last session."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
