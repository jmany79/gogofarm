const fs = require('fs');
const path = './src/components/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/bg-gradient-to-r from-pink-500 to-rose-500/g, 'bg-white border border-stone-200');
content = content.replace(/hover:from-pink-600 hover:to-rose-600/g, 'hover:bg-stone-50');
content = content.replace(/text-white font-extrabold text-lg drop-shadow-sm/g, 'text-stone-800 font-extrabold text-lg');

fs.writeFileSync(path, content);
console.log('Replaced colors in Header.tsx');
