import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

export interface DocMeta {
  title: string;
  order: number;
  slug: string;
}

export interface CategoryMeta {
  title: string;
  order: number;
  slug: string;
  pages: DocMeta[];
}

export interface DocPage {
  content: string;
  meta: {
    title: string;
    order: number;
  };
  slug: string[];
}

function readMeta(dir: string): { title: string; order: number } {
  const metaPath = path.join(dir, "_meta.json");
  if (fs.existsSync(metaPath)) {
    return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  }
  return { title: path.basename(dir), order: 999 };
}

export function getDocCategories(): CategoryMeta[] {
  const categories: CategoryMeta[] = [];

  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;

    const catDir = path.join(CONTENT_DIR, dir.name);
    const catMeta = readMeta(catDir);

    const pages: DocMeta[] = [];
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(catDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      pages.push({
        title: data.title || file.replace(".mdx", ""),
        order: data.order ?? 999,
        slug: file.replace(".mdx", ""),
      });
    }

    pages.sort((a, b) => a.order - b.order);

    categories.push({
      title: catMeta.title,
      order: catMeta.order,
      slug: dir.name,
      pages,
    });
  }

  categories.sort((a, b) => a.order - b.order);
  return categories;
}

export function getDocPage(slugParts: string[]): DocPage | null {
  if (slugParts.length !== 2) return null;
  const [category, page] = slugParts;
  const filePath = path.join(CONTENT_DIR, category, `${page}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  return {
    content,
    meta: {
      title: data.title || page,
      order: data.order ?? 999,
    },
    slug: slugParts,
  };
}

export function getAllDocSlugs(): string[][] {
  const categories = getDocCategories();
  const slugs: string[][] = [];

  for (const cat of categories) {
    for (const page of cat.pages) {
      slugs.push([cat.slug, page.slug]);
    }
  }

  return slugs;
}

export function getAdjacentPages(
  currentSlug: string[]
): { prev: { title: string; href: string } | null; next: { title: string; href: string } | null } {
  const categories = getDocCategories();
  const flat: { title: string; href: string }[] = [];

  for (const cat of categories) {
    for (const page of cat.pages) {
      flat.push({
        title: page.title,
        href: `/docs/${cat.slug}/${page.slug}`,
      });
    }
  }

  const currentHref = `/docs/${currentSlug.join("/")}`;
  const idx = flat.findIndex((p) => p.href === currentHref);

  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
