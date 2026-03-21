import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intent Trading | @samdevrel",
  description: "Intent-based DEX trading with solver competition and MEV protection. CoW Protocol style.",
  keywords: ["intent", "trading", "CoW", "solver", "MEV", "DEX", "batch-auction"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
