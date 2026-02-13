import { formatDate } from '@/lib/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';

interface CommentItemProps {
  contents?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
  createdAt?: string | null;
  likeNum?: number | null;
}

export default function CommentItem({
  contents,
  userName,
  userAvatar,
  createdAt,
  likeNum,
}: CommentItemProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-zinc-800 last:border-b-0">
      <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName ?? 'User'}
            width={32}
            height={32}
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 font-bold">
            {userName?.charAt(0).toUpperCase() ?? '?'}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-zinc-200 truncate">
            {userName ?? '匿名'}
          </span>
          {createdAt && (
            <span className="text-xs text-zinc-600 shrink-0">
              {formatDate(createdAt)}
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-400 break-words">{contents ?? ''}</p>
        {likeNum != null && likeNum > 0 && (
          <span className="text-xs text-zinc-500 mt-1 inline-flex items-center gap-1">
            <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
            {likeNum}
          </span>
        )}
      </div>
    </div>
  );
}
