import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const headingSizes: Record<number, string> = {
  1: "text-xl font-bold mt-8 mb-4",
  2: "text-lg font-bold mt-8 mb-3",
  3: "text-sm font-semibold mt-6 mb-2",
  4: "text-xs font-semibold mt-4 mb-2",
};

function HeadingBase({ level, children, ...props }: React.ComponentProps<"h1"> & { level: number }) {
  const id = props.id || slugify(String(children));
  const className = `${headingSizes[level] || ""} text-[var(--text-primary)] group scroll-mt-20`;
  const anchor = (
    <a
      href={`#${id}`}
      className="ml-2 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
      aria-label={`Link to ${children}`}
    >
      #
    </a>
  );

  switch (level) {
    case 1: return <h1 id={id} className={className}>{children}{anchor}</h1>;
    case 2: return <h2 id={id} className={className}>{children}{anchor}</h2>;
    case 3: return <h3 id={id} className={className}>{children}{anchor}</h3>;
    case 4: return <h4 id={id} className={className}>{children}{anchor}</h4>;
    default: return <h2 id={id} className={className}>{children}{anchor}</h2>;
  }
}

function createHeading(level: number) {
  return function HeadingComponent(props: React.ComponentProps<"h1">) {
    return <HeadingBase level={level} {...props} />;
  };
}

function Pre({ children, ...props }: React.ComponentProps<"pre">) {
  // Extract text content from pre for copy
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (node && typeof node === "object" && "props" in node) {
      return getTextContent((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
    }
    return "";
  };

  const text = getTextContent(children);

  return (
    <div className="group relative my-4">
      <pre
        className="overflow-x-auto rounded-[4px] border border-[var(--border)] bg-[var(--bg-input)] p-4 text-xs leading-relaxed"
        {...props}
      >
        {children}
      </pre>
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton text={text} />
      </div>
    </div>
  );
}

function InlineCode({ children, ...props }: React.ComponentProps<"code">) {
  // If inside a pre (handled by rehype-pretty-code), don't add inline styling
  if (typeof children === "object") {
    return <code {...props}>{children}</code>;
  }
  return (
    <code
      className="rounded-[4px] bg-[var(--bg-input)] px-1.5 py-0.5 text-xs text-[var(--accent)]"
      {...props}
    >
      {children}
    </code>
  );
}

function Table({ children, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-xs" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className="border-b border-[var(--border)] px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]"
      {...props}
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: React.ComponentProps<"td">) {
  return (
    <td className="border-b border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]" {...props}>
      {children}
    </td>
  );
}

function Anchor({ children, href, ...props }: React.ComponentProps<"a">) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      className="text-[var(--accent)] hover:underline"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-3 text-xs leading-relaxed text-[var(--text-secondary)]" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-3 ml-4 list-disc space-y-1 text-xs text-[var(--text-secondary)]" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-3 ml-4 list-decimal space-y-1 text-xs text-[var(--text-secondary)]" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  pre: Pre,
  code: InlineCode,
  table: Table,
  th: Th,
  td: Td,
  a: Anchor,
  hr: () => <hr className="my-6 border-[var(--border)]" />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="my-4 border-l-2 border-[var(--border)] pl-4 text-xs text-[var(--text-muted)]" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-[var(--text-primary)]" {...props} />
  ),
  Callout,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div data-mdx-content>
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: "github-dark-default",
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
