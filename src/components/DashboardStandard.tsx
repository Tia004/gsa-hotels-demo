
import React from 'react';
import { UserButton } from "@clerk/nextjs";

export default function DashboardStandard({ userName = "Ospite" }) {
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
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-white" >hotel</span>
            </div>
            <div>
                <h1 className="text-white font-['Noto_Serif'] font-black uppercase tracking-widest leading-none text-sm">GSA Hotels</h1>
                <p className="text-[10px] text-slate-500 font-medium tracking-[0.2em] mt-1 uppercase">B2B Portal</p>
            </div>
        </div>
        <nav className="flex-1 space-y-2">
            <a className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-[#00F0FF] border-r-2 border-[#00F0FF]" href="#">
                <span className="material-symbols-outlined" >dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:text-white" href="#">
                <span className="material-symbols-outlined">handshake</span>
                <span className="text-sm font-medium">Partner</span>
            </a>
            <a className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:text-white" href="#">
                <span className="material-symbols-outlined">auto_awesome_motion</span>
                <span className="text-sm font-medium">Kit Marketing</span>
            </a>
        </nav>
        <div className="mt-auto space-y-4">
            <div className="glass-panel p-4 rounded-xl border-white/5 relative overflow-hidden group">
                <div className="flex items-center space-x-2 mb-3 opacity-50">
                    <span className="material-symbols-outlined text-slate-400 text-sm" >lock</span>
                    <span className="text-[10px] uppercase text-slate-400">Aura AI (Premium)</span>
                </div>
                <button onClick="window.location.href='pricing.html'" className="w-full py-2 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded-md uppercase">Sblocca Gold</button>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-1">
                <a className="flex items-center space-x-3 px-4 py-2 text-xs text-slate-500 hover:text-white" href="#"><span className="material-symbols-outlined text-lg">settings</span><span>Impostazioni</span></a>
                <button id="logoutBtn" className="w-full flex items-center space-x-3 px-4 py-2 text-xs text-slate-500 hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-lg">logout</span><span>Disconnetti</span></button>
            </div>
        </div>
    </aside>

    <header className="fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-8 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/5 z-40">
        <div className="flex items-center space-x-2"><span className="text-white font-['Noto_Serif'] italic font-bold text-xl">Neon Luxe</span></div>
        <div className="flex items-center space-x-2">
            <div className="text-right">
                <p id="userName" className="text-xs font-bold text-white">{userName}</p>
                <p className="text-[10px] text-slate-500">Piano Standard</p>
            </div>
            <UserButton />
        </div>
    </header>

    <main className="ml-64 pt-24 px-8 pb-12 relative z-10">
        <section className="mb-12">
            <h2 className="text-4xl font-headline font-bold text-white">Dashboard <span className="text-white italic">Standard</span></h2>
        </section>
        
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
                <div className="glass-panel p-8 rounded-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-center border-outline-variant/20">
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B1120]/60 backdrop-blur-md rounded-2xl">
                        <div className="p-4 rounded-full bg-surface-container-high border border-white/5 mb-4 shadow-xl">
                            <span className="material-symbols-outlined text-primary text-3xl" >lock</span>
                        </div>
                        <h4 className="font-headline font-bold text-xl text-white">Consulenza AI Aura 24/7</h4>
                        <p className="text-sm text-slate-400 mt-2 mb-6 text-center max-w-sm">Ricevi insight di mercato istantanei e consulenze per il pricing parlando direttamente con l'IA.</p>
                        <button onClick="window.location.href='pricing.html'" className="px-6 py-2.5 bg-primary text-black text-xs font-bold uppercase rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-all">Sblocca con Gold</button>
                    </div>
                    <div className="opacity-30 blur-[3px]">
                        <div className="flex items-center space-x-3 mb-6"><span className="material-symbols-outlined text-secondary-container text-3xl">auto_awesome</span><h3 className="text-xl font-headline font-semibold">Chiedi ad Aura...</h3></div>
                        <div className="w-full bg-surface-container-low border-b-2 border-outline-variant px-4 py-4 text-lg font-light text-slate-500">Analizza i trend...</div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
                <div className="glass-panel p-8 rounded-2xl flex flex-col h-full bg-surface-container-high/40">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Occupancy Rate</p>
                    <h4 className="text-4xl font-headline font-bold text-white">72.4%</h4>
                    <div className="mt-auto h-2 w-full bg-white/5 rounded-full overflow-hidden mt-8">
                        <div className="h-full bg-white w-[72%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </div>
  );
}
