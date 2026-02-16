'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollNavButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  label?: string;
}

export default function ScrollNavButton({
  direction,
  onClick,
  label = `Scroll ${direction}`,
}: ScrollNavButtonProps) {
  const isLeft = direction === 'left';

  return (
    <button
      onClick={onClick}
      className={`absolute top-0 bottom-2 z-10 w-12 flex items-center transition-opacity opacity-0 group-hover/row:opacity-100 ${
        isLeft
          ? 'left-0 bg-gradient-to-r from-zinc-50/95 dark:from-zinc-900/95 to-transparent hover:from-zinc-50 dark:hover:from-zinc-900 justify-start pl-2'
          : 'right-0 bg-gradient-to-l from-zinc-50/95 dark:from-zinc-900/95 to-transparent hover:from-zinc-50 dark:hover:from-zinc-900 justify-end pr-2'
      }`}
      aria-label={label}
    >
      <div className="bg-zinc-200/90 hover:bg-zinc-300 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 rounded-full p-2 transition-colors">
        {isLeft ? (
          <ChevronLeft className="w-5 h-5 text-zinc-700 dark:text-white" />
        ) : (
          <ChevronRight className="w-5 h-5 text-zinc-700 dark:text-white" />
        )}
      </div>
    </button>
  );
}
