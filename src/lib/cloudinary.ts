/**
 * Helper per generare URL Cloudinary ottimizzati.
 * @param path Il percorso o nome del file su Cloudinary (es: 'v12345/hero-bg.webp')
 * @param cloudName Il tuo Cloud Name di Cloudinary (lo trovi nella dashboard)
 */
export const getCloudinaryUrl = (path: string, cloudName: string = 'dtnqgx4vp') => {
  // Se il path è già un URL completo, non fare nulla
  if (path.startsWith('http')) return path;
  
  // Rimuovi slash iniziale se presente
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // f_auto: sceglie automaticamente il formato migliore (WebP, AVIF, ecc)
  // q_auto: ottimizza la qualità per ridurre il peso senza perdite visibili
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${cleanPath}`;
};

/**
 * Esempio d'uso:
 * import { getCloudinaryUrl } from '@/lib/cloudinary';
 * 
 * <Image src={getCloudinaryUrl('v123456/logo.webp')} ... />
 */
