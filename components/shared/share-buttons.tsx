'use client';
import React from 'react';
import { Share2Icon, TwitterIcon, LinkedinIcon } from 'lucide-react';

type Props = {
  url: string;
  title?: string;
  text?: string;
};

export default function ShareButtons({ url, title = '', text = '' }: Props) {
  const openWindow = (shareUrl: string) =>
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=450');

  const e = encodeURIComponent;
  const message = (text || title).trim();

  const copyLink = async (withMessage = true) => {
    // produce a relative path for the copied text (e.g. "/paper/test-comment-...")
    const getPath = (u: string) => {
      try {
        // handles absolute or relative URLs
        const parsed = new URL(u, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        return parsed.pathname + (parsed.search || '');
      } catch {
        return u;
      }
    };

    const toCopy = withMessage ? `${message} ${getPath(url)}` : getPath(url);
    try {
      await navigator.clipboard.writeText(toCopy);
      alert('Message copied to clipboard');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = toCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      alert('Message copied to clipboard');
    }
  };

  // add missing shareNative implementation
  const shareNative = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await (navigator as any).share({ title, text: message, url });
        return;
      } catch {
        // user cancelled or share failed — fall back to copy
      }
    }
    await copyLink(true);
  };

  // Open LinkedIn share directly (do not copy to clipboard)
  const handleLinkedIn = () => {
    openWindow(linkedin);
  };
  const tweet = `https://twitter.com/intent/tweet?text=${e(message)}&url=${e(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`;

  // smaller buttons and tighter spacing
  const btnClass =
    'w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition';

  return (
    <div className="flex items-center gap-2">
      <button aria-label="Share" title="Share" onClick={shareNative} className={btnClass}>
        <Share2Icon size={12} />
      </button>

      <button aria-label="Share on X" title="Share on X" onClick={() => openWindow(tweet)} className={btnClass}>
        <TwitterIcon size={12} />
      </button>

      <button aria-label="Share on LinkedIn" title="Share on LinkedIn" onClick={handleLinkedIn} className={btnClass}>
        <LinkedinIcon size={12} />
      </button>
    </div>
  );
}
