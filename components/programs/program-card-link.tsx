import Link from "next/link";

interface ProgramCardLinkProps {
  href: string;
  label: string;
}

export default function ProgramCardLink({
  href,
  label,
}: ProgramCardLinkProps) {
  return (
    <div className="mt-auto">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline text-sm text-text-link underline-offset-4 font-medium"
      >
        {label}
      </Link>
    </div>
  );
}
