import React from 'react';

interface NavbarProps {
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView }) => {
  return (
    <nav className="h-20 px-8 flex items-center justify-between glass-hud border-b-0 sticky top-0 z-[100] !bg-black/80 relative animate-slide-down opacity-0">
      {/* LEFT: Logo and Branding */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="relative w-10 h-10 bg-cyan-500 rounded-[16px] flex items-center justify-center text-slate-950 font-black text-lg shadow-[0_0_25px_rgba(34,211,238,0.3)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            RU
          </div>
          <div className="flex flex-col">
            <span className="text-base font-display font-black tracking-tight text-white uppercase leading-none">Rafidain Union</span>
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.4em] mt-1">National Ad Network</span>
          </div>
        </div>
      </div>

      {/* CENTER: Navigation Links */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
        {['Home', 'Infrastructure', 'Telemetry'].map((item) => (
          <a 
            key={item}
            href="#" 
            className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all relative py-1.5 ${
              item === 'Home' 
              ? 'text-cyan-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-cyan-500 after:shadow-[0_0_10px_#22d3ee]' 
              : 'text-white/40 hover:text-white'
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* RIGHT: Network Stats and Profile */}
      <div className="flex items-center gap-8">
        <div className="hidden xl:flex flex-col items-end">
          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Network Reach</span>
          <span className="text-[11px] font-mono text-cyan-400/80 mt-0.5">1.2M+ Active Impressions</span>
        </div>
        <div className="flex items-center gap-4 border-l border-white/10 pl-8">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-0.5 group cursor-pointer hover:border-cyan-500/40 transition-all">
             <div className="w-full h-full rounded-[10px] bg-slate-800 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Rafidain" className="w-full h-full object-cover" alt="User Profile" />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;