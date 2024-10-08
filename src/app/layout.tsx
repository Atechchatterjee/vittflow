import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import TanstackQueryProvider from "./tanstack-query-provider";

export const metadata: Metadata = {
  title: "VittFlow",
  description: "The open source platform to manage your finance",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <TanstackQueryProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>{children}</body>
        </html>
      </TanstackQueryProvider>
    </ClerkProvider>
  );
}
