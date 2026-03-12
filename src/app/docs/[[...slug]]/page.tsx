import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getDocPage, getAllDocSlugs, getAdjacentPages, getDocCategories } from "@/lib/docs";
import { MdxContent } from "@/components/MdxContent";
import { TableOfContents } from "@/components/TableOfContents";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return [{ slug: undefined }, ...slugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length !== 2) return {};
  const page = getDocPage(slug);
  if (!page) return {};
  return {
    title: page.meta.title,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  // Handle /docs (no slug) — redirect to first doc page
  if (!slug || slug.length === 0) {
    const categories = getDocCategories();
    if (categories.length > 0 && categories[0].pages.length > 0) {
      redirect(`/docs/${categories[0].slug}/${categories[0].pages[0].slug}`);
    }
    redirect("/");
  }

  if (slug.length !== 2) {
    notFound();
  }

  const page = getDocPage(slug);
  if (!page) {
    notFound();
  }

  const { prev, next } = getAdjacentPages(slug);

  return (
    <div className="flex gap-0">
      {/* Content */}
      <article className="min-w-0 flex-1 py-6 lg:py-8 lg:px-8">
        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-6">
          {page.meta.title}
        </h1>

        <MdxContent source={page.content} />

        {/* Prev / Next navigation */}
        <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] pt-6">
          {prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {next.title}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* Right TOC */}
      <aside className="hidden w-[180px] flex-shrink-0 xl:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
