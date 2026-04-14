import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.next', 'out', '.git'];
const SOURCE_DIRS = ['components', 'pages', 'data', 'public', 'styles', 'lib', 'context', 'utils'];
const SOURCE_EXTS = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.xml', '.html', '.md'];

async function getFiles(dir, exts = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter(entry => entry.isFile())
    .map(entry => {
        // Handle recursive entries which might have parentPath or relative path
        // In Node 20+, entry.parentPath exists.
        const parent = entry.parentPath || entry.path; 
        return path.join(parent, entry.name);
    })
    .filter(filePath => {
      const relPath = path.relative(PROJECT_ROOT, filePath);
      const isExcluded = EXCLUDE_DIRS.some(exclude => relPath.startsWith(exclude));
      const hasCorrectExt = exts.length === 0 || exts.includes(path.extname(filePath).toLowerCase());
      return !isExcluded && hasCorrectExt;
    });
}

async function convertPngToWebp() {
  console.log('--- Starting Image Conversion ---');
  const pngFiles = await getFiles(PROJECT_ROOT, ['.png']);
  
  for (const file of pngFiles) {
    const webpPath = file.replace(/\.png$/i, '.webp');
    try {
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`Converted: ${path.relative(PROJECT_ROOT, file)} -> ${path.relative(PROJECT_ROOT, webpPath)}`);
      
      // Delete original PNG
      await fs.unlink(file);
      console.log(`Deleted original: ${path.relative(PROJECT_ROOT, file)}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }
}

async function updateCodeReferences() {
  console.log('\n--- Updating Code References ---');
  const filesToUpdate = [];
  
  for (const dir of SOURCE_DIRS) {
    const dirPath = path.join(PROJECT_ROOT, dir);
    try {
      await fs.access(dirPath);
      const files = await getFiles(dirPath, SOURCE_EXTS);
      filesToUpdate.push(...files);
    } catch (e) {
      // Directory doesn't exist, skip
    }
  }

  // Also include files in the root that match extensions (e.g., next.config.js, serve.json)
  const rootFiles = (await fs.readdir(PROJECT_ROOT, { withFileTypes: true }))
    .filter(entry => entry.isFile() && SOURCE_EXTS.includes(path.extname(entry.name).toLowerCase()))
    .map(entry => path.join(PROJECT_ROOT, entry.name));
  
  filesToUpdate.push(...rootFiles);

  // Filter out excludes
  const uniqueFiles = [...new Set(filesToUpdate)].filter(file => {
      const relPath = path.relative(PROJECT_ROOT, file);
      return !EXCLUDE_DIRS.some(exclude => relPath.startsWith(exclude));
  });

  for (const file of uniqueFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      // Replace .png with .webp, but only if it looks like a file extension
      // We look for .png followed by any non-word character (like <, ", ', ), space) or end of line
      const updatedContent = content.replace(/\.png(?=[^a-zA-Z0-9]|$)/g, '.webp');
      
      if (content !== updatedContent) {
        await fs.writeFile(file, updatedContent, 'utf8');
        console.log(`Updated references in: ${path.relative(PROJECT_ROOT, file)}`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
}

async function run() {
  try {
    await convertPngToWebp();
    await updateCodeReferences();
    console.log('\n--- Migration Complete! ---');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

run();
