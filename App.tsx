
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Scanner from './components/Scanner';
import DashboardOverview from './components/DashboardOverview';
import DependencyScan from './components/DependencyScan';
import LiveTraffic from './components/LiveTraffic';
import RemediationBoard from './components/RemediationBoard';
import ChatPanel from './components/ChatPanel';
import AuditLogs from './components/AuditLogs';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import { ScanResult, Vulnerability, TicketStatus } from './types';
import { APP_CONFIG } from './config';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [allVulns, setAllVulns] = useState<Vulnerability[]>([]);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('secureops_history');
    if (saved) {
      try {
        const history = JSON.parse(saved);
        setScanHistory(history);
        const vulns = history.flatMap((s: ScanResult) => s.vulnerabilities);
        setAllVulns(vulns);
      } catch (e) { console.error("History fail"); }
    }
  }, []);

  const handleNewScanResult = (result: ScanResult) => {
    const updatedHistory = [result, ...scanHistory].slice(0, APP_CONFIG.DEFAULTS.MAX_HISTORY_ITEMS);
    setScanHistory(updatedHistory);
    setAllVulns(prev => [...result.vulnerabilities, ...prev]);
    localStorage.setItem('secureops_history', JSON.stringify(updatedHistory));
  };

  const updateVulnStatus = (id: string, status: TicketStatus) => {
    setAllVulns(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview history={scanHistory} />;
      case 'scan': return <Scanner onResult={handleNewScanResult} />;
      case 'traffic': return <LiveTraffic />;
      case 'dependencies': return <DependencyScan />;
      case 'remediation': return <RemediationBoard vulnerabilities={allVulns} onUpdateStatus={updateVulnStatus} />;
      case 'history': return <AuditLogs history={scanHistory} />;
      case 'settings': return <Settings />;
      default: return null;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onEnter={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 overflow-hidden font-['Inter']">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto relative h-screen">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-900/60 sticky top-0 z-40 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
             <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded text-[10px] font-black tracking-widest border border-emerald-500/20">{APP_CONFIG.SYSTEM_NAME}</div>
             <div className="h-4 w-[1px] bg-slate-800"></div>
             <h1 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{activeTab}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase">
               <span>Threat Lvl: <span className="text-amber-500">Elevated</span></span>
               <span>Uptime: <span className="text-emerald-500">99.99%</span></span>
            </div>
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`p-3 rounded-2xl transition-all ${showChat ? 'bg-emerald-500 text-slate-950 shadow-xl' : 'bg-slate-800 text-slate-400'}`}
            >
              <i className="fa-solid fa-headset"></i>
            </button>
          </div>
        </header>

        <div className="p-10 max-w-[1920px] mx-auto min-h-[calc(100vh-80px)]">
           <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
             {renderContent()}
           </div>
        </div>
      </main>

      {showChat && <ChatPanel />}
    </div>
  );
};

export default App;
