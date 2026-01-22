import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text";

const TwitterSvg = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 sm:w-7 sm:h-7 md:w-6 md:h-6 transition-all duration-300 group-hover:fill-current group-hover:text-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>X</title>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
};

const LinkedInSvg = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 sm:w-7 sm:h-7 md:w-6 md:h-6 transition-all duration-300 group-hover:fill-current group-hover:text-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.047c.477-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.063.925 2.063 2.063 0 1.139-.923 2.065-2.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
};

const InstagramSvg = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 sm:w-7 sm:h-7 md:w-6 md:h-6 transition-all duration-300 group-hover:fill-current group-hover:text-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Instagram</title>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.264 2.242 1.325 3.608.058 1.266.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.264-3.608 1.325-1.266.058-1.645.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.264-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608C4.533 2.513 5.8 2.224 7.166 2.163 8.432 2.105 8.812 2.163 12 2.163m0-2.163C8.741 0 8.332.013 7.052.072 5.78.13 4.602.443 3.635 1.41 2.668 2.377 2.355 3.555 2.297 4.827.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.058 1.272.371 2.45 1.338 3.417.967.967 2.145 1.28 3.417 1.338C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.272-.058 2.45-.371 3.417-1.338.967-.967 1.28-2.145 1.338-3.417C23.987 15.668 24 15.259 24 12s-.013-3.668-.072-4.948c-.058-1.272-.371-2.45-1.338-3.417C20.55.443 19.372.13 18.1.072 16.82.013 16.411 0 12 0z" />
      <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
      <circle cx="18.406" cy="5.594" r="1.44" />
    </svg>
  );
};
const TikTokSvg = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 sm:w-7 sm:h-7 md:w-6 md:h-6 transition-all duration-300 group-hover:fill-current group-hover:text-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>TikTok</title>
      <path
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
};

const YouTubeSvg = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4 sm:w-7 sm:h-7 md:w-6 md:h-6 transition-all duration-300 group-hover:fill-current group-hover:text-primary"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>YouTube</title>
      <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.116C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.388.57a2.997 2.997 0 0 0-2.11 2.116A31.24 31.24 0 0 0 0 12a31.24 31.24 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.11 2.116c1.93.57 9.388.57 9.388.57s7.458 0 9.388-.57a2.997 2.997 0 0 0 2.11-2.116A31.24 31.24 0 0 0 24 12a31.24 31.24 0 0 0-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
    </svg>
  );
};

const socials = [
  { href: "https://x.com/nubianresearch_", icon: <TwitterSvg />, label: "X" },
  {
    href: "https://www.linkedin.com/company/nubianresearch",
    icon: <LinkedInSvg />,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/nubianresearch",
    icon: <InstagramSvg />,
    label: "Instagram",
  },
  {
    href: "http://tiktok.com/@nubianresearch",
    icon: <TikTokSvg />,
    label: "TikTok",
  },
  {
    href: "https://www.youtube.com/@nubianresearch",
    icon: <YouTubeSvg />,
    label: "YouTube",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and About */}
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Image
              src="/assets/nubian-logo.png"
              alt="logo"
              width={130}
              height={100}
              className="mb-2"
            />
          </Link>
          <Text size="xs" className="text-gray-500">
            Nubian/Paper Trail Society is a platform for research, dialogue, and
            discovery.
          </Text>
        </div>

        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us">
                <Text
                  size="xs"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Text>
              </Link>
            </li>
            <li>
              <Link href="/how-to-upload-a-paper">
                <Text
                  size="xs"
                  className="hover:text-primary transition-colors"
                >
                  How to upload a paper
                </Text>
              </Link>
            </li>
            <li>
              <a href="mailto:info.nubianresearch@gmail.com">
                <Text
                  size="xs"
                  className="hover:text-primary transition-colors"
                >
                  Contact us
                </Text>
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group text-gray-500 hover:text-primary text-xl transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <Text
            size="xs"
            className="text-gray-400 mt-4 md:mt-8 text-center md:text-right"
          >
            &copy; {new Date().getFullYear()} Nubian/Paper Trail Society.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
