"use client";

import "@/styles/custom.css";
import "@/styles/globals.css";
import "@/styles/emblaCarousel.css";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import createFpsChecker from "@/components/Tool/FpsCheckerTool";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // FPS Checker
    createFpsChecker();
  }, []);

  return (
    <html
      suppressHydrationWarning
      lang="en">
      <head>
        <title>Moviersals | Vũ trụ điện ảnh</title>
        <meta
          name="description"
          content="Vũ trụ điện ảnh"
        />
        <link
          rel="icon"
          href="/MoviersalsLogo.jpg"
        />
      </head>
      <body className={clsx("min-h-screen font-sans antialiased body-customize", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            {/* MAIN PAGE */}
            <main className="flex-grow">{children}</main>
            {/*  */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
