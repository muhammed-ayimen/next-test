'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const segments = pathname.split('/');
    if (segments[1] === 'ja' || segments[1] === 'en') {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    const newPath = segments.join('/') || '/';

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => switchLocale('ja')}
        disabled={isPending}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === 'ja'
            ? 'text-amber-500'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        JP
      </button>
      <span className="text-zinc-600">/</span>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          locale === 'en'
            ? 'text-amber-500'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
