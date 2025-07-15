import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/contexts/auth-provider";
import { APP_CONFIG } from "@/lib/configs/app";
import { swrConfig } from "@/lib/configs/swr";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora } from "next/font/google";
import { SWRConfig } from "swr";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} [--header-height:calc(--spacing(14))] antialiased`}
      >
        <ThemeProvider defaultTheme="dark">
          <SWRConfig value={swrConfig}>
            <AuthProvider>
              {children}
              <Toaster position="top-center" richColors />
            </AuthProvider>
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
