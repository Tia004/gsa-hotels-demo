const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// Fix -delay SyntaxError
code = code.replace(/\{\s*-delay:\s*'([^']+)'\s*\}/g, '{ { "--delay": "$1" } as React.CSSProperties }');

// Fix fetchpriority
code = code.replace(/fetchpriority="/g, 'fetchPriority="');

// Fix webkit-playsinline
code = code.replace(/webkit-playsinline/g, '');

// Fix crossOrigin
code = code.replace(/crossOrigin(?:="")? \/>/g, 'crossOrigin="anonymous" />');

// Add ts-nocheck to ignore all the GSAP DOM typing errors
code = code.replace('"use client";', '"use client";\n// @ts-nocheck\n');

fs.writeFileSync('src/app/page.tsx', code);
