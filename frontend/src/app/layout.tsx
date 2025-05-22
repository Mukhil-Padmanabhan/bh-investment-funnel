import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Berkshire Investment Funnel",
  description: "Public opportunity tracking by Berkshire Hathaway",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <Toaster position="top-right" />
          <div className="px-4 py-6 max-w-6xl mx-auto min-h-screen">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
