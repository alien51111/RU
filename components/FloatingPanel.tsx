import React, { useState, useEffect } from 'react';
import { LocationData, LocationId } from '../types';
import { LOCATIONS } from '../constants';

interface FloatingPanelProps {
  currentLocationId: string;
  onSelect: (id: LocationId) => void;
  onBack: () => void;
  history: string[];
  viewMode: 'national' | 'province' | 'projects';
  setViewMode: (mode: 'national' | 'province' | 'projects') => void;
}

const FloatingPanel: React.FC<FloatingPanelProps> = ({
  currentLocationId,
  onSelect,
  onBack,
  history,
  viewMode,
  setViewMode
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const current = LOCATIONS[currentLocationId];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = (current?.children || [])
    .map(id => LOCATIONS[id])
    .filter((item): item is LocationData => !!item);

  if (!current) return null;

  return (
    <div
      className={`w-full flex flex-col glass-hud rounded-[36px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl relative ${
        isMounted ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
      } ${
        isCollapsed
          ? 'max-h-[64px] border-cyan-500/60 bg-cyan-950/60 backdrop-blur-xl'
          : 'max-h-[850px]'
      }`}
    >
      {/* CONTENT WRAPPER */}
      <div
        className={`flex flex-col transition-all duration-500 overflow-hidden ${
          isCollapsed
            ? 'opacity-0 pointer-events-none -translate-y-10 scale-95 max-h-0'
            : 'opacity-100 scale-100 max-h-[800px]'
        }`}
      >
        {/* STATE TOGGLES - LOCKED */}
        <div className="p-5 border-b border-white/5 bg-white/5 flex gap-1.5 relative">
          {(['national', 'province', 'projects'] as const).map((mode, idx) => (
            <div
              key={mode}
              style={{ animationDelay: `${idx * 100 + 300}ms` }}
              className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-not-allowed select-none animate-fade-in opacity-0 ${
                viewMode === mode
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-inner'
                  : 'text-white/20 bg-white/5'
              }`}
            >
              {mode}
              <svg className="w-2.5 h-2.5 opacity-40" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}
        {history.length > 0 && (
          <div className="px-7 pt-6 pb-1 animate-fade-in opacity-0" style={{ animationDelay: '500ms' }}>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-[9px] font-black text-cyan-400 uppercase tracking-widest hover:-translate-x-1 transition-transform"
            >
              ← Return to {LOCATIONS[history[history.length - 1]]?.name || 'Previous'}
            </button>
          </div>
        )}

        {/* ITEMS */}
        <div className="max-h-[400px] overflow-y-auto p-6 space-y-3 scrollbar-hide">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{ animationDelay: `${idx * 60 + 600}ms` }}
              className="group w-full p-4 flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 rounded-[24px] transition-all shadow-sm animate-slide-up opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-lg overflow-hidden shrink-0 transition-transform group-hover:scale-105">
                {item.thumbnailUrl ? (
                  <img 
                    src={item.thumbnailUrl} 
                    className="w-full h-full object-cover opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
                    alt={item.name} 
                  />
                ) : (
                  item.level === 'province' ? '🏢' : item.level === 'region' ? '📍' : '✨'
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-black text-white group-hover:text-cyan-400 transition-colors">{item.name}</p>
                <p className="text-[9px] text-white/30 font-bold mt-1 uppercase">
                  {item.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TOGGLE AREA */}
      <div
        className={`relative transition-all duration-700 shrink-0 ${
          isCollapsed
            ? 'h-[64px]'
            : 'h-16 border-t border-white/5 bg-white/5 hover:bg-white/10'
        }`}
      >
        {/* COLLAPSED BUTTON */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute inset-0 w-full h-full flex items-center justify-center gap-3 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all group"
          >
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">
              Show Interface Panel
            </span>
            <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
               <svg className="w-3.5 h-3.5 text-cyan-400 group-hover:text-slate-950 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" />
               </svg>
            </div>
          </button>
        ) : (
          /* EXPANDED FOLD ARROW */
          <button
            onClick={() => setIsCollapsed(true)}
            className="w-full h-full flex items-center justify-center text-white/40 hover:text-white transition-colors group"
            aria-label="Fold Panel"
          >
            <div className="flex flex-col items-center gap-1 transition-transform group-hover:-translate-y-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span className="text-[7px] font-black uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
                Fold
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default FloatingPanel;