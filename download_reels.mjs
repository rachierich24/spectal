import ig from 'instagram-url-direct';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);
const instagramGetUrl = ig.instagramGetUrl;

const links = [
  "https://www.instagram.com/reel/DYpOev-IoD4/",
  "https://www.instagram.com/reel/DW82kJcE29p/",
  "https://www.instagram.com/reel/DOGurP4D5YI/",
  "https://www.instagram.com/reel/DNqNglJo_gR/"
];

async function main() {
  for (let i = 0; i < links.length; i++) {
    try {
      console.log(`Fetching metadata for Reel ${i + 1}... (${links[i]})`);
      const result = await instagramGetUrl(links[i]);
      if (result && result.url_list && result.url_list.length > 0) {
        const mp4Url = result.url_list[0];
        console.log(`Downloading Reel ${i + 1} from ${mp4Url.substring(0, 50)}...`);
        await execAsync(`curl -L -s -o public/real_reel_${i + 1}.mp4 "${mp4Url}"`);
        console.log(`Reel ${i + 1} downloaded successfully!`);
      } else {
        console.log(`Could not fetch Reel ${i + 1}. Result:`, result);
      }
    } catch (e) {
      console.error(`Error with Reel ${i + 1}:`, e.message);
    }
  }
}

main();
