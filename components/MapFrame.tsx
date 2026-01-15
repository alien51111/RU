import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapCoords, LocationId, LocationData } from '../types';
import { LOCATIONS } from '../constants';

interface MapFrameProps {
  coords: MapCoords;
  activeId: LocationId;
  onSelect: (id: LocationId) => void;
  onPhotoZoom: (location: LocationData) => void;
  viewMode: 'national' | 'province' | 'projects';
}

const MapFrame: React.FC<MapFrameProps> = ({ coords, activeId, onSelect, onPhotoZoom, viewMode }) => {
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const currentLoc = LOCATIONS[activeId];
  
  const prevActiveIdRef = useRef<LocationId>(activeId);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Initial entry trigger
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nearestEmbedUrl = useMemo(() => {
    if (currentLoc.embedUrl) return currentLoc.embedUrl;
    const findParentEmbed = (id: string): string | undefined => {
      const parent = Object.values(LOCATIONS).find(l => l.children?.includes(id));
      if (!parent) return undefined;
      if (parent.embedUrl) return parent.embedUrl;
      return findParentEmbed(parent.id);
    };
    return findParentEmbed(activeId);
  }, [activeId, currentLoc]);

  const visiblePins = useMemo(() => {
    if (isZooming) return [];
    
    let pins: LocationData[] = [];
    if (currentLoc.level === 'country') {
      pins = (currentLoc.children || []).map(id => LOCATIONS[id]).filter(Boolean);
    } else if (currentLoc.level === 'province' || currentLoc.level === 'region') {
      const targetId = currentLoc.level === 'province' ? activeId : 
        Object.values(LOCATIONS).find(l => l.children?.includes(activeId))?.id;
      if (targetId) {
        pins = (LOCATIONS[targetId].children || []).map(id => LOCATIONS[id]).filter(Boolean);
      }
    }
    return pins;
  }, [activeId, currentLoc, isZooming]);

  useEffect(() => {
    const prevId = prevActiveIdRef.current;
    const prevLoc = LOCATIONS[prevId];
    if (!prevLoc) {
      prevActiveIdRef.current = activeId;
      return;
    }

    if (prevLoc.level === 'country' && currentLoc.level !== 'country') {
      setIsZooming(true);
      setIsIframeReady(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      
      timeoutRef.current = window.setTimeout(() => {
        setIsZooming(false);
        setIsIframeReady(true);
        timeoutRef.current = null;
      }, 1500); 
    } 
    else if (currentLoc.level === 'country') {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setIsZooming(false);
      setIsIframeReady(false);
    } 
    else {
      if (!isZooming) setIsIframeReady(true);
    }
    prevActiveIdRef.current = activeId;
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [activeId, currentLoc.level]);

  const terrainStyle = {
    transform: `scale(${coords.zoom}) translate(${(50 - coords.x) / coords.zoom}%, ${(50 - coords.y) / coords.zoom}%)`,
    transition: 'transform 1.4s cubic-bezier(0.2, 0, 0, 1)',
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={terrainStyle}>
        <div className="relative w-[160%] h-[160%] flex items-center justify-center">
          <img 
            src="https://cdn.renderhub.com/3dstudio/iraq-terrain-map/iraq-terrain-map-01.jpg" 
            alt="Terrain Matrix"
            className={`w-full h-full object-contain transition-opacity duration-[1s] animate-zoom-in ${isIframeReady ? 'opacity-0' : 'opacity-80 saturate-[0.8] brightness-[0.7] contrast-[1.2]'}`}
          />
        </div>
      </div>

      {currentLoc.level !== 'country' && nearestEmbedUrl && (
        <div className={`absolute inset-0 z-30 transition-opacity duration-1000 ${isIframeReady ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full relative">
            <iframe
              src={nearestEmbedUrl}
              className="w-full h-full border-none grayscale brightness-[0.7] contrast-[1.2]"
              allowFullScreen
              loading="eager"
              title="Satellite Uplink"
            ></iframe>
            <div className="absolute inset-0 z-10 pointer-events-auto bg-transparent"></div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center" 
           style={!isIframeReady ? terrainStyle : {}}>
        <div className="relative w-full h-full">
           {visiblePins.map((loc, idx) => {
              const isSelected = activeId === loc.id;
              const showAsImage = loc.level === 'region' && !!loc.thumbnailUrl;
              
              return (
                <div key={loc.id} className="absolute transition-all duration-700 pointer-events-auto animate-fade-in opacity-0"
                  style={{ top: `${loc.coords.y}%`, left: `${loc.coords.x}%`, animationDelay: `${idx * 100 + 1000}ms` }}>
                  <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                    
                    {showAsImage ? (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (loc.level === 'region') onPhotoZoom(loc);
                          onSelect(loc.id);
                        }}
                        className={`relative w-24 h-24 rounded-[28px] border-[3px] transition-all duration-500 cursor-pointer shadow-[0_0_50px_rgba(34,211,238,0.25)] ${
                          isSelected 
                            ? 'border-white scale-110 z-50 ring-4 ring-white/10' 
                            : 'border-cyan-500/50 scale-100 group-hover:scale-110 group-hover:border-white group-hover:z-50'
                        } overflow-hidden bg-slate-900`}
                      >
                        <img src={loc.thumbnailUrl} className="w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-500" alt={loc.name} />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-center">
                            <span className="text-[7px] font-black text-cyan-400 tracking-widest uppercase">{loc.name}</span>
                        </div>
                        {isSelected && <div className="absolute inset-0 border-[3px] border-white rounded-[25px] animate-ping opacity-30"></div>}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(loc.id);
                        }}
                        className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-125 pointer-events-auto"
                      >
                         <svg width="44" height="44" viewBox="0 0 24 24" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                           <path 
                             d="M12 2L22 12L12 22L2 12L12 2Z" 
                             fill={isSelected ? "#fff" : "rgba(19, 115, 124, 0.4)"} 
                             stroke="cyan" 
                             strokeWidth="2.5" 
                           />
                           <circle cx="12" cy="12" r="3" fill={isSelected ? "cyan" : "white"} className={isSelected ? "animate-pulse" : ""} />
                         </svg>
                      </button>
                    )}

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                      <div className="glass-hud px-6 py-3 rounded-2xl border border-white/20 shadow-2xl flex flex-col items-center min-w-[200px]">
                        <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{loc.name}</span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${loc.level === 'province' ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>
                          <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                            {loc.level === 'province' ? 'Regional Hub' : 'Active Terminal'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MapFrame;