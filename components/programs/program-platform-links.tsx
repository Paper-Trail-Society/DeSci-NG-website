import Link from "next/link";

export interface ProgramPlatformLink {
  href: string;
  platform: "apple" | "spotify" | "youtubeMusic";
}

interface ProgramPlatformLinksProps {
  links: ProgramPlatformLink[];
}

const iconClassName = "h-4 w-4";

const ApplePodcastIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="8.2" r="1.4" fill="currentColor" />
      <path
        d="M12 10.8a2.75 2.75 0 0 0-2.75 2.75v.15c0 1.01.55 1.94 1.43 2.42l-.7 2.29a.9.9 0 1 0 1.72.52l.3-.99.3.99a.9.9 0 1 0 1.72-.52l-.7-2.29A2.76 2.76 0 0 0 14.75 13.7v-.15A2.75 2.75 0 0 0 12 10.8Z"
        fill="currentColor"
      />
      <path
        d="M7.9 12a4.1 4.1 0 0 1 1.64-3.28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.1 12a4.1 4.1 0 0 0-1.64-3.28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const SpotifyIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.1 10.1c2.47-.68 5.29-.54 7.74.44"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.8 12.8c1.94-.47 4.12-.35 5.98.39"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9.6 15.3c1.37-.27 2.87-.17 4.18.31"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const YouTubeMusicIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M11 10.1v4.1l3.3-2.05L11 10.1Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth=".2"
      />
    </svg>
  );
};

const platformConfig = {
  apple: {
    label: "Apple Podcasts",
    icon: <ApplePodcastIcon />,
  },
  spotify: {
    label: "Spotify",
    icon: <SpotifyIcon />,
  },
  youtubeMusic: {
    label: "YouTube Music",
    icon: <YouTubeMusicIcon />,
  },
} as const;

export default function ProgramPlatformLinks({
  links,
}: ProgramPlatformLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 shrink-0 leading-none">
      {links.map((link) => {
        const config = platformConfig[link.platform];

        return (
          <Link
            key={`${link.platform}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={config.label}
            title={config.label}
            className="group inline-flex h-4 w-4 items-center justify-center text-gray-500 hover:text-primary transition-colors"
          >
            {config.icon}
          </Link>
        );
      })}
    </div>
  );
}
