import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import QueryClientWrapper from "@/components/query-client-wrapper";
import "./globals.css";
import ClientSideLogo from '@/components/client-side-logo';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Almanet",
  description: "The fastest way to connect with your college mates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300 ease-in-out">
              <nav className="w-full border-b border-b-foreground/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                      <ClientSideLogo />
                    </div>
                    <div className="flex items-center space-x-4">
                       <HeaderAuth />
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </nav>
            </header>

            <main className="flex-grow">
              <QueryClientWrapper>
                <div className="">
                  {children}
                </div>
              </QueryClientWrapper>
            </main>

            <footer className="bg-background/80 backdrop-blur-sm border-t border-t-foreground/10 transition-all duration-300 ease-in-out">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p className="text-sm text-foreground/70">
                    Powered by{" "}
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold hover:underline bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      NP COMPLETE
                    </a>
                  </p>
                  <div className="flex items-center space-x-4">
                    <Link href="/privacy" className="text-sm hover:underline">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-sm hover:underline">
                      Terms of Service
                    </Link>
                    {/* <DeployButton /> */}
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}