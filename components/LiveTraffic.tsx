
import React, { useState, useEffect, useRef } from 'react';
import { TrafficLog } from '../types';
import { APP_CONFIG } from '../config';

const LiveTraffic: React.FC = () => {
  const [logs, setLogs] = useState<TrafficLog[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const endpoints = ['/api/v1/user', '/api/auth/login', '/v2/payments', '/admin/dashboard', '/static/js/main.js'];
  const methods: ('GET' | 'POST')[] = ['GET', 'POST'];
  const threatTypes = ['SQL Injection Attempt', 'XSS Payload Detected', 'Brute Force Signature', 'Geo-Fenced IP Block'];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const isThreat = Math.random() > 0.85;
      const newLog: TrafficLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.1.12`,
        endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
        method: methods[Math.floor(Math.random() * methods.length)],
        status: isThreat ? 'blocked' : 'allowed',
        threatType: isThreat ? threatTypes[Math.floor(Math.random() * threatTypes.length)] : undefined,
        score: isThreat ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 20),
      };

      setLogs(prev => [newLog, ...prev].slice(0, 100));
    }, APP_CONFIG.REFRESH_INTERVALS.TRAFFIC_MS);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <i className="fa-solid fa-satellite-dish text-emerald-400"></i>
            Runtime Traffic Monitor
          </h2>
          <p className="text-slate-400">AI-Powered Web Application Firewall (WAF) Simulation</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setLogs([])}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700 transition-colors"
          >
            Clear Buffer
          </button>
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
              isPaused ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {isPaused ? 'Resume Stream' : 'Pause Stream'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Live Ingress Logs</span>
            <div className="flex items-center gap-4 text-[10px] font-bold">
               <span className="text-emerald-400"><i className="fa-solid fa-circle text-[6px] mr-1"></i> 2.4k req/min</span>
               <span className="text-rose-400"><i className="fa-solid fa-circle text-[6px] mr-1"></i> 12 blocks/min</span>
            </div>
          </div>
          
          <div className="h-[600px] overflow-y-auto p-4 space-y-2 font-mono text-sm">
            {logs.map((log) => (
              <div key={log.id} className={`flex items-center gap-4 p-3 rounded border transition-all ${
                log.status === 'blocked' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-slate-800/20 border-slate-800'
              }`}>
                <span className="text-slate-500 text-xs w-20">{log.timestamp}</span>
                <span className={`w-12 font-bold ${log.method === 'POST' ? 'text-amber-400' : 'text-blue-400'}`}>{log.method}</span>
                <span className="text-slate-300 flex-1 truncate">{log.endpoint}</span>
                <span className="text-slate-500 text-xs hidden md:block">{log.ip}</span>
                <div className="w-32 flex justify-end">
                  {log.status === 'blocked' ? (
                    <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] font-black rounded uppercase border border-rose-500/30">
                      Blocked: {log.threatType}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded uppercase border border-emerald-500/20">
                      Clean
                    </span>
                  )}
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
                <i className="fa-solid fa-terminal text-6xl mb-4"></i>
                <p>Establishing secure socket connection...</p>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
             <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-wider">Threat Intelligence</h3>
             <div className="space-y-4">
               {[
                 { label: 'AI Confidence', val: '98.4%', color: 'text-emerald-400' },
                 { label: 'False Positives', val: '0.02%', color: 'text-blue-400' },
                 { label: 'Latent Latency', val: '12ms', color: 'text-amber-400' },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center">
                   <span className="text-xs text-slate-500">{item.label}</span>
                   <span className={`text-sm font-black ${item.color}`}>{item.val}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/10">
            <h4 className="text-emerald-400 text-xs font-bold uppercase mb-3">Agent Directive</h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "Currently enforcing 'Zero-Trust' heuristics. Automatically blacklisting IPs with high-entropy POST payloads detected on auth endpoints."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTraffic;
