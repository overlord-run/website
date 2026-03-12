import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "overlord — ai agent fleet management",
    template: "%s | overlord",
  },
  description:
    "orchestrate ai coding agents across your entire fleet. create tasks, watch them execute in real time, and merge the results.",
  metadataBase: new URL("https://overlord.run"),
  openGraph: {
    title: "overlord — ai agent fleet management",
    description:
      "orchestrate ai coding agents across your entire fleet. create tasks, watch them execute in real time, and merge the results.",
    url: "https://overlord.run",
    siteName: "overlord",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "overlord — ai agent fleet management",
    description:
      "orchestrate ai coding agents across your entire fleet. create tasks, watch them execute in real time, and merge the results.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
