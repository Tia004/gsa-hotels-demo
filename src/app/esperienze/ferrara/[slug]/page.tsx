"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import GlobalNav from "@/components/GlobalNav";
import { useLang } from "@/context/LangContext";

import ExperienceSlider from "@/components/ExperienceSlider";

const slugToKey: Record<string, string> = {
  "ferrara-esp-1": "exp.fe1",
  "ferr-esp-2": "exp.fe2",
  "ferr-esp-3": "exp.fe3",
  "ferr-esp-4": "exp.fe4",
  "ferr-esp-5": "exp.fe5",
  "ferr-esp-6": "exp.fe6"
};

const slugToImages: Record<string, string[]> = {
  "ferrara-esp-1": Array.from({length: 4}, (_,i) => `/assets/esperienze/ferrara-1/${i+1}.jpg`),
  "ferr-esp-2": Array.from({length: 4}, (_,i) => `/assets/esperienze/ferrara-2/${i+1}.jpg`),
  "ferr-esp-3": Array.from({length: 4}, (_,i) => `/assets/esperienze/ferrara-3/${i+1}.jpg`),
  "ferr-esp-4": Array.from({length: 8}, (_,i) => `/assets/esperienze/ferrara-4/${i+1}.png`),
  "ferr-esp-5": Array.from({length: 7}, (_,i) => `/assets/esperienze/ferrara-5/${i+1}.jpeg`),
  "ferr-esp-6": Array.from({length: 5}, (_,i) => `/assets/esperienze/ferrara-6/${i+1}.jpg`)
};

export default function FerraraExperienceArticle() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);
  const { t } = useLang();

  const key = slugToKey[slug] || slugToKey[slug.toLowerCase()];
  
  if (!key) {
    return (
      <main style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "160px 6vw" }}>
        <h1 className="vision-headline">{t('exp.notFound')}</h1>
        <Link href="/esperienze/ferrara" className="pill-btn" style={{ marginTop: 20, display: "inline-block" }}>{t('exp.goBack')}</Link>
      </main>
    );
  }

  const expImages = slugToImages[slug] || slugToImages[slug.toLowerCase()] || [];

  const exp = {
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
    content: t(`${key}.content`),
    images: expImages
  };

  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
      <GlobalNav />

      <ExperienceSlider 
        images={exp.images} 
        cityLabel="FERRARA" 
        title={exp.title} 
      />

      <section className="container" style={{ padding: "60px 6vw 120px", maxWidth: "900px", margin: "0 auto" }}>
        <h3 className="vision-subtitle" style={{ color: "#C5A059", marginBottom: "30px", fontSize: "1.6rem", lineHeight: 1.4 }}>
          {exp.desc}
        </h3>
        <p className="vision-body" style={{ lineHeight: 1.8, fontSize: "1.15rem", whiteSpace: "pre-wrap" }}>
          {exp.content}
        </p>

        <div style={{ marginTop: "60px" }}>
           <Link href="/esperienze/ferrara" className="pill-btn" style={{ padding: "14px 30px", display: "inline-block" }}>
             {t('exp.scopri').toUpperCase()}
           </Link>
        </div>
      </section>
    </main>
  );
}
