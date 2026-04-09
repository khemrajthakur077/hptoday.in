from pathlib import Path
import re

files = [
    Path('src/pages/NewsDetail.jsx'),
    Path('src/pages/BreakingNews.jsx'),
    Path('src/pages/home.jsx'),
]

replacement = '''const slugify = (value) => {
  if (!value) return '';
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_–—]+/g, '-')
    .replace(/[^\w\u0900-\u097F-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};'''

pattern = re.compile(r"const slugify = \(value\) => \{[\s\S]*?\n\};")

for path in files:
    text = path.read_text(encoding='utf-8')
    new_text, count = pattern.subn(replacement, text, count=1)
    if count != 1:
        raise SystemExit(f'Failed to replace in {path}: replaced {count} occurrences')
    path.write_text(new_text, encoding='utf-8')
    print('Updated', path)
