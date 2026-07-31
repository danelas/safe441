import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://safe441.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Broward Forward — Meet Broward. Imagine better. Test ideas. Follow the progress.",
    template: "%s — Broward Forward",
  },
  description:
    "Broward Forward is a local media and community project exploring practical ways to improve life across Broward County — highlighting what already works, listening to the people affected, and testing realistic ideas on a local scale.",
  keywords: [
    "Broward Forward",
    "Broward County",
    "local media",
    "community improvement",
    "civic ideas",
    "A Safer 441",
    "US 441 safety",
    "small business help",
    "local journalism",
  ],
  openGraph: {
    title: "Broward Forward — Meet Broward. Imagine better. Test ideas. Follow the progress.",
    description:
      "A local media and community project exploring practical ways to improve life across Broward County.",
    url: SITE_URL,
    siteName: "Broward Forward",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Broward Forward",
    description:
      "Meet Broward. Imagine better. Test ideas. Follow the progress.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
