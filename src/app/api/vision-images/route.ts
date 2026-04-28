import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imageFiles = [
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383917/photo_2026-04-14_22.55.57_tlqhdr.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383927/photo_2026-04-14_22.55.59_un1vho.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383936/photo_2026-04-14_22.56.03_q6fuep.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383946/photo_2026-04-14_22.56.06_jh4a2v.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383956/photo_2026-04-14_22.56.08_awj4jd.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383965/photo_2026-04-14_22.56.13_x8nxvy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383976/photo_2026-04-14_22.56.15_xhinso.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383986/photo_2026-04-14_22.56.25_nec8e5.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777383997/photo_2026-04-14_22.56.37_voh0f7.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384007/photo_2026-04-14_22.56.44_jnmt7y.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384017/photo_2026-04-14_22.56.57_vlxuoy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384028/photo_2026-04-14_22.57.01_fwk4bb.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384038/photo_2026-04-14_22.57.09_arsvsa.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384048/photo_2026-04-14_22.57.10_ivq02p.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384059/photo_2026-04-14_22.57.28_wvawp4.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384069/photo_2026-04-14_22.57.31_wlfbpp.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384080/photo_2026-04-14_22.57.39_echccq.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384090/photo_2026-04-14_22.58.18_jx9djy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384100/photo_2026-04-14_22.58.19_rzlacp.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto/f_auto/v1777384111/Screenshot_2026-04-14_alle_23.09.36_fzxt8h.webp"
    ];

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading vision images:', error);
    return NextResponse.json([], { status: 500 });
  }
}
