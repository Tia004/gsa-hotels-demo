import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public/assets/immagini-slider-autenticita');
    const files = fs.readdirSync(imagesDirectory);

    // Filter for image files and map to relative URL paths
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // Natural sort for 1, 2, 10
      .map(file => `/assets/immagini-slider-autenticita/${file}`);

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading vision images:', error);
    return NextResponse.json([], { status: 500 });
  }
}
