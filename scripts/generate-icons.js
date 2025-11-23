// KAUS 앱 아이콘 생성 스크립트
// 이 스크립트는 Node.js 환경에서 실행되어야 합니다
// npm install sharp --save-dev 필요

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = path.join(__dirname, '../public/icons/icon-192x192.svg');
const outputDir = path.join(__dirname, '../public/icons');

// SVG를 PNG로 변환하는 함수
async function generateIcons() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const size of sizes) {
        const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
        
        try {
            await sharp(inputSvg)
                .resize(size, size)
                .png()
                .toFile(outputPath);
            
            console.log(`✅ Generated: icon-${size}x${size}.png`);
        } catch (error) {
            console.error(`❌ Error generating icon-${size}x${size}.png:`, error);
        }
    }
    
    console.log('\n🎉 All icons generated successfully!');
}

// 실행
generateIcons().catch(console.error);

