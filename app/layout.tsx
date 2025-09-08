import Footer from "@/components/shared/footer";
import { AuthProvider } from "@/lib/contexts/auth-context";
import ReactQueryProviders from "@/lib/react-query/provider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

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
      <body className={`${spaceGrotesk.className} antialiased`}>
        <AuthProvider>
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
