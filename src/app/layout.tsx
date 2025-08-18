"use client";
import "./globals.css";
import HeaderPage from "@/components/header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
       <SessionProvider>
         <div className="container mx-auto max-w-7xl" >
          <HeaderPage/>
          {children}
        </div>
       </SessionProvider>
      </body>
    </html>
  );
}
