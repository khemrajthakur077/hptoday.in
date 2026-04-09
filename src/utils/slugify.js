export const slugify = (value) => {
  if (!value) return '';
  
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    // Naya tarika: Accents/Diacritics hatane ke liye
    .replace(/\p{Diacritic}/gu, '') 
    .replace(/[\s_–—]+/g, '-')
    // Naya tarika: Sirf a-z, 0-9, Hindi (Devanagari) aur dash ko allow karega
    .replace(/[^a-z0-9\p{Script=Devanagari}-]/gu, '') 
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};