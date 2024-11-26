"use client";

import "@/styles/custom.css";
import "@/styles/globals.css";
import "@/styles/emblaCarousel.css";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import createFpsChecker from "@/components/Tool/FpsTrackerTool";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import Script from "next/script";

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
          href="/image/MoviersalsLogo.jpg"
        />
        <Script
          src="/js/fpsTrackerSrc.min.js"
          strategy="afterInteractive" // Load after the page is interactive
        />
      </head>
      <body className={clsx("min-h-screen font-sans antialiased body-customize", fontSans.variable)}>
        <ToastContainer />
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
