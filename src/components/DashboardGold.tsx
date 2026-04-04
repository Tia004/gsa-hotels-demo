
import React from 'react';
import { UserButton } from "@clerk/nextjs";

export default function DashboardGold({ userName = "Ospite" }) {
  return (
    <div className="dashboard-container dark bg-background min-h-screen">
        <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid {
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .glass-panel { background: rgba(25, 31, 47, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .glass-premium {
            background: rgba(25, 31, 47, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .blurred-content {
            filter: blur(8px);
            pointer-events: none;
            user-select: none;
        }
        .metal-shine {
            background: linear-gradient(135deg, #f2ca50 0%, #d4af37 50%, #f2ca50 100%);
        }
        `}} />
        <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-[#0B1120] backdrop-blur-2xl flex flex-col py-8 px-4 space-y-8 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)]">
<div className="flex items-center space-x-3 mb-10 px-2">
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-black" >hotel</span>
</div>
<div>
<h1 className="text-[#D4AF37] font-['Noto_Serif'] font-black uppercase tracking-widest leading-none text-sm">GSA Hotels</h1>
<p className="text-[10px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">B2B Portal</p>
</div>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-[#00F0FF] border-r-2 border-[#00F0FF]" href="#">
<span className="material-symbols-outlined" >dashboard</span>
<span className="text-sm font-medium">Dashboard</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:text-[#D4AF37]" href="#">
<span className="material-symbols-outlined">handshake</span>
<span className="text-sm font-medium">Partner</span>
</a>
</nav>
<div className="mt-auto space-y-4">
<div className="glass-panel p-4 rounded-xl border-secondary-container/20 border relative overflow-hidden group">
<div className="flex items-center space-x-2 mb-3">
<div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
<span className="text-[10px] font-bold tracking-widest text-secondary-container uppercase">Aura AI Active</span>
</div>
<button className="w-full py-2.5 bg-surface-container-highest border border-secondary-container/30 text-secondary-container text-xs font-bold rounded-md hover:bg-secondary-container hover:text-black transition-all">Chatta con Aura</button>
</div>
<div className="pt-4 border-t border-white/5 space-y-1">
<a className="flex items-center space-x-3 px-4 py-2 text-xs text-slate-500 hover:text-[#D4AF37]" href="#"><span className="material-symbols-outlined text-lg">settings</span><span>Impostazioni</span></a>
<button id="logoutBtn" className="w-full flex items-center space-x-3 px-4 py-2 text-xs text-slate-500 hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-lg">logout</span><span>Disconnetti</span></button>
</div>
</div>
</aside>
<header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 z-40">
<div className="flex items-center space-x-2"><span className="text-[#D4AF37] font-['Noto_Serif'] italic font-bold text-xl">Neon Luxe</span></div>
<div className="flex items-center space-x-2">
<div className="text-right">
<p id="userName" className="text-xs font-bold text-white">Guest</p>
<p className="text-[10px] text-primary font-bold">Partner Gold</p>
</div>
<UserButton />
</div>
</header>
<main className="ml-64 pt-24 px-8 pb-12 relative z-10">
<section className="mb-12">
<h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tight">Benvenuto, <span id="welcomeName" className="text-primary italic">Partner</span></h2>
</section>
<div className="grid grid-cols-12 gap-8">
<div className="col-span-12 lg:col-span-8">
<div className="glass-panel p-8 rounded-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-center">
<div className="relative z-10">
<div className="flex items-center space-x-3 mb-6">
<span className="material-symbols-outlined text-secondary-container text-3xl" >auto_awesome</span>
<h3 className="text-xl font-headline font-semibold">Chiedi ad Aura...</h3>
</div>
<div className="relative">
<input id="aiInput" className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-secondary-container px-4 py-4 text-lg outline-none transition-all placeholder:text-on-surface-variant/30 font-light" placeholder="Qual è l'andamento delle prenotazioni per il prossimo weekend?" type="text"/>
<button id="sendBtn" className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-container hover:scale-110 transition-transform"><span className="material-symbols-outlined text-3xl">arrow_forward_ios</span></button>
</div>
<div id="aiResponse" className="mt-6 text-sm text-slate-300 hidden"><div className="p-4 bg-white/5 rounded-lg border border-white/10 italic" id="responseText">...</div></div>
</div>
</div>
</div>
<div className="col-span-12 lg:col-span-4">
<div className="glass-panel p-8 rounded-2xl flex flex-col h-full bg-gradient-to-br from-surface-container-high/80 to-surface-container-low/80">
<p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Occupancy Rate</p>
<h4 className="text-4xl font-headline font-bold text-white">84.2%</h4>
<div className="mt-auto h-2 w-full bg-white/5 rounded-full overflow-hidden mt-8">
<div className="h-full bg-primary w-[84%] rounded-full shadow-[0_0_10px_rgba(242,202,80,0.5)]"></div>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
