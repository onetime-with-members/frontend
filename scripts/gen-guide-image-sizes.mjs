// public/images/guide/**/*.{png,jpg} 의 픽셀 크기를 헤더에서 읽어
// src/features/guide/generated/image-sizes.json 을 생성합니다.
// (의존성 0 — 시그니처로 PNG/JPEG 분기. 일부 파일은 확장자가 .png여도 실제 JPEG라 내용으로 판별)
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { extname, join, relative, sep } from 'path';

const IMAGE_ROOT = 'public/images/guide';
const OUT_DIR = 'src/features/guide/generated';
const OUT_FILE = join(OUT_DIR, 'image-sizes.json');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (['.png', '.jpg', '.jpeg'].includes(extname(entry).toLowerCase()))
      out.push(full);
  }
  return out;
}

function pngSize(buf) {
  // PNG signature(8) + IHDR length(4) + "IHDR"(4) → width@16, height@20 (BE)
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  // SOFn 마커(0xFFC0~CF, C4/C8/CC 제외)의 segment: precision(1) + height(2) + width(2)
  let i = 2; // skip SOI(FFD8)
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    }
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2; // standalone 마커(길이 없음)
      continue;
    }
    i += 2 + buf.readUInt16BE(i + 2); // 다음 세그먼트로
  }
  throw new Error('JPEG SOF 마커를 찾지 못함');
}

function imageSize(file, buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return pngSize(buf); // PNG
  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf); // JPEG
  throw new Error(`지원하지 않는 이미지 포맷: ${file}`);
}

const sizes = {};
for (const file of walk(IMAGE_ROOT).sort()) {
  const urlPath = '/' + relative('public', file).split(sep).join('/');
  sizes[urlPath] = imageSize(file, readFileSync(file));
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(sizes, null, 2) + '\n');
console.log(`generated ${OUT_FILE} (${Object.keys(sizes).length} images)`);
