"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import { useLang } from "@/context/LangContext";

const experiences = [
  {
    slug: "bologna-esp-1",
    key: "exp.bo1",
    img: "/assets/esperienze/bologna/1.jpg",
  },
  {
    slug: "bologna-esp-2",
    key: "exp.bo2",
    img: "/assets/esperienze/bologna/2.jpg",
  },
  {
    slug: "bologna-esp-3",
    key: "exp.bo3",
    img: "/assets/esperienze/bologna/3.jpg",
  },
];

export default function BolognaExperiencesPage() {
  const { t } = useLang();
  
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <GlobalNav />

      {/* Hero Section */}
      <section style={{ padding: "160px 6vw 40px" }}>
        <span className="label-gold">TERRITORI D'AUTORE</span>
        <h1 className="vision-headline" style={{ marginTop: 18 }}>
          Esperienze Memorabili: Bologna
        </h1>
        <div className="vision-divider" style={{ marginTop: 22 }} />
        <p className="vision-body" style={{ maxWidth: 820, marginTop: 18 }}>
          Un viaggio nell'anima autentica della città, dove storia medievale e cultura gastronomica si fondono in un'esperienza senza tempo.
        </p>
      </section>

      {/* LISTA ESPERIENZE */}
      <section className="container" style={{ padding: "0 6vw 80px" }}>
        {experiences.map((exp, index) => (
          <div key={exp.slug} className="exp-list-item">
            <div className="exp-list-visual">
              <span className="exp-list-number">{String(index + 1).padStart(2, "0")}</span>
              <div style={{ position: "relative", width: "100%", height: 520, borderRadius: 18, overflow: "hidden" }}>
                <Image src={exp.img} alt={t(`${exp.key}.title`) || "Bologna Experience"} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 92vw, 48vw" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span className="label-gold">BOLOGNA</span>
              <h3 className="vision-headline" style={{ fontSize: "clamp(2rem, 3vw, 3rem)", marginTop: 16 }}>
                {t(`${exp.key}.title`)}
              </h3>
              <p className="vision-body" style={{ marginTop: 18 }}>
                {t(`${exp.key}.desc`)}
              </p>
              <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/esperienze/bologna/${exp.slug}`} className="btn-partner-gold" style={{ padding: "12px 26px", fontSize: "0.9rem", borderRadius: "100px", display: "inline-block" }}>
                  GUARDA L'ESPERIENZA
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CITY SWITCHER - PROFESSIONAL DESIGNED */}
      <section style={{ padding: "120px 6vw", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(to bottom, #050505, #0a0a0a)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span className="label-gold" style={{ letterSpacing: 4 }}>CONTINUA IL VIAGGIO</span>
          <h2 className="vision-headline" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginTop: 24, marginBottom: 40 }}>
            Scopri Ferrara
          </h2>
          <p className="vision-body" style={{ marginBottom: 50, opacity: 0.8 }}>
            Dall'energia di Bologna alla quiete rinascimentale di Ferrara. Esplora le icone estensi e i silenzi del Delta del Po.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/esperienze/ferrara" className="btn-partner-gold" style={{ 
              padding: "20px 60px", 
              fontSize: "1.1rem", 
              borderRadius: "100px", 
              letterSpacing: 2,
              boxShadow: "0 0 40px rgba(186, 150, 88, 0.15)",
              transition: "all 0.4s ease"
            }}>
              VAI A FERRARA
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

