import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react"; // ✅ Import ReactNode
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "@/components/home/header/navbar";
import { BlogFooter } from "@/components/home/blog-footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LuminText",
  description: "Create,Post and Read Articles with LuminText",
  icons:{
    
  }
};

// ✅ Add type annotation for children
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
            {children}
            <BlogFooter/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
}
