"use client";

import React from "react";
import Link from "next/link";

export default function ExperiencesPage() {
  const bolognaExperiences = [
    {
      title: "Bologna: Centro Storico",
      desc: "Torri, piazze e i sapori autentici della tradizione bolognese. Un itinerario che attraversa Piazza Maggiore e le due torri, fermandosi nelle botteghe storiche del Quadrilatero.",
      img: "https://images.unsplash.com/photo-1516483642775-9a3ac20c54ea?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Bologna: San Luca",
      desc: "Una camminata panoramica sotto il portico più lungo del mondo. 666 archi che collegano la città al Santuario sul Colle della Guardia, offrendo scorci unici sui colli bolognesi.",
      img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Bologna: Alternativa",
      desc: "Arte contemporanea e angoli nascosti fuori dai circuiti classici. Dai canali sotterranei alla street art del Pratello, scoprendo il lato più ribelle e creativo della città.",
      img: "https://images.unsplash.com/photo-1520175480921-4edfa0683a2f?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const ferraraExperiences = [
    {
      title: "Ferrara: Icone Estensi",
      desc: "Un viaggio tra i simboli del Rinascimento ferrarese. Dal Castello Estense alla Cattedrale, attraversando le ampie prospettive dell'Addizione Erculea.",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Schifanoia",
      desc: "Il Salone dei Mesi e l'astrologia rinascimentale. Un capolavoro assoluto dove arte e misticismo si fondono in uno dei cicli di affreschi più importanti d'Europa.",
      img: "https://images.unsplash.com/photo-1548574906-7d46c503c457?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Ombre e Luci",
      desc: "Atmosfere magiche tra i vicoli del ghetto e le mura medievali. Un percorso suggestivo che evoca le storie di Bassani e la vita pulsante della Ferrara antica.",
      img: "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Comacchio",
      desc: "55km di natura incontaminata e silenzi d'acqua. Un'anello ciclabile o una gita in barca tra i canali di Comacchio e le distese dei fenicotteri rosa.",
      img: "https://images.unsplash.com/photo-1552528148-03820ac188f5?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Food Tour",
      desc: "Degustazione itinerante dei tesori gastronomici locali. Dai cappellacci di zucca al pasticcio ferrarese, accompagnati dalla tipica coppia di pane IGP.",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
    },
    {
      title: "Ferrara: Bike Tour",
      desc: "La città delle biciclette vista da una prospettiva unica. Pedalando sopra le mura fortificate, uno dei polmoni verdi più belli e integri d'Italia.",
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Editorial Header */}
      <header className="py-20 px-8 text-center relative border-b border-white opacity-10 uppercase tracking-[0.3em]">
        <Link href="/" className="absolute left-8 top-1/2 -translate-y-1/2 text-sm text-[#C5A059] flex items-center gap-2 tracking-widest hover:opacity-70 transition-opacity">
          <i className="fas fa-arrow-left" /> TORNA ALLA HOME
        </Link>
        <span className="text-sm">GSA Hotels Experiences</span>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-8 container mx-auto text-center">
        <span className="label-gold">TERRITORI D'AUTORE</span>
        <h1 className="text-7xl md:text-9xl font-display mt-8 mb-12">Esperienze Memorabili</h1>
        <p className="max-w-2xl mx-auto text-xl opacity-60 leading-relaxed font-light">
          Bologna e Ferrara. Due anime, mille storie da raccontare. 
          Benvenuti in un viaggio tra storia, gusto e autenticità.
        </p>
      </section>

      {/* Bologna Section */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-4xl font-display mb-20 text-[#C5A059] flex items-center gap-6">
          <span className="h-[1px] w-20 bg-[#C5A059] opacity-30"></span>
          BOLOGNA
        </h2>
        <div className="space-y-40">
          {bolognaExperiences.map((exp, index) => (
            <div key={index} className="exp-list-item">
              <div className="exp-list-visual">
                <span className="exp-list-number">0{index + 1}</span>
                <img src={exp.img} alt={exp.title} className="w-full h-auto rounded-xl shadow-2xl" />
              </div>
              <div className="flex-1 space-y-6">
                <span className="text-sm tracking-widest text-[#C5A059] uppercase">MOMENTI ESCLUSIVI BOLOGNA</span>
                <h3 className="text-5xl font-display">{exp.title}</h3>
                <p className="text-lg opacity-70 leading-relaxed font-light">{exp.desc}</p>
                <div className="pt-8">
                  <button className="exp-link-btn text-lg">SCOPRI DI PIÙ <i className="fas fa-chevron-right ml-2" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ferrara Section */}
      <section className="container mx-auto px-8 py-40 border-t border-white/5">
        <h2 className="text-4xl font-display mb-20 text-[#C5A059] flex items-center gap-6">
          <span className="h-[1px] w-20 bg-[#C5A059] opacity-30"></span>
          FERRARA
        </h2>
        <div className="space-y-40">
          {ferraraExperiences.map((exp, index) => (
            <div key={index} className="exp-list-item">
              <div className="exp-list-visual">
                <span className="exp-list-number">0{index + 1}</span>
                <img src={exp.img} alt={exp.title} className="w-full h-auto rounded-xl shadow-2xl" />
              </div>
              <div className="flex-1 space-y-6">
                <span className="text-sm tracking-widest text-[#C5A059] uppercase">MOMENTI ESCLUSIVI FERRARA</span>
                <h3 className="text-5xl font-display">{exp.title}</h3>
                <p className="text-lg opacity-70 leading-relaxed font-light">{exp.desc}</p>
                <div className="pt-8">
                  <button className="exp-link-btn text-lg">SCOPRI DI PIÙ <i className="fas fa-chevron-right ml-2" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Elegant Footer CTA */}
      <section className="py-40 bg-[#0a0a0a] text-center">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-display mb-12">Hai bisogno di assistenza?</h2>
          <p className="text-xl opacity-60 mb-16 max-w-xl mx-auto">
            Il nostro team è pronto a personalizzare ogni dettaglio del vostro soggiorno.
          </p>
          <Link href="/#contact" className="btn-jesko text-lg px-12 py-5 transform hover:scale-105 transition-transform">
            CONTATTACI ORA
          </Link>
        </div>
      </section>
      
      <footer className="py-20 text-center opacity-30 text-xs tracking-[0.5em] uppercase border-t border-white/5">
        GSA HOTELS • THE ART OF HOSTING
      </footer>
    </main>
  );
}
