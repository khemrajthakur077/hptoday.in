import fs from "fs";
import path from "path";
import process from "process";
import { createClient } from "@supabase/supabase-js";

const baseUrl = process.env.SITE_URL || "https://hptoday.in";
const publicPages = [
  { path: "/", priority: "1.0" },
  { path: "/breaking-news", priority: "0.9" },
  { path: "/jobs", priority: "0.8" },
  { path: "/services", priority: "0.8" },
  { path: "/tourism", priority: "0.7" },
];
const supabaseUrl = "https://vpyjwoprsncmgxkdiqij.supabase.co";
const supabaseAnonKey = "sb_publishable_KcC3MV5XJpEzCk9wdP0KLQ_CRMiUWQM";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const publicDir = path.resolve(process.cwd(), "public");
const distDir = path.resolve(process.cwd(), "dist");

const slugify = (value) => {
  if (!value) return "";
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_–—]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
};

const makeEntry = ({ loc, lastmod, priority }) => `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${priority ? `<priority>${priority}</priority>` : ""}
  </url>`;

const staticUrls = publicPages.map(({ path, priority }) => ({
  loc: `${baseUrl}${path}`,
  lastmod: formatDate(new Date()),
  priority,
}));

const fetchDynamicEntries = async () => {
  const entries = [];
  const seen = new Set();

  const { data: news, error: newsError } = await supabase
    .from("news")
    .select("id,title,created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (newsError) {
    console.warn("⚠️ Could not fetch news for sitemap:", newsError.message);
  } else {
    const newsItems = news ?? [];
    newsItems.forEach((item) => {
      if (!item?.title) return;
      const slug = slugify(item.title);
      if (!slug || seen.has(`news:${slug}`)) return;
      seen.add(`news:${slug}`);
      entries.push({
        loc: `${baseUrl}/news/${slug}`,
        lastmod: formatDate(item.created_at),
        priority: "0.8",
      });
    });
  }

  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id,title,created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (jobsError) {
    console.warn("⚠️ Could not fetch jobs for sitemap:", jobsError.message);
  } else {
    const jobItems = jobs ?? [];
    jobItems.forEach((item) => {
      if (!item?.title) return;
      const slug = slugify(item.title);
      if (!slug || seen.has(`jobs:${slug}`)) return;
      seen.add(`jobs:${slug}`);
      entries.push({
        loc: `${baseUrl}/jobs/${slug}`,
        lastmod: formatDate(item.created_at),
        priority: "0.8",
      });
    });
  }

  return entries;
};

const buildSitemap = (entries) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(makeEntry).join("")}

</urlset>`;

const writeFile = (filename, content) => {
  const targetPath = path.join(publicDir, filename);
  fs.writeFileSync(targetPath, content, "utf8");

  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, filename);
    fs.writeFileSync(distPath, content, "utf8");
  }
};

const writeSitemap = (sitemapXml) => writeFile("sitemap.xml", sitemapXml);

const writeRobotsTxt = () => {
  const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  writeFile("robots.txt", robots);
};

const main = async () => {
  const dynamicEntries = await fetchDynamicEntries();
  const sitemapXml = buildSitemap([...staticUrls, ...dynamicEntries]);
  writeSitemap(sitemapXml);
  writeRobotsTxt();
  console.log(`✅ Sitemap generated with ${staticUrls.length + dynamicEntries.length} URLs and robots.txt updated.`);
};

main().catch((error) => {
  console.error("❌ Sitemap generation failed:", error);
  process.exit(1);
});