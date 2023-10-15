import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren;

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen  font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
