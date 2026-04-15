"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const experiences = [
  {
    title: "Icone Estensi",
    desc: "Un viaggio tra i simboli del Rinascimento ferrarese.",
    img: "/assets/esperienze/ferrara/1.jpg",
  },
  {
    title: "Schifanoia",
    desc: "Il Salone dei Mesi e l'astrologia rinascimentale.",
    img: "/assets/esperienze/ferrara/2.jpg",
  },
  {
    title: "Ombre e Luci",
    desc: "Atmosfere magiche tra i vicoli del ghetto e le mura.",
    img: "/assets/esperienze/ferrara/3.jpg",
  },
  {
    title: "Comacchio",
    desc: "55km di natura incontaminata e silenzi d'acqua.",
    img: "/assets/esperienze/ferrara/4.png",
  },
  {
    title: "Food Tour",
    desc: "Degustazione itinerante dei tesori gastronomici locali.",
    img: "/assets/esperienze/ferrara/5.png",
  },
  {
    title: "Bike Tour",
    desc: "La città delle biciclette vista da una prospettiva unica.",
    img: "/assets/esperienze/ferrara/6.jpg",
  },
];

export default function FerraraExperiencesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <header style={{ padding: "28px 6vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="auth-icon-btn" title="Torna alla Home" style={{ width: 44, height: 44, borderRadius: 999 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>←</span>
        </Link>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/esperienze/ferrara" className="btn-jesko" style={{ padding: "10px 18px", fontSize: 12 }}>
            Ferrara
          </Link>
          <Link href="/esperienze/bologna" className="btn-jesko" style={{ padding: "10px 18px", fontSize: 12 }}>
            Bologna
          </Link>
        </nav>
      </header>

      <section style={{ padding: "90px 6vw 40px" }}>
        <span className="label-gold">TERRITORI D'AUTORE</span>
        <h1 className="vision-headline" style={{ marginTop: 18 }}>
          Ferrara
        </h1>
        <div className="vision-divider" style={{ marginTop: 22 }} />
        <p className="vision-body" style={{ maxWidth: 820, marginTop: 18 }}>
          Rinascimento, quiete e autenticità: un percorso curato per scoprire il lato più raro del territorio.
        </p>
      </section>

      <section className="container" style={{ padding: "0 6vw 120px" }}>
        {experiences.map((exp, index) => (
          <div key={exp.title} className="exp-list-item">
            <div className="exp-list-visual">
              <span className="exp-list-number">{String(index + 1).padStart(2, "0")}</span>
              <div style={{ position: "relative", width: "100%", height: 520, borderRadius: 18, overflow: "hidden" }}>
                <Image src={exp.img} alt={exp.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 92vw, 48vw" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span className="label-gold">FERRARA</span>
              <h3 className="vision-headline" style={{ fontSize: "clamp(2rem, 3vw, 3rem)", marginTop: 16 }}>
                {exp.title}
              </h3>
              <p className="vision-body" style={{ marginTop: 18 }}>
                {exp.desc}
              </p>
              <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/esperienze/bologna" className="btn-jesko" style={{ padding: "12px 22px", fontSize: 12 }}>
                  Vedi anche Bologna
                </Link>
                <Link href="/#experiences" className="btn-jesko" style={{ padding: "12px 22px", fontSize: 12 }}>
                  Torna agli slider
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

