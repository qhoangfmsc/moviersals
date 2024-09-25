import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3 border-t-1 border-indigo-600"
              style={{
                borderTopLeftRadius: "75px",
                borderTopRightRadius: "75px",
              }}>
              <div className="container mx-10 mt-2 mb-8 p-2">
                <div className="w-full flex flex-row">
                  <div className="basis-1/3 hover:basis-1/2 transition-all">
                    <Image
                      width={70}
                      height={70}
                      alt="MoviersalsLogo"
                      src="/MoviersalsLogo.jpg"
                    />
                  </div>
                  <div className="basis-1/3 hover:basis-1/2 transition-all">2</div>
                  <div className="basis-1/3 hover:basis-1/2 transition-all">3</div>
                </div>
                <br />
                <div className="w-full lg:flex lg:flex-row">
                  <div className="basis-1/2 hover:basis-1/2 transition-all">
                    <p>Địa chỉ: 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.Hồ Chí Minh</p>
                    <p>Email: support@moviersals.vn</p>
                    <p>Hotline: +84 123 456 789 (Miễn phí)</p>
                  </div>
                  <div className="basis-1/2 hover:basis-1/2 transition-all">
                    <Image
                      width={200}
                      height={70}
                      alt="MoviersalsLogo"
                      src="/downloadChplay.png"
                    />
                    <Image
                      width={240}
                      height={20}
                      alt="MoviersalsLogo"
                      src="/downloadIos.png"
                    />
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
