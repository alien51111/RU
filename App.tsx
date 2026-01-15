import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FloatingPanel from './components/FloatingPanel';
import MapFrame from './components/MapFrame';
import { LOCATIONS } from './constants';
import { LocationId, LocationData } from './types';

const App: React.FC = () => {
  const [activeId, setActiveId] = useState<LocationId>('iraq');
  const [history, setHistory] = useState<LocationId[]>([]);
  const [viewMode, setViewMode] = useState<'national' | 'province' | 'projects'>('national');
  const [zoomedLocation, setZoomedLocation] = useState<LocationData | null>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const handleSelect = (id: LocationId) => {
    if (id === activeId) return;
    setHistory([...history, activeId]);
    setActiveId(id);
    const loc = LOCATIONS[id];
    if (loc.level === 'country') setViewMode('national');
    else setViewMode('province');
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setActiveId(prev);
      setHistory(history.slice(0, -1));
      const loc = LOCATIONS[prev];
      if (loc.level === 'country') setViewMode('national');
      else setViewMode('province');
    }
  };

  const openZoom = (loc: LocationData) => {
    setZoomedLocation(loc);
    setCurrentAdIndex(0);
  };

  const closeZoom = () => setZoomedLocation(null);

  const nextAd = () => {
    if (!zoomedLocation?.ads) return;
    setCurrentAdIndex((prev) => (prev + 1) % zoomedLocation.ads!.length);
  };

  const prevAd = () => {
    if (!zoomedLocation?.ads) return;
    setCurrentAdIndex((prev) => (prev - 1 + zoomedLocation.ads!.length) % zoomedLocation.ads!.length);
  };

  const currentLocation = LOCATIONS[activeId];

  return (
    <div className={`relative h-screen w-full flex flex-col bg-slate-950 text-white overflow-hidden transition-all duration-700 animate-fade-in`}>
      {/* BACKGROUND CONTENT WRAPPER (Blur controlled by zoomedLocation) */}
      <div className={`flex flex-col h-full w-full transition-all duration-700 ${zoomedLocation ? 'blur-2xl grayscale-[0.5] scale-95 opacity-50' : ''}`}>
        <Navbar currentView={viewMode} />
        <main className="flex-1 relative overflow-hidden">
          <MapFrame 
            coords={currentLocation.coords} 
            activeId={activeId} 
            onSelect={handleSelect}
            onPhotoZoom={openZoom}
            viewMode={viewMode}
          />

          <div className="absolute top-8 left-8 z-50 w-full max-w-[340px] h-[calc(100%-64px)] pointer-events-none flex flex-col gap-5">
            <div className="pointer-events-auto">
              <FloatingPanel 
                currentLocationId={activeId} 
                onSelect={handleSelect} 
                onBack={handleBack}
                history={history}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ENHANCED FOCUS MODAL */}
      {zoomedLocation && (
        <div 
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-12 bg-black/40 backdrop-blur-md animate-fade-in"
          onClick={closeZoom}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col animate-zoom-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Asset Display Frame */}
            <div className="glass-hud rounded-[40px] overflow-hidden border-white/20 p-5 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
               <div className="relative w-full aspect-video rounded-[30px] overflow-hidden bg-slate-900 border border-white/10 group/modal">
                 <img 
                   src={zoomedLocation.ads ? zoomedLocation.ads[currentAdIndex].imageUrl : zoomedLocation.thumbnailUrl} 
                   className="w-full h-full object-cover animate-fade-in" 
                   key={currentAdIndex}
                   alt={zoomedLocation.name} 
                 />
                 
                 {/* Carousel Controls */}
                 {zoomedLocation.ads && zoomedLocation.ads.length > 1 && (
                   <>
                     <button 
                       onClick={prevAd}
                       className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all group-hover/modal:opacity-100 opacity-0"
                     >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                     </button>
                     <button 
                       onClick={nextAd}
                       className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all group-hover/modal:opacity-100 opacity-0"
                     >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                     </button>
                     {/* Indicator dots */}
                     <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
                       {zoomedLocation.ads.map((_, i) => (
                         <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentAdIndex ? 'bg-cyan-400 w-4' : 'bg-white/30'}`} />
                       ))}
                     </div>
                   </>
                 )}

                 {/* Information Banner Over Image */}
                 <div className="absolute top-6 left-6">
                    <div className="px-4 py-1.5 bg-black/70 backdrop-blur-2xl rounded-xl border border-white/20">
                       <span className="text-[9px] font-black text-cyan-400 tracking-[0.3em] uppercase">Sensor ID: {zoomedLocation.id}</span>
                    </div>
                 </div>
               </div>
               
               {/* Metadata Display Below Image */}
               <div className="mt-6 px-4 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
                 <div className="flex-1">
                   <h2 className="text-3xl font-display font-black text-white tracking-tight uppercase leading-none">
                     {zoomedLocation.ads ? zoomedLocation.ads[currentAdIndex].title : zoomedLocation.name}
                   </h2>
                   <p className="text-[12px] font-bold text-cyan-400 uppercase tracking-widest mt-2.5 flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                     {zoomedLocation.subtitle}
                   </p>
                   <p className="text-[13px] text-white/50 leading-relaxed mt-4 max-w-xl font-medium">
                     {zoomedLocation.ads ? zoomedLocation.ads[currentAdIndex].description : zoomedLocation.description}
                   </p>
                 </div>
                 
                 <div className="flex flex-col items-end gap-3 min-w-[180px]">
                    <button 
                      onClick={closeZoom}
                      className="w-full py-3.5 px-8 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                      Close Terminal
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER STRIP */}
      <footer className="h-10 border-t border-white/5 px-8 flex items-center justify-between text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em] glass-hud !bg-black/40 relative z-[100] animate-slide-up opacity-0" style={{ animationDelay: '800ms' }}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            <span className="text-white/80 uppercase">Matrix Operational</span>
          </div>
          <span className="hidden sm:inline">Ref: Rafidain-Core-V10.0</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-cyan-400/60">Intelligence Terminal</span>
          <span className="opacity-20 text-white font-mono tracking-normal">STABLE-RELEASE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;