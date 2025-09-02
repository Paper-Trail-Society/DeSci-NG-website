import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/lib/react-query/provider";


const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

console.log({spaceGrotesk})

export const metadata: Metadata = {
  title: "Desci NG",
  description: "Decentralized Science",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased`}
      >
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}

