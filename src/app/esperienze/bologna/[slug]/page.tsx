"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import GlobalNav from "@/components/GlobalNav";
import { useLang } from "@/context/LangContext";

import ExperienceSlider from "@/components/ExperienceSlider";

const slugToKey: Record<string, string> = {
  "bologna-esp-1": "exp.bo1",
  "bologna-esp-2": "exp.bo2",
  "bologna-esp-3": "exp.bo3"
};

const slugToImages: Record<string, string[]> = {
  "bologna-esp-1": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340646/1_mw176l.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340647/2_pavbzk.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340649/3_c5aykt.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340651/4_bx4i0p.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340652/5_fvsatj.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340653/6_a0dqcx.webp"
  ],
  "bologna-esp-2": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340660/1_cfdcqe.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340662/2_ltgldu.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340665/3_ujygw3.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340666/4_xdtf1k.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340668/5_wistyv.webp"
  ],
  "bologna-esp-3": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340676/1_binv0d.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340677/2_hrloxx.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340680/3_fmnovt.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340681/4_i7g0hp.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340682/5_huo6bg.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340683/6_mp4kvh.webp"
  ]
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
        cityLabel="BOLOGNA" 
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
           <Link href="/esperienze/bologna" className="pill-btn" style={{ padding: "14px 30px", display: "inline-block" }}>
             {t('exp.scopri').toUpperCase()}
           </Link>
        </div>
      </section>
    </main>
  );
}
