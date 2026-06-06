#!/usr/bin/env node
/**
 * convert-png-to-webp.js
 * Converts all .png files under public/ to .webp using sharp (quality 85).
 * Original .png files are kept so nothing breaks if references haven't been updated yet.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

function walk(dir) {
    let files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) files = files.concat(walk(full));
        else if (entry.name.toLowerCase().endsWith('.png')) files.push(full);
    }
    return files;
}

async function convert() {
    const pngs = walk(PUBLIC_DIR);
    console.log(`Found ${pngs.length} PNG file(s):\n`);

    for (const src of pngs) {
        const dest = src.replace(/\.png$/i, '.webp');
        try {
            await sharp(src)
                .webp({ quality: 85 })
                .toFile(dest);
            const srcSize  = (fs.statSync(src).size  / 1024).toFixed(1);
            const destSize = (fs.statSync(dest).size / 1024).toFixed(1);
            console.log(`  ✓  ${path.relative(PUBLIC_DIR, src).padEnd(50)} ${srcSize} KB  →  ${destSize} KB`);
        } catch (err) {
            console.error(`  ✗  ${src}: ${err.message}`);
        }
    }

    console.log('\nDone. Originals kept. Update your references from .png → .webp.\n');
}

convert();
