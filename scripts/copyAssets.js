const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const distDir = path.resolve(__dirname, '../dist');
  const publicDir = path.resolve(__dirname, '../public');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy images folder
  copyDir(path.join(publicDir, 'images'), path.join(distDir, 'images'));

  // Copy certificates folder
  copyDir(path.join(publicDir, 'certficates'), path.join(distDir, 'certficates'));

  // Copy music folder
  copyDir(path.join(publicDir, 'music'), path.join(distDir, 'music'));

  // Copy resume files
  const resumes = ['Adhi_Vignesh_Resume.pdf', 'MY-RESUME-01.pdf', 'Resume-1.pdf'];
  for (const pdf of resumes) {
    const srcPdf = path.join(publicDir, pdf);
    const destPdf = path.join(distDir, pdf);
    if (fs.existsSync(srcPdf)) {
      fs.copyFileSync(srcPdf, destPdf);
    }
  }

  // Copy favicons
  const favFiles = ['favicon.svg', 'favicon.ico', 'favicon-32x32.png', 'apple-touch-icon.png'];
  for (const fav of favFiles) {
    const srcFav = path.join(publicDir, fav);
    const destFav = path.join(distDir, fav);
    if (fs.existsSync(srcFav)) {
      fs.copyFileSync(srcFav, destFav);
    }
  }

  console.log('✅ Postbuild asset synchronization complete: Certificates, Music, Favicons & PDFs copied to dist!');
} catch (err) {
  console.error('⚠️ Postbuild copyAssets warning:', err.message);
}
