const fs = require('fs');
const path = require('path');

function getPaths(content) {
  const paths = [];
  let index = 0;
  while (true) {
    // Look for d=" with space or newline before it
    const dStart = content.indexOf('d="', index);
    if (dStart === -1) break;
    
    // Check if it's actually the d attribute (preceded by whitespace or tag name)
    const prevChar = content[dStart - 1];
    if (prevChar === ' ' || prevChar === '\n' || prevChar === '\r' || prevChar === '\t') {
      const dEnd = content.indexOf('"', dStart + 3);
      if (dEnd === -1) break;
      const dVal = content.substring(dStart + 3, dEnd).trim();
      
      // Ignore clip paths (usually viewport bounds)
      if (!dVal.includes('1920 V 1080') && !dVal.includes('1920 h 1920') && !dVal.includes('H 1920')) {
        paths.push(dVal);
      }
      index = dEnd + 1;
    } else {
      index = dStart + 3;
    }
  }
  return paths;
}

function cleanSvg(content, name) {
  // Extract viewBox
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  const paths = getPaths(content);
  let pathJsx = '';

  if (name === 'Budweiser') {
    // For Budweiser, paths[0] is the shield (fill #dc0019) and paths[1] is the text (fill #ffffff)
    if (paths.length >= 2) {
      pathJsx = `<path d="${paths[0]}" fill="currentColor" className="opacity-20" />\n        <path d="${paths[1]}" fill="currentColor" fillRule="evenodd" />`;
    } else if (paths.length === 1) {
      pathJsx = `<path d="${paths[0]}" fill="currentColor" fillRule="evenodd" />`;
    }
  } else if (name === 'Bacardi') {
    if (paths.length > 0) {
      pathJsx = `<path d="${paths[0]}" fill="currentColor" fillRule="evenodd" />`;
    }
  } else {
    // General case: combine all paths
    pathJsx = paths.map(d => `<path d="${d}" fill="currentColor" fillRule="evenodd" />`).join('\n        ');
  }

  return {
    viewBox,
    paths: pathJsx.trim()
  };
}

function main() {
  const logosDir = path.join(__dirname, '..', '..', 'public', 'logos');
  const files = {
    'Red Bull': 'redbull.svg',
    'Spotify': 'spotify.svg',
    'OnePlus': 'oneplus.svg',
    'Coca-Cola': 'cocacola.svg',
    'Budweiser': 'budweiser.svg',
    'Bacardi': 'bacardi.svg'
  };

  let componentContent = `import React from "react";

// Premium monochrome company logo SVGs clean and optimized for responsive UI
export const CLIENT_LOGOS = [
`;

  for (const [name, fileName] of Object.entries(files)) {
    const filePath = path.join(logosDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const { viewBox, paths } = cleanSvg(content, name);

    // Set specific display dimensions for custom logos to align their visual weight
    let heightClass = "h-5";
    if (name === 'Coca-Cola') heightClass = "h-6";
    if (name === 'Budweiser') heightClass = "h-5";
    if (name === 'Bacardi') heightClass = "h-4";

    componentContent += `  {
    name: "${name}",
    svg: (
      <svg className="${heightClass} w-auto fill-current" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
        ${paths}
      </svg>
    )
  },\n`;
  }

  componentContent += `];\n`;

  const outputPath = path.join(__dirname, '..', 'components', 'ui', 'ClientLogos.tsx');
  fs.writeFileSync(outputPath, componentContent, 'utf-8');
  console.log(`Successfully generated ClientLogos component at ${outputPath}`);
}

main();
