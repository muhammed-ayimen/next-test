import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/#top"
          className="text-lg font-bold italic text-amber-500 tracking-tight hover:text-amber-400 transition-colors"
        >
          samansa
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400 dark:text-zinc-500">映画情報サービス</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
