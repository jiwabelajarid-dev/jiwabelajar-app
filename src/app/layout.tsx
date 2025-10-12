import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext"; // 👈 import AuthProvider

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
          <AuthProvider> {/* 👈 bungkus semua */}
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
