"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalNav from "@/components/GlobalNav";

export default function ExperiencesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <GlobalNav />
      
      <section style={{ padding: "160px 6vw 120px" }}>
        <span className="label-gold">TERRITORI D'AUTORE</span>
        <h1 className="vision-headline" style={{ marginTop: 18 }}>
          Esperienze Memorabili
        </h1>
        <div className="vision-divider" style={{ marginTop: 22 }} />
        <p className="vision-body" style={{ maxWidth: 820, marginTop: 18 }}>
          Due destinazioni. Due pagine dedicate. Stesso stile editoriale, stessa qualità visiva.
        </p>

        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          <Link href="/esperienze/bologna" className="video-preview-card" style={{ borderRadius: 18, overflow: "hidden" }}>
            <div className="video-overlay" />
            <div style={{ position: "relative", height: 240 }}>
              <Image src="/assets/esperienze/bologna/1.jpg" alt="Bologna" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: 18 }}>
              <span className="label-gold">BOLOGNA</span>
              <div className="vision-body" style={{ marginTop: 10 }}>
                Scopri le esperienze selezionate
              </div>
            </div>
          </Link>

          <Link href="/esperienze/ferrara" className="video-preview-card" style={{ borderRadius: 18, overflow: "hidden" }}>
            <div className="video-overlay" />
            <div style={{ position: "relative", height: 240 }}>
              <Image src="/assets/esperienze/ferrara/1.jpg" alt="Ferrara" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ padding: 18 }}>
              <span className="label-gold">FERRARA</span>
              <div className="vision-body" style={{ marginTop: 10 }}>
                Scopri le esperienze selezionate
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
