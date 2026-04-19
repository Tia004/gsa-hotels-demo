"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import GlobalNav from "@/components/GlobalNav";
import { useLang } from "@/context/LangContext";

const slugToKey: Record<string, string> = {
  "centro-storico": "exp.bo1",
  "san-luca": "exp.bo2",
  "alternativa": "exp.bo3"
};

export default function BolognaExperienceArticle() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);
  const { t } = useLang();

  const key = slugToKey[slug] || slugToKey[slug.toLowerCase()];
  
  if (!key) {
    return (
      <main style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "160px 6vw" }}>
        <h1 className="vision-headline">{t('exp.notFound')}</h1>
        <Link href="/esperienze/bologna" className="pill-btn" style={{ marginTop: 20, display: "inline-block" }}>{t('exp.goBack')}</Link>
      </main>
    );
  }

  const exp = {
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
    content: t(`${key}.content`),
    img: `/assets/esperienze/bologna/${key === 'exp.bo1' ? '1.jpg' : key === 'exp.bo2' ? '2.jpg' : '3.jpg'}`
  };

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <GlobalNav />
      {/* Header removal */}

      <div style={{ position: "relative", width: "100%", height: "70vh", minHeight: "500px" }}>
        <Image src={exp.img} alt={exp.title} fill style={{ objectFit: "cover" }} priority />
        <div className="video-overlay" style={{ background: "linear-gradient(to top, rgba(5, 5, 5, 0.9), transparent)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 60, left: "6vw", right: "6vw", zIndex: 10 }}>
           <span className="label-gold">BOLOGNA</span>
           <h1 className="vision-headline" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", margin: "10px 0", color: "white", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>{exp.title}</h1>
        </div>
      </div>

      <section className="container" style={{ padding: "60px 6vw 120px", maxWidth: "900px", margin: "0 auto" }}>
        <h3 className="vision-subtitle" style={{ color: "#C5A059", marginBottom: "20px", fontSize: "1.5rem" }}>{exp.desc}</h3>
        <p className="vision-body" style={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
          {exp.content}
        </p>

        <div style={{ marginTop: "60px" }}>
           <Link href="/esperienze/bologna" className="pill-btn" style={{ padding: "14px 30px", display: "inline-block" }}>
             {t('exp.scopri').toUpperCase()}
           </Link>
        </div>
      </section>
    </main>
  );
}
