import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/#top"
          className="text-lg font-bold italic text-amber-500 tracking-tight hover:text-amber-400 transition-colors"
        >
          samansa
        </Link>
        <span className="text-sm text-zinc-500">映画情報サービス</span>
      </div>
    </header>
  );
}
