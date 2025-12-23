import Footer from "@/components/shared/footer";
import PublicNav from "@/components/shared/public-nav";
import { AuthProvider } from "@/lib/contexts/auth-context";
import ReactQueryProviders from "@/lib/react-query/provider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DeSci NG",
  description: "Decentralized Science Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="4b54eb0f-a700-48c1-b293-cbd68bb9689f"
        ></script>
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ReactQueryProviders>
          <AuthProvider>
            <PublicNav />
            <div className="max-w-6xl mx-auto md:py-8 md:px-0 px-6">
            {children}
            </div>
          </AuthProvider>
        </ReactQueryProviders>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
