const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGOS = [
  {
    name: 'Red Bull',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/redbull.svg'
  },
  {
    name: 'Spotify',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/spotify.svg'
  },
  {
    name: 'OnePlus',
    url: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/oneplus.svg'
  },
  {
    name: 'Coca-Cola',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg'
  },
  {
    name: 'Budweiser',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Budweiser_Anheuser-Busch_logo.svg'
  },
  {
    name: 'Bacardi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Bacardi_-_wordmark_(Cuba,_2013-).svg'
  }
];

function fetchUrl(url) {
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
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function main() {
  const outputDir = path.join(__dirname, '..', '..', 'public', 'logos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Downloading company logos...');

  for (const logo of LOGOS) {
    try {
      console.log(`Fetching ${logo.name} from ${logo.url}...`);
      const svgContent = await fetchUrl(logo.url);
      const fileName = `${logo.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`;
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, svgContent, 'utf-8');
      console.log(`Saved ${logo.name} to ${filePath}`);
    } catch (err) {
      console.error(`Error downloading ${logo.name}:`, err.message);
    }
  }
}

main();
