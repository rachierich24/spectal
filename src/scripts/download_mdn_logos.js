const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGOS = [
  {
    name: 'Nighlight',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b1894b443e3c4f2954e483_Nighlight.webp',
    fileName: 'nighlight.webp'
  },
  {
    name: 'Red Bull',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b18962a7c656be1a29ea46_Red%20Bull.webp',
    fileName: 'redbull.webp'
  },
  {
    name: 'Buona',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b064bae5ce571b1a9b6a1d_281f894d9219f1f0a6cfcc59b75e21e6_Buona.webp',
    fileName: 'buona.webp'
  },
  {
    name: 'Tequila Patron',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b066a95b911d3a56437dd4_Tequila%20Patron.svg',
    fileName: 'tequilapatron.svg'
  },
  {
    name: 'Playground',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b188f4c23b2ceeb5da20cf_Playground.webp',
    fileName: 'playground.webp'
  },
  {
    name: 'Cape Coast',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b1892b9c290020fbaa5b28_Cape%20Coast.webp',
    fileName: 'capecoast.webp'
  },
  {
    name: 'Daily bagel',
    url: 'https://cdn.prod.website-files.com/69b02bc208ba173f5ae5371e/69b1898449b23e56d98d2a2f_Daily%20bagel.webp',
    fileName: 'dailybagel.webp'
  }
];

function fetchFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'SpectalLogoDownloader/1.0 (contact@spectal.agency) Node.js/18'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Failed to fetch ${url}: Status Code ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete local file on error
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  const outputDir = path.join(__dirname, '..', '..', 'public', 'logos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Downloading MDN exact company logos...');

  for (const logo of LOGOS) {
    try {
      console.log(`Fetching ${logo.name} from ${logo.url}...`);
      const filePath = path.join(outputDir, logo.fileName);
      await fetchFile(logo.url, filePath);
      console.log(`Saved ${logo.name} to ${filePath}`);
    } catch (err) {
      console.error(`Error downloading ${logo.name}:`, err.message);
    }
  }
}

main();
