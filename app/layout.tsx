import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://safe441.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Safe 441 — A safer 441 starts with one coordinated plan",
  description:
    "Safe 441 is a nonpartisan community effort seeking practical, measurable safety improvements along US 441 between Sheridan Street and Griffin Road in Broward County.",
  keywords: [
    "Safe 441",
    "US 441 safety",
    "Broward County road safety",
    "Road Safety Audit",
    "pedestrian safety",
    "Hollywood",
    "Davie",
  ],
  openGraph: {
    title: "Safe 441 — A safer 441 starts with one coordinated plan",
    description:
      "A nonpartisan community effort for practical, measurable safety improvements along US 441 in central Broward County.",
    url: SITE_URL,
    siteName: "Safe 441",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe 441",
    description:
      "A nonpartisan community effort for a safer US 441 in central Broward County.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
