import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen  font-sans antialiased", fontSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
