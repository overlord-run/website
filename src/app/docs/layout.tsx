import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DocsSidebar } from "@/components/DocsSidebar";
import { MobileDocsSidebar } from "@/components/MobileDocsSidebar";
import { getDocCategories } from "@/lib/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const categories = getDocCategories();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Nav />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-0">
          {/* Desktop sidebar */}
          <aside className="hidden w-[240px] flex-shrink-0 lg:block">
            <DocsSidebar categories={categories} />
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="py-4 lg:hidden">
              <MobileDocsSidebar categories={categories} />
            </div>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
