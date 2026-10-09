import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/content/profile";
import { indexable, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s · ${profile.name}` },
  description: siteDescription,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  // Google Search Console ownership (URL-prefix property https://shahwaiz.me/). Keep it, or verification lapses.
  verification: { google: "mjdOSAagRrtYKGrvfw8yqiTKU6l_5UvNOgUG8qqveao" },
};

export const viewport: Viewport = {
  themeColor: "#111318",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: profile.positioning,
  address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Management and Technology" },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader name={profile.name} />
        <main id="main" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
