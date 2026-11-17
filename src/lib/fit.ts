/**
 * Büyük harfli Archivo 900 başlıklarının en uzun kelimesinin genişliği (em).
 * Başlık yazı boyutu "min(istenen boyut, kap genişliği / bu değer)" olur;
 * böylece uzun Türkçe kelimeler (ör. BELGELİYORUM, BİYOTEKNOLOJİ) asla ortadan bölünmez.
 */
import adv from '../data/archivo-adv.json';

type Table = Record<string, number>;
const W100 = adv.w100 as Table;
const W80 = adv.w80 as Table;

export function widestWord(text: string, lang: 'en' | 'tr', letterSpacing: number, narrow = false): number {
  const table = narrow ? W80 : W100;
  let max = 0;
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const up = lang === 'tr' ? word.toLocaleUpperCase('tr') : word.toUpperCase();
    let w = 0;
    let n = 0;
    for (const ch of up) {
      w += table[ch] ?? (narrow ? 0.7 : 0.85);
      n++;
    }
    max = Math.max(max, w + n * letterSpacing);
  }
  return Math.round(max * 1.03 * 1000) / 1000; // %3 pay
}
