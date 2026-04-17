
import React from 'react';

interface Props {
  onEnter: () => void;
}

const LandingPage: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-['Inter'] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <nav className="relative z-10 h-24 border-b border-slate-800/50 flex items-center justify-between px-12 backdrop-blur-md bg-slate-950/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <i className="fa-solid fa-microchip text-emerald-400 text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-slate-100">SecureOps<span className="text-emerald-400">AI</span></span>
            <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Autonomous Defense</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">Documentation</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors">API Reference</a>
          <button 
            onClick={onEnter}
            className="px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
          >
            Access Terminal
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Stage 1: Deployment Active
            </div>
            <h1 className="text-7xl font-black text-slate-100 leading-[0.9] tracking-tighter">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Autonomous</span> <br />
              DevSecOps.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              SecureOpsAI is an agentic framework that automates the entire security lifecycle. From code scanning to real-time threat mitigation, powered by Gemini 3.1 Pro.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <button 
                onClick={onEnter}
                className="px-10 py-5 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-emerald-500/40"
              >
                Launch Dashboard
              </button>
              <button className="px-10 py-5 bg-slate-900 text-slate-200 rounded-2xl font-black text-sm uppercase tracking-[0.2em] border border-slate-800 hover:bg-slate-800 transition-all">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-10 pt-12 border-t border-slate-800/50">
              <div>
                <p className="text-2xl font-black text-slate-100">99.9%</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">AI Accuracy</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-800"></div>
              <div>
                <p className="text-2xl font-black text-slate-100">12ms</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Response Time</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-800"></div>
              <div>
                <p className="text-2xl font-black text-slate-100">24/7</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Autonomous Ops</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-[3rem] p-8 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                  </div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Security Feed</div>
               </div>
               <div className="space-y-4 font-mono">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-500">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-tighter">Scan Complete</span>
                        <span className="text-slate-600 text-[10px]">12:44:01</span>
                     </div>
                     <p className="text-xs text-slate-400">profile_manager.py: <span className="text-rose-500">SQL Injection Detected</span></p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 animate-in slide-in-from-bottom-4 duration-700 delay-150">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-tighter">WAF Event</span>
                        <span className="text-slate-600 text-[10px]">12:44:05</span>
                     </div>
                     <p className="text-xs text-slate-400">Blocked IP: 192.168.1.12 (Brute Force)</p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-tighter">AI Remediation</span>
                        <span className="text-slate-600 text-[10px]">12:44:10</span>
                     </div>
                     <p className="text-xs text-slate-300 italic">"Patching vulnerability... Logic verified. Threat neutralized."</p>
                  </div>
               </div>
               <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center">
                  <div className="w-full h-24 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite linear' }}></div>
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] relative z-10 animate-pulse">System Nominal</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
