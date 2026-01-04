import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

/** Sans-serif font; CSS variable --font-geist-sans. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Monospace font; CSS variable --font-geist-mono. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** SEO and app metadata. */
export const metadata: Metadata = {
  title: "Project Structure Generator",
  description:
    "Developer tooling app to scaffold structured project architectures visually.",
};

/** Wraps all pages with html/body and font class names. */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
