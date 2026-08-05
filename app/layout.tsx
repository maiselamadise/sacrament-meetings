import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const bodyFont = Nunito_Sans({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Lora({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Springfield Ward Meeting Planner",
  description: "Sacrament meeting agendas for Springfield Ward.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} min-h-screen`}>
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
