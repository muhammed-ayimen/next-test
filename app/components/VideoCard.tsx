import { formatDuration, getImageSrc } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  duration?: { minutes?: number | null; seconds?: number | null } | null;
  priority?: boolean;
}

export default function VideoCard({
  id,
  title,
  landscapeThumbnail,
  duration,
  priority = false,
}: VideoCardProps) {
  const durationStr = duration ? formatDuration(duration) : '';

  return (
    <Link href={`/video/${id}`} className="group block">
      <div className="relative aspect-video rounded-lg bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {landscapeThumbnail ? (
            <Image
              src={getImageSrc(landscapeThumbnail)}
              alt={title ?? '動画'}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="truncate text-sm font-medium drop-shadow-lg">
              {title ?? 'Untitled'}
            </p>
            {durationStr && (
              <span className="text-xs text-zinc-300">{durationStr}</span>
            )}
          </div>

          {durationStr && (
            <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs text-zinc-200">
              {durationStr}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
