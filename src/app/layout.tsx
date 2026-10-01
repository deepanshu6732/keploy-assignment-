import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keploy Quickstart: Go Tutorial",
  description: "A beginner-friendly tutorial on how to use Keploy with a Go application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
            <div className="container mx-auto max-w-4xl px-4 flex h-16 items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <span className="text-orange-500">Keploy</span> Docs
              </div>
              <div className="flex items-center gap-4">
                <nav className="text-sm font-medium space-x-4 hidden sm:block text-slate-600 dark:text-slate-400">
                  <a href="https://keploy.io/docs/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Official Docs</a>
                  <a href="https://github.com/keploy/keploy" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 container mx-auto max-w-4xl px-4 py-8 prose prose-slate dark:prose-invert prose-headings:font-bold prose-a:text-orange-500 hover:prose-a:text-orange-600 max-w-none">
            {children}
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-800 py-6 mt-12">
            <div className="container mx-auto max-w-4xl px-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Built with Next.js, MDX, and Tailwind CSS.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
