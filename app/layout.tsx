import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desci NG",
  description: "Decentralized Science",
};


// const spaceGrotesk = localFont({
//   src: [
//     {
//       path: '../public/fonts/space-grotesk/SpaceGrotesk-Bold.ttf',
//       weight: '700',
//       style: 'bold',
//     },

//     {
//       path: '../public/fonts/space-grotesk/SpaceGrotesk-Regular.ttf',
//       weight: '400',
//       style: 'regular',
//     },
//     {
//       path: '../public/fonts/ESRebondGrotesque/ESRebondGrotesqueTRIAL-Extrabold-BF661890400e032.otf',
//       weight: '900',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/ESRebondGrotesque/ESRebondGrotesqueTRIAL-ExtraboldItalic-BF6618903f81f73.otf',
//       weight: '900',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/ESRebondGrotesque/ESRebondGrotesqueTRIAL-Extralight-BF6618904107ccc.otf',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/ESRebondGrotesque/ESRebondGrotesqueTRIAL-ExtralightItalic-BF66189041219b7.otf',
//       weight: '300',
//       style: 'italic',
//     },
//     {
//       path: '../public/fonts/ESRebondGrotesque/ESRebondGrotesqueTRIAL-Semibold-BF66189040640ea.otf',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-es-rebond-grotesque',
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
