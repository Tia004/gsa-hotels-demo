
import React from 'react';
import { UserButton } from "@clerk/nextjs";

export default function DashboardFree({ userName = "Ospite" }) {
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
<div className="absolute right-0 top-0 bottom-0 bg-gradient-to-b from-transparent via-white/5 to-transparent w-[1px]"></div>
<div className="flex items-center gap-3 px-2">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center border border-white/5">
<span className="material-symbols-outlined text-[#D4AF37]" >hotel</span>
</div>
<div>
<h1 className="text-[#D4AF37] font-headline font-black uppercase tracking-widest text-sm">GSA Hotels</h1>
<p className="text-slate-500 text-[10px] font-medium tracking-widest uppercase">B2B Portal</p>
</div>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-[#00F0FF] border-r-2 border-[#00F0FF] shadow-[inset_0_0_15px_rgba(0,240,255,0.1)] transition-transform duration-200" href="#">
<span className="material-symbols-outlined text-lg" >dashboard</span>
<span className="font-medium text-sm tracking-wide">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-[#D4AF37] hover:bg-white/5 transition-colors duration-200" href="#">
<span className="material-symbols-outlined text-lg">handshake</span>
<span className="font-medium text-sm tracking-wide">Partner</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-[#D4AF37] hover:bg-white/5 transition-colors duration-200" href="#">
<span className="material-symbols-outlined text-lg">auto_awesome_motion</span>
<span className="font-medium text-sm tracking-wide">Kit Marketing</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-[#D4AF37] hover:bg-white/5 transition-colors duration-200" href="#">
<span className="material-symbols-outlined text-lg">groups</span>
<span className="font-medium text-sm tracking-wide">Community</span>
</a>
</nav>
<div className="pt-6 border-t border-white/5 space-y-2">
<a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-[#D4AF37] transition-colors duration-200" href="#">
<span className="material-symbols-outlined text-lg">settings</span>
<span className="text-xs font-medium uppercase tracking-wider">Impostazioni</span>
</a>
<button id="logoutBtn" className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 transition-colors duration-200">
<span className="material-symbols-outlined text-lg">logout</span>
<span className="text-xs font-medium uppercase tracking-wider">Disconnetti</span>
</button>
</div>
<button className="w-full mt-4 py-3 px-4 bg-surface-container-highest border border-[#00F0FF]/30 text-[#00F0FF] rounded-lg text-xs font-bold tracking-tighter flex items-center justify-center gap-2 hover:bg-[#00F0FF]/5 transition-all">
<span className="material-symbols-outlined text-sm" >auto_awesome</span>
            Chatta con Aura
        </button>
</aside>
<header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 z-40 shadow-2xl shadow-black/50">
<div className="flex items-center gap-2">
<span className="text-2xl font-headline font-bold italic text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] tracking-tight">Neon Luxe</span>
</div>
<div className="flex items-center gap-6">
<div className="relative">
<span className="material-symbols-outlined text-slate-400 hover:text-[#D4AF37] cursor-pointer transition-all">notifications</span>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary-container rounded-full border-2 border-background"></span>
</div>
<div className="flex items-center gap-3 pl-6 border-l border-white/10">
<div className="text-right">
<p id="userName" className="text-xs font-bold text-on-surface">{userName}</p>
<p className="text-[10px] text-slate-500 font-medium">Piano Free</p>
</div>
<UserButton />
</div>
</div>
</header>
<main className="pl-64 pt-16 min-h-screen">
<div className="max-w-7xl mx-auto p-8 space-y-8">
<section className="relative overflow-hidden rounded-2xl glass-premium p-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/10">
<div className="flex flex-col md:flex-row items-center gap-8 p-10 relative z-10">
<div className="flex-1 space-y-4">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
<span className="material-symbols-outlined text-xs" >workspace_premium</span>
                            Esclusivo Gold
                        </div>
<h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-surface leading-tight">
                            Passa a <span className="text-primary italic">Gold</span> per sbloccare questi insights esclusivi
                        </h2>
<p className="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed">
                            Ottieni l'accesso a previsioni basate sull'AI, analisi avanzate dell'occupazione e dati di mercato in tempo reale per superare i tuoi competitor.
                        </p>
<div className="pt-4 flex items-center gap-4">
<button className="px-8 py-4 metal-shine text-on-primary font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95" onClick="window.location.href='pricing.html'">
                                Scopri i Vantaggi Gold
                            </button>
<button className="px-8 py-4 bg-transparent border border-outline-variant text-on-surface hover:bg-white/5 transition-colors font-semibold rounded-lg" onClick="window.location.href='pricing.html'">
                                Confronta Piani
                            </button>
</div>
</div>
<div className="w-full md:w-1/3 aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
<img className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCibcbm7T6vycpILvJ5f4xrjH5vHZCNrxZjWWkAV2t2E_smYznrQKbiVOw1BB1oYlscq5so79ga6m1oE0m04kRtFgpWmD3wqVjgj7caGrVdS6kjMaVWGIre0LWE4rwycQF6Y_QvrMJ2AspAMoqgHhOM55YJU6omJcabRBU7hz5YWSWtVEXWwvo6Wccyg-WP5ISJo5F_4jxsCnFQyE0YMnf_c1D94UuvGRzyAOGZ1xpngzYcva3evHwDV3-9KnLto96t6YLyyfiGb7F"/>
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="p-6 rounded-full bg-background/80 backdrop-blur-md border border-primary/30">
<span className="material-symbols-outlined text-primary text-5xl" >lock</span>
</div>
</div>
</div>
</div>
</section>
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
<div className="md:col-span-4 glass-premium p-8 rounded-2xl space-y-6">
<div className="flex justify-between items-start">
<h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Prenotazioni Odierne</h3>
<span className="material-symbols-outlined text-primary">calendar_today</span>
</div>
<div className="space-y-1">
<div className="text-4xl font-headline font-bold text-on-surface">14</div>
<div className="text-sm text-secondary-fixed-dim flex items-center gap-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
                            +12% vs ieri
                        </div>
</div>
<div className="h-1 bg-surface-container rounded-full overflow-hidden">
<div className="w-3/4 h-full bg-primary shadow-[0_0_10px_rgba(242,202,80,0.5)]"></div>
</div>
</div>
<div className="md:col-span-8 glass-premium p-8 rounded-2xl relative group">
<div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
<div className="px-6 py-3 rounded-full bg-primary text-on-primary font-bold text-sm shadow-2xl flex items-center gap-2 cursor-pointer" onClick="window.location.href='pricing.html'">
<span className="material-symbols-outlined text-sm" >lock</span>
                            Sblocca Insight Occupazione
                         </div>
</div>
<div className="flex justify-between items-center mb-8">
<div>
<h3 className="text-lg font-headline font-bold text-on-surface">Tasso di Occupazione</h3>
<p className="text-xs text-slate-500 font-medium">Analisi storica vs Proiezioni mensili</p>
</div>
</div>
<div className="blurred-content h-48 flex items-end justify-between gap-4">
<div className="w-full bg-surface-container h-[40%] rounded-t-lg"></div>
<div className="w-full bg-primary/20 h-[65%] rounded-t-lg"></div>
<div className="w-full bg-surface-container h-[55%] rounded-t-lg"></div>
<div className="w-full bg-primary/20 h-[85%] rounded-t-lg"></div>
<div className="w-full bg-surface-container h-[70%] rounded-t-lg"></div>
<div className="w-full bg-secondary-container/20 h-[95%] rounded-t-lg"></div>
<div className="w-full bg-surface-container h-[60%] rounded-t-lg"></div>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
