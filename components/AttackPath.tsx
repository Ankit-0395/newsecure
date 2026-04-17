
import React from 'react';
import { AttackNode, AttackLink } from '../types';

interface Props {
  data: { nodes: AttackNode[]; links: AttackLink[] };
}

const AttackPath: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden h-[600px]">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Vector Visualization</h3>
        <p className="text-xl font-black text-slate-100 italic">Blast Radius Map</p>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="relative h-full w-full flex items-center justify-around">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           {data.links.map((link, i) => (
             <line 
               key={i}
               x1="20%" y1="50%" x2="50%" y2="50%" // Rough layout simulation
               className="stroke-rose-500/30 stroke-[2] animate-pulse"
               strokeDasharray="5,5"
             />
           ))}
        </svg>

        {data.nodes.map((node, i) => (
          <div 
            key={node.id}
            className={`group relative w-32 h-32 rounded-2xl border-2 flex flex-col items-center justify-center text-center p-4 transition-all hover:scale-110 cursor-pointer ${
              node.type === 'entry' ? 'border-blue-500/50 bg-blue-500/5 text-blue-400' :
              node.type === 'target' ? 'border-rose-500/50 bg-rose-500/5 text-rose-400' :
              'border-amber-500/50 bg-amber-500/5 text-amber-400'
            }`}
          >
            <i className={`fa-solid ${
              node.type === 'entry' ? 'fa-door-open' : 
              node.type === 'target' ? 'fa-database' : 
              'fa-skull-crossbones'
            } text-2xl mb-2`}></i>
            <span className="text-[10px] font-black uppercase tracking-tighter">{node.label}</span>
            <div className={`absolute -bottom-2 px-2 py-0.5 rounded text-[8px] font-bold ${
               node.threatLevel > 70 ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              LVL {node.threatLevel}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 p-4 bg-slate-950 border border-slate-800 rounded-xl max-w-xs">
         <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-circle-info text-emerald-500 text-xs"></i>
            <span className="text-[10px] font-black text-slate-400 uppercase">AI Intelligence</span>
         </div>
         <p className="text-[10px] text-slate-500 leading-relaxed">
            Propagated risk analysis suggests the SQLi entry point creates a lateral movement path to the production PII database.
         </p>
      </div>
    </div>
  );
};

export default AttackPath;
