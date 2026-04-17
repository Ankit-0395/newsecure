
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', icon: 'fa-chart-pie', label: 'Overview' },
    { id: 'scan', icon: 'fa-shield-halved', label: 'Tactical Scanner' },
    { id: 'remediation', icon: 'fa-rectangle-list', label: 'Remediation' },
    { id: 'traffic', icon: 'fa-satellite-dish', label: 'Runtime WAF' },
    { id: 'dependencies', icon: 'fa-box-open', label: 'Supply Chain' },
    { id: 'history', icon: 'fa-clock-rotate-left', label: 'Audit Logs' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-emerald-400 font-bold text-xl mb-10 group cursor-default">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-dna text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="leading-none tracking-tighter">SecureOps</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mt-1">SENTINEL V4</span>
          </div>
        </div>
        
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-sm`}></i>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800">
         <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase">Sentinel Active</span>
            </div>
            <p className="text-[9px] text-slate-600 italic">"Global threat database synchronized 42s ago."</p>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
