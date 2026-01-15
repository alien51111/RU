
import React from 'react';
import { LocationData, LocationId } from '../types';
import { LOCATIONS } from '../constants';

interface SidebarProps {
  activeId: string;
  onSelect: (id: LocationId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  const choices: { id: LocationId; label: string; icon: string; tag: string }[] = [
    { id: 'iraq', label: 'Federal Network', icon: '🇮🇶', tag: 'Main' },
    { id: 'baghdad', label: 'Metropolis', icon: '🏙️', tag: 'Capital' },
    { id: 'basra_airport_reg', label: 'Southern Gate', icon: '✈️', tag: 'Transit' },
    { id: 'najaf_airport_reg', label: 'Sacred Link', icon: '🛫', tag: 'Transit' },
  ];

  return (
    <div className="w-full lg:w-[420px] flex flex-col h-full bg-white/40 p-8 space-y-6 overflow-y-auto">
      <div className="space-y-1">
        <h2 className="text-[10px] font-black text-[#13737c] uppercase tracking-[0.4em] opacity-80">Terminal Interface</h2>
        <h3 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">Active Nodes</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onSelect(choice.id)}
            className={`group relative flex flex-col p-5 rounded-3xl transition-all duration-500 border overflow-hidden ${
              activeId === choice.id
                ? 'bg-[#13737c] border-[#13737c] text-white shadow-2xl shadow-[#13737c]/30 scale-[1.02]'
                : 'bg-white/80 border-white hover:border-[#13737c]/30 hover:bg-white text-slate-700'
            }`}
          >
            {/* Background Accent */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl transition-opacity duration-700 ${
              activeId === choice.id ? 'bg-white/20 opacity-100' : 'bg-[#13737c]/10 opacity-0 group-hover:opacity-100'
            }`} />

            <div className="relative z-10 flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 ${
                activeId === choice.id ? 'bg-white/20' : 'bg-slate-50'
              }`}>
                {choice.icon}
              </div>
              <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                activeId === choice.id ? 'bg-white/20 text-white' : 'bg-[#13737c]/10 text-[#13737c]'
              }`}>
                {choice.tag}
              </span>
            </div>

            <div className="relative z-10 text-left">
              <h4 className="font-extrabold text-lg font-display tracking-tight leading-tight">{choice.label}</h4>
              <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-60`}>
                {LOCATIONS[choice.id]?.subtitle || 'Unknown Node'}
              </p>
            </div>

            {/* Selection indicator */}
            <div className={`absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeId === choice.id ? 'bg-white scale-150' : 'bg-[#13737c] opacity-0 translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'
            }`} />
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="p-6 rounded-[32px] bg-[#13737c] text-white shadow-xl shadow-[#13737c]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 opacity-70">Node Description</p>
          <p className="text-xs leading-relaxed font-bold opacity-90 line-clamp-4">
            {LOCATIONS[activeId]?.description || 'Initializing sensor data...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
