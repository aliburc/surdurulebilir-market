import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sürdürülebilir Market — Sürdürülebilir Ambalaj Tedarik Platformu",
  description:
    "Türkiye'deki markalar ve sürdürülebilir ambalaj tedarikçilerini tek platformda buluşturan B2B pazar yeri.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  const panelHref = session?.role === "BUYER" ? "/panel/alici" : "/panel/tedarikci";

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar isLoggedIn={!!session} panelHref={panelHref} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
