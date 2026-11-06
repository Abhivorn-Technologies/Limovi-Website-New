import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { EarlyAccessModal } from "@/components/shared/EarlyAccessModal";
import { RevealObserver } from "@/components/shared/RevealObserver";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400","500","600","700"],
});

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700","800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://limovi.in"),
  title: "LIMOVI - India's First 360° Gold Asset Ecosystem",
  description: "One Gold Balance to experience jewellery, apply for a gold loan through a lending partner, sell gold, earn an Owner Benefit and gift gold.",
  openGraph: {
    title: "LIMOVI - India's First 360° Gold Asset Ecosystem",
    description: "One Gold Balance to experience jewellery, apply for a gold loan through a lending partner, sell gold, earn an Owner Benefit and gift gold.",
    url: "https://limovi.in",
    siteName: "LIMOVI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LIMOVI - Intelligent Gold Ecosystem",
    description: "One Gold Balance to experience jewellery, apply for a gold loan through a lending partner, sell gold, earn an Owner Benefit and gift gold.",
    creator: "@limovi_in",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://limovi.in/#organization",
      "name": "LIMOVI",
      "url": "https://limovi.in",
      "logo": "https://limovi.in/Limovi-clean.png",
      "sameAs": [
        "https://twitter.com/limovi_in",
        "https://www.linkedin.com/company/limovi"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://limovi.in/#website",
      "url": "https://limovi.in",
      "name": "LIMOVI",
      "publisher": {
        "@id": "https://limovi.in/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

      </head>
      <body className="font-sans antialiased overflow-x-clip">
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
          <EarlyAccessModal />
          <RevealObserver />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
