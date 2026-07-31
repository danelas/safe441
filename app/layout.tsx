import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const SITE_URL = "https://safe441.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fix Broward — Reported. Routed. Tracked. Fixed.",
    template: "%s — Fix Broward",
  },
  description:
    "Fix Broward is a civic-action platform for Broward County: report a local problem, see who is responsible, follow a public timeline, and find out whether it was actually fixed.",
  keywords: [
    "Fix Broward",
    "Broward County",
    "report a problem",
    "civic action",
    "road safety",
    "441 SAFE",
    "US 441 safety",
    "small business help",
    "public accountability",
  ],
  openGraph: {
    title: "Fix Broward — Reported. Routed. Tracked. Fixed.",
    description:
      "Report a local problem, see who is responsible, follow a public timeline, and find out whether it was actually fixed.",
    url: SITE_URL,
    siteName: "Fix Broward",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix Broward",
    description:
      "One problem. One responsible party. One proposed fix. Public follow-through.",
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
