"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";
import { useLang } from "@/context/LangContext";

const experiences = [
  {
    slug: "ferrara-esp-1",
    key: "exp.fe1",
    img: "/assets/esperienze/ferrara/1.jpg",
  },
  {
    slug: "ferr-esp-2",
    key: "exp.fe2",
    img: "/assets/esperienze/ferrara/2.jpg",
  },
  {
    slug: "ferr-esp-3",
    key: "exp.fe3",
    img: "/assets/esperienze/ferrara/3.jpg",
  },
  {
    slug: "ferr-esp-4",
    key: "exp.fe4",
    img: "/assets/esperienze/ferrara/4.png",
  },
  {
    slug: "ferr-esp-5",
    key: "exp.fe5",
    img: "/assets/esperienze/ferrara/5.png",
  },
  {
    slug: "ferr-esp-6",
    key: "exp.fe6",
    img: "/assets/esperienze/ferrara/6.jpg",
  },
];

export default function FerraraExperiencesPage() {
  const { t } = useLang();
  
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <GlobalNav />

      {/* Hero Section */}
      <section style={{ padding: "160px 6vw 40px" }}>
        <span className="label-gold">TERRITORI D'AUTORE</span>
        <h1 className="vision-headline" style={{ marginTop: 18 }}>
          Esperienze Memorabili: Ferrara
        </h1>
        <div className="vision-divider" style={{ marginTop: 22 }} />
        <p className="vision-body" style={{ maxWidth: 820, marginTop: 18 }}>
          Rinascimento, quiete e autenticità: un percorso curato per scoprire il lato più prezioso del territorio e la sua storia millenaria.
        </p>
      </section>

      {/* LISTA ESPERIENZE */}
      <section className="container" style={{ padding: "0 6vw 80px" }}>
        {experiences.map((exp, index) => (
          <div key={exp.slug} className="exp-list-item">
            <div className="exp-list-visual">
              <span className="exp-list-number">{String(index + 1).padStart(2, "0")}</span>
              <div style={{ position: "relative", width: "100%", height: 520, borderRadius: 18, overflow: "hidden" }}>
                <Image src={exp.img} alt={t(`${exp.key}.title`) || "Ferrara Experience"} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 92vw, 48vw" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span className="label-gold">FERRARA</span>
              <h3 className="vision-headline" style={{ fontSize: "clamp(2rem, 3vw, 3rem)", marginTop: 16 }}>
                {t(`${exp.key}.title`)}
              </h3>
              <p className="vision-body" style={{ marginTop: 18 }}>
                {t(`${exp.key}.desc`)}
              </p>
              <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/esperienze/ferrara/${exp.slug}`} className="btn-partner-gold" style={{ padding: "12px 26px", fontSize: "0.9rem", borderRadius: "100px", display: "inline-block" }}>
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
            Torna a Bologna
          </h2>
          <p className="vision-body" style={{ marginBottom: 50, opacity: 0.8 }}>
            Ripercorri le strade della "Dotta": tra i portici UNESCO, le torri secolari e l'inconfondibile calore della tradizione bolognese.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/esperienze/bologna" className="btn-partner-gold" style={{ 
              padding: "20px 60px", 
              fontSize: "1.1rem", 
              borderRadius: "100px", 
              letterSpacing: 2,
              boxShadow: "0 0 40px rgba(186, 150, 88, 0.15)",
              transition: "all 0.4s ease"
            }}>
              VAI A BOLOGNA
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

