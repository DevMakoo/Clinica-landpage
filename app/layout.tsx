import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { clinic } from "@/data/clinic";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: clinic.name,
    template: `%s | ${clinic.name}`,
  },
  description: clinic.tagline,
  openGraph: {
    title: clinic.name,
    description: clinic.tagline,
    siteName: clinic.name,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
