import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Mad Tea Lab — Take a Seat at the Table",
    template: "%s · The Mad Tea Lab",
  },
  description:
    "Tell us how you take your tea. Every drinker has their own perfect shade — pick yours, and join the gallery.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Mad Tea Lab",
    title: "The Mad Tea Lab — Take a Seat at the Table",
    description:
      "Tell us how you take your tea. Every drinker has their own perfect shade — pick yours, and join the gallery.",
    images: [
      {
        url: `${SITE_URL}/og`,
        width: 1200,
        height: 630,
        alt: "An illustrated teapot at the Mad Tea Lab — tell us how you take your tea.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Mad Tea Lab",
    description:
      "Tell us how you take your tea. Pick your shade, join the gallery.",
    images: [`${SITE_URL}/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${garamond.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
