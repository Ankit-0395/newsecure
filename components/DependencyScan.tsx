
import React, { useState } from 'react';
import { analyzeDependencies } from '../services/geminiService';
import { Dependency } from '../types';

const DEFAULT_MANIFEST = `# requirements.txt
Django==3.2.0
requests>=2.25.1
pyyaml==5.3.1
cryptography==3.3
fastapi==0.63.0`;

const DependencyScan: React.FC = () => {
  const [manifest, setManifest] = useState(DEFAULT_MANIFEST);
  const [isScanning, setIsScanning] = useState(false);
  const [dependencies, setDependencies] = useState<Dependency[]>([]);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const results = await analyzeDependencies(manifest);
      setDependencies(results);
    } catch (e) {
      alert("Analysis failed.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Supply Chain Intelligence</h2>
          <p className="text-slate-400">AI analysis of library manifests for hidden risks</p>
        </div>
        <button 
          onClick={handleScan}
          disabled={isScanning}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
        >
          {isScanning ? <><i className="fa-solid fa-spinner animate-spin mr-2"></i> Analyzing Manifest...</> : 'Analyze Supply Chain'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
           <div className="px-4 py-2 border-b border-slate-700 bg-slate-900/50 text-xs font-bold text-slate-500">
             MANIFEST INPUT (requirements.txt / package.json)
           </div>
           <textarea
             value={manifest}
             onChange={(e) => setManifest(e.target.value)}
             className="w-full h-[400px] p-4 bg-slate-950 text-emerald-500/80 mono text-sm focus:outline-none resize-none"
             spellCheck={false}
           />
        </div>

        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl flex flex-col">
          <div className="px-4 py-2 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Analysis Results</span>
            <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">Agent: SupplyChainBot v1.0</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            {dependencies.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-slate-500 font-bold text-[10px] uppercase border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Contextual Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {dependencies.map((dep, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-200">{dep.name}</div>
                        <div className="text-[10px] text-slate-500 mono">{dep.version} → {dep.latestVersion}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                          dep.status === 'secure' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          dep.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 leading-relaxed">
                        {dep.riskReason || 'No significant threats detected in current usage context.'}
                        {dep.cve && <div className="text-rose-400 mt-1 font-mono text-[9px]">{dep.cve}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-32 text-center text-slate-600 italic">
                {isScanning ? 'AI is traversing transitive dependencies...' : 'Enter a manifest to perform a supply chain audit.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependencyScan;
