import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { FloatingWidgetWrapper } from "@/components/ui/gold-calculator";
import { EarlyAccessModal } from "@/components/shared/EarlyAccessModal";
import { RevealObserver } from "@/components/shared/RevealObserver";

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://limovi.in"),
  title: "LIMOVI - India's First 360° Gold Asset Ecosystem",
  description: "Convert your gold into liquidity, luxury experiences, wealth generation, gifting, and instant loans — all from one intelligent platform.",
  openGraph: {
    title: "LIMOVI - India's First 360° Gold Asset Ecosystem",
    description: "Convert your gold into liquidity, luxury experiences, wealth generation, gifting, and instant loans — all from one intelligent platform.",
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
    description: "Convert your gold into liquidity, luxury experiences, wealth generation, gifting, and instant loans.",
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
      "logo": "https://limovi.in/logo.png",
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
    <html lang="en" className={`${onest.variable} ${unbounded.variable}`} suppressHydrationWarning>
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
          <FloatingWidgetWrapper />
          <EarlyAccessModal />
          <RevealObserver />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
