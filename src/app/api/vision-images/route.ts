import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const imageFiles = [
      // Le nuove 38 foto (per prime)
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381821/20260306_182338_swblpu.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381835/20260306_182345_rqdpf2.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381886/20260306_182332_lfnpga.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381895/20260306_182539_jvjypz.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381897/20260306_182559_xedsgy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381899/20260306_192552_wf8czk.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381900/20260306_192406_xvmqt8.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777381900/20260306_182616_exnmvd.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383624/20260306_182437_tbwrfb.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383634/20260306_192911_sb02cm.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383647/20260306_194922_yxv0ol.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383665/20260306_194934_lzqntz.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383678/20260306_195222_olfkxq.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383683/20260306_195306_h3kptt.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383700/20260306_195418_rfzpgz.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383704/20260306_201121_musail.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383711/20260306_214152_rbhaz8.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383717/20260306_210601_lkofx7.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383730/20260306_210559_qiheew.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383738/20260306_210451_mtb1io.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383746/20260306_210419_kk21db.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383754/20260306_210332_miy7tw.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383767/20260306_210327_r2fsc2.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383776/20260306_214210_f2tjtr.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383786/20260306_214214_q73sij.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383791/ea14f405-de3d-43c2-b0b6-8db20bdf1376_sqs3uc.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383801/photo_2026-04-14_22.53.50_tzn3g4.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383810/photo_2026-04-14_22.54.58_gclpy1.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383820/photo_2026-04-14_22.55.14_s9dmrl.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383830/photo_2026-04-14_22.55.26_ubnik2.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383839/photo_2026-04-14_22.55.27_gkq0fz.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383849/photo_2026-04-14_22.55.29_ugfufg.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383859/photo_2026-04-14_22.55.32_etyq3o.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383868/photo_2026-04-14_22.55.38_wadfsm.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383878/photo_2026-04-14_22.55.45_pielhb.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383888/photo_2026-04-14_22.55.47_iqbb3c.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383901/photo_2026-04-14_22.55.49_b7vpve.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383907/photo_2026-04-14_22.55.51_ievsfr.webp",
      // Le 20 foto precedenti (a seguire)
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383917/photo_2026-04-14_22.55.57_tlqhdr.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383927/photo_2026-04-14_22.55.59_un1vho.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383936/photo_2026-04-14_22.56.03_q6fuep.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383946/photo_2026-04-14_22.56.06_jh4a2v.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383956/photo_2026-04-14_22.56.08_awj4jd.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383965/photo_2026-04-14_22.56.13_x8nxvy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383976/photo_2026-04-14_22.56.15_xhinso.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383986/photo_2026-04-14_22.56.25_nec8e5.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777383997/photo_2026-04-14_22.56.37_voh0f7.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384007/photo_2026-04-14_22.56.44_jnmt7y.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384017/photo_2026-04-14_22.56.57_vlxuoy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384028/photo_2026-04-14_22.57.01_fwk4bb.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384038/photo_2026-04-14_22.57.09_arsvsa.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384048/photo_2026-04-14_22.57.10_ivq02p.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384059/photo_2026-04-14_22.57.28_wvawp4.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384069/photo_2026-04-14_22.57.31_wlfbpp.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384080/photo_2026-04-14_22.57.39_echccq.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384090/photo_2026-04-14_22.58.18_jx9djy.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384100/photo_2026-04-14_22.58.19_rzlacp.webp",
      "https://res.cloudinary.com/dtnqgx4vp/image/upload/q_auto:best,f_auto/v1777384111/Screenshot_2026-04-14_alle_23.09.36_fzxt8h.webp"
    ];

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Vision images API error:', error);
    return NextResponse.json({ error: 'Failed to fetch vision images' }, { status: 500 });
  }
}
