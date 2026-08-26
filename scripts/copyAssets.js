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

  // Copy certificates folder
  const certSrc = path.join(publicDir, 'certficates');
  const certDest = path.join(distDir, 'certficates');
  copyDir(certSrc, certDest);

  // Copy resume files
  const resumes = ['Adhi_Vignesh_Resume.pdf', 'MY-RESUME-01.pdf', 'Resume-1.pdf'];
  for (const pdf of resumes) {
    const srcPdf = path.join(publicDir, pdf);
    const destPdf = path.join(distDir, pdf);
    if (fs.existsSync(srcPdf)) {
      fs.copyFileSync(srcPdf, destPdf);
    }
  }

  // Copy favicon
  const favSrc = path.join(publicDir, 'favicon.svg');
  if (fs.existsSync(favSrc)) {
    fs.copyFileSync(favSrc, path.join(distDir, 'favicon.svg'));
    fs.copyFileSync(favSrc, path.join(distDir, 'favicon.ico'));
  }

  console.log('✅ Postbuild asset synchronization complete: Certificates, Favicons & PDFs copied to dist!');
} catch (err) {
  console.error('⚠️ Postbuild copyAssets warning:', err.message);
}
