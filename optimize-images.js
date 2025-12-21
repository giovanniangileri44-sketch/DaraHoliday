import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colori per il terminale
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Configurazione
const PHOTOS_DIR = path.join(__dirname, 'public', 'foto');
const MAX_WIDTH = 1600;
const QUALITY = 80; // WebP quality
let totalProcessed = 0;
let totalSkipped = 0;
let totalSaved = 0;

// Ricerca ricorsiva di file
function getImageFiles(dir) {
  let files = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        files = files.concat(getImageFiles(fullPath));
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          files.push(fullPath);
        }
      }
    });
  } catch (err) {
    log.error(`Errore nella lettura della cartella ${dir}: ${err.message}`);
  }

  return files;
}

// Formatta byte in KB o MB
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Ottimizza una singola immagine
async function optimizeImage(filePath) {
  try {
    // Leggi info file originale
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const name = path.basename(filePath, ext);
    const newFilePath = path.join(dir, `${name}.webp`);
    const relativePath = path.relative(PHOTOS_DIR, filePath);

    // Leggi e converti in WebP
    const buffer = await sharp(filePath)
      .resize(MAX_WIDTH, MAX_WIDTH, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY, effort: 4 })
      .toBuffer();

    const newSize = buffer.length;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    // Salva il nuovo file WebP
    fs.writeFileSync(newFilePath, buffer);

    totalProcessed++;
    totalSaved += originalSize - newSize;

    log.success(`${relativePath} -> ${name}.webp`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${reduction}% ridotto)`);

  } catch (err) {
    log.error(`Errore elaborazione ${filePath}: ${err.message}`);
    totalSkipped++;
  }
}

// Funzione principale
async function main() {
  log.title('🖼️  WEBP CONVERTER & OPTIMIZER');

  // Verifica cartella
  if (!fs.existsSync(PHOTOS_DIR)) {
    log.error(`Cartella non trovata: ${PHOTOS_DIR}`);
    process.exit(1);
  }

  log.info(`Cartella destinazione: ${PHOTOS_DIR}`);
  log.info(`Risoluzione massima: ${MAX_WIDTH}px`);
  log.info(`Qualità WebP: ${QUALITY}%`);

  // Trova tutti i file
  const imageFiles = getImageFiles(PHOTOS_DIR);

  if (imageFiles.length === 0) {
    log.warn('Nessun file immagine trovato');
    process.exit(0);
  }

  log.info(`Trovate ${imageFiles.length} immagini da convertire\n`);

  // Processa le immagini
  console.log(`${colors.bright}Elaborazione in corso...${colors.reset}\n`);

  for (const filePath of imageFiles) {
    await optimizeImage(filePath);
  }

  // Risultati finali
  log.title('📊 RIEPILOGO OTTIMIZZAZIONE');

  console.log(`${colors.bright}Immagini elaborate:${colors.reset}   ${totalProcessed}`);
  console.log(`${colors.bright}Immagini saltate:${colors.reset}     ${totalSkipped}`);
  console.log(`${colors.bright}Spazio totale risparmiato (stimato):${colors.reset} ${formatBytes(totalSaved)}`);

  log.success(`Conversione completata!`);

  process.exit(0);
}

// Avvia
main().catch(err => {
  log.error(`Errore critico: ${err.message}`);
  process.exit(1);
});
