
import React from 'react';
import { Vulnerability, TicketStatus } from '../types';
import RiskBadge from './RiskBadge';

interface Props {
  vulnerabilities: Vulnerability[];
  onUpdateStatus: (id: string, status: TicketStatus) => void;
}

const RemediationBoard: React.FC<Props> = ({ vulnerabilities, onUpdateStatus }) => {
  const columns: TicketStatus[] = ['Open', 'In Progress', 'Verification', 'Resolved'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vulnerability Remediation Board</h2>
          <p className="text-slate-400">Track and manage security lifecycle events</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold border border-slate-700">Filter: Critical</button>
           <button className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg text-xs font-bold">Bulk Resolve</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[700px]">
        {columns.map(col => (
          <div key={col} className="bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col p-4">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-widest">{col}</span>
              <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{vulnerabilities.filter(v => v.status === col).length}</span>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {vulnerabilities.filter(v => v.status === col).map(v => (
                <div key={v.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-lg hover:border-emerald-500/30 cursor-pointer transition-all group">
                   <div className="flex justify-between items-start mb-3">
                      <RiskBadge severity={v.severity} />
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                        <i className="fa-solid fa-ellipsis"></i>
                      </button>
                   </div>
                   <h4 className="font-bold text-slate-200 text-sm mb-2">{v.type}</h4>
                   <p className="text-[10px] text-slate-500 line-clamp-2 mb-4">{v.description}</p>
                   
                   <div className="flex gap-2">
                     {col !== 'Resolved' && (
                       <button 
                        onClick={() => onUpdateStatus(v.id, columns[columns.indexOf(col) + 1])}
                        className="flex-1 bg-slate-900 py-1.5 rounded text-[10px] font-bold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/10"
                       >
                         Progress →
                       </button>
                     )}
                   </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemediationBoard;
