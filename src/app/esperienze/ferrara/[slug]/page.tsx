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
  "ferrara-esp-1": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340701/1_ngs2wy.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340703/2_wukpsk.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340705/3_qp1mua.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340707/4_u8gyj5.webp"
  ],
  "ferr-esp-2": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340714/1_mh8scp.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340717/2_cfv4p5.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340718/3_wqvhi1.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340720/4_xtafvl.webp"
  ],
  "ferr-esp-3": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340726/1_mdwxqb.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340731/2_z2texa.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340732/3_xmgdaz.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340734/4_o5fchx.webp"
  ],
  "ferr-esp-4": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340741/1_lxg1uf.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340743/2_rk0c2m.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340745/3_rbbols.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340746/4_y4ggmw.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340749/5_th5xbe.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340750/6_knp08c.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340752/7_r5ag29.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340754/8_uvuxoj.webp"
  ],
  "ferr-esp-5": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340757/1_qe1jzb.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340759/2_btpbbq.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340761/3_uobogu.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340762/4_vh8csr.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340764/5_nq4ps8.webp"
  ],
  "ferr-esp-6": [
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340766/1_xchncg.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340768/2_nsnlwg.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340771/3_cf2mhr.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340773/4_q1jrff.webp",
    "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777340774/5_ti75xy.webp"
  ]
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
