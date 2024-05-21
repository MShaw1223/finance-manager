import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Figtree } from "next/font/google";

export const metadata = {
  title: "Finance Manager",
};

const FT = Figtree({ subsets: ["latin"], display: "swap" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={FT.className} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
