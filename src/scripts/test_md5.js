const crypto = require('crypto');

const names = [
  'Budweiser_Anheuser-Busch_logo.svg',
  'Bacardi_-_wordmark_(Cuba,_2013-).svg',
  'Coca-Cola_logo.svg'
];

names.forEach(name => {
  const hash = crypto.createHash('md5').update(name).digest('hex');
  const url = `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash[0]}${hash[1]}/${name}`;
  console.log(`${name} -> ${url}`);
});
