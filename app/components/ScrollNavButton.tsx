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
      className={`absolute top-0 bottom-2 z-10 w-12 flex items-center transition-opacity opacity-0 group-hover/row:opacity-100 hover:from-zinc-900 ${
        isLeft
          ? 'left-0 bg-gradient-to-r from-zinc-900/95 to-transparent justify-start pl-2'
          : 'right-0 bg-gradient-to-l from-zinc-900/95 to-transparent justify-end pr-2'
      }`}
      aria-label={label}
    >
      <div className="bg-zinc-800/90 hover:bg-zinc-700 rounded-full p-2 transition-colors">
        {isLeft ? (
          <ChevronLeft className="w-5 h-5 text-white" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white" />
        )}
      </div>
    </button>
  );
}
