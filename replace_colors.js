const fs = require('fs');
const path = './src/pages/GogoMall.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/pink-500/g, 'stone-800');
content = content.replace(/rose-500/g, 'stone-900');
content = content.replace(/pink-600/g, 'stone-900');
content = content.replace(/rose-600/g, 'black');
content = content.replace(/pink-900\/70/g, 'stone-600');
content = content.replace(/pink-50\/50/g, 'stone-50');
content = content.replace(/pink-50/g, 'stone-100');
content = content.replace(/pink-100/g, 'stone-200');
content = content.replace(/pink-200/g, 'stone-300');
content = content.replace(/pink-300/g, 'stone-400');
content = content.replace(/pink-400/g, 'stone-500');

fs.writeFileSync(path, content);
console.log('Replaced colors in GogoMall.tsx');
