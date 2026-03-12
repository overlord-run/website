import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

export interface SearchEntry {
  title: string;
  href: string;
  category: string;
  /** Plain text content (markdown stripped) for search matching */
  body: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")       // code blocks
    .replace(/`[^`]*`/g, " ")              // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links
    .replace(/<[^>]+>/g, " ")              // html tags
    .replace(/#{1,6}\s/g, " ")             // headings
    .replace(/[*_~|>-]/g, " ")            // formatting
    .replace(/\s+/g, " ")                  // collapse whitespace
    .trim();
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;

    const catDir = path.join(CONTENT_DIR, dir.name);
    const metaPath = path.join(catDir, "_meta.json");
    let catTitle = dir.name;
    if (fs.existsSync(metaPath)) {
      catTitle = JSON.parse(fs.readFileSync(metaPath, "utf-8")).title || dir.name;
    }

    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const filePath = path.join(catDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(raw);
      const slug = file.replace(".mdx", "");

      entries.push({
        title: data.title || slug,
        href: `/docs/${dir.name}/${slug}`,
        category: catTitle,
        body: stripMarkdown(content).slice(0, 2000), // cap per entry
      });
    }
  }

  return entries;
}
