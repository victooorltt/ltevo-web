import fs from "node:fs";
import path from "node:path";

/** Dimensions from local image headers; unknown formats omit dimensions. */
export function imageDimensions(src?: string): { width: number; height: number } | undefined {
  if (!src?.startsWith("/")) return;
  const file = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(file)) return;
  const b = fs.readFileSync(file);
  if (b.length < 30) return;
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const tag = b.toString("ascii", 12, 16);
    if (tag === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (tag === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (tag === "VP8L") { const n = b.readUInt32LE(21); return { width: (n & 0x3fff) + 1, height: ((n >> 14) & 0x3fff) + 1 }; }
  }
  if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    let index = 2;
    while (index < b.length - 9) {
      if (b[index] !== 0xff) { index++; continue; }
      const marker = b[index + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { height: b.readUInt16BE(index + 5), width: b.readUInt16BE(index + 7) };
      const length = b.readUInt16BE(index + 2);
      if (length < 2) return;
      index += 2 + length;
    }
  }
}
