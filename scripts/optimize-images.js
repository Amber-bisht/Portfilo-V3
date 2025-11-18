const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(process.cwd(), 'public', 'images');
const outDir = path.join(process.cwd(), 'public', 'images');

// Images to optimize
const images = [
  'asksync.png',
  'lms.png',
  'code.png',
];

async function optimizeImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  const baseName = path.parse(filename).name;
  
  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  File not found: ${filename}`);
    return;
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`\n📸 Optimizing ${filename} (${metadata.width}x${metadata.height})...`);

    // Generate WebP version (better compression, widely supported)
    const webpPath = path.join(outDir, `${baseName}.webp`);
    const webpBuffer = await image
      .webp({ quality: 85, effort: 6 })
      .toBuffer();
    
    fs.writeFileSync(webpPath, webpBuffer);
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = webpBuffer.length;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    
    console.log(`  ✅ WebP: ${(webpSize / 1024).toFixed(1)} KB (${savings}% smaller than ${(originalSize / 1024).toFixed(1)} KB PNG)`);

    // Generate AVIF version (best compression, modern browsers)
    const avifPath = path.join(outDir, `${baseName}.avif`);
    const avifBuffer = await image
      .avif({ quality: 80, effort: 4 })
      .toBuffer();
    
    fs.writeFileSync(avifPath, avifBuffer);
    const avifSize = avifBuffer.length;
    const avifSavings = ((1 - avifSize / originalSize) * 100).toFixed(1);
    
    console.log(`  ✅ AVIF: ${(avifSize / 1024).toFixed(1)} KB (${avifSavings}% smaller than PNG)`);

    // Create a fallback that uses the smallest format
    const bestFormat = avifSize < webpSize ? 'avif' : 'webp';
    console.log(`  💡 Best format: ${bestFormat.toUpperCase()}`);

  } catch (error) {
    console.error(`  ❌ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Check if sharp is available
  try {
    require('sharp');
  } catch (error) {
    console.error('❌ Error: sharp is not installed. Run: npm install --save-dev sharp');
    process.exit(1);
  }

  // Process each image
  for (const image of images) {
    await optimizeImage(image);
  }

  console.log('\n✨ Image optimization complete!');
  console.log('\n📝 Note: Update your Image components to use WebP/AVIF with PNG fallback:');
  console.log('   <Image src="/images/asksync.webp" fallback="/images/asksync.png" ... />');
}

main().catch(console.error);

