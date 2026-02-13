'use client';

import { GetVideoCommentsDocument } from '@/lib/graphql/generated/graphql';
import { useQuery } from '@apollo/client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import CommentItem from './CommentItem';

interface CommentListProps {
  videoId: string;
}

export default function CommentList({ videoId }: CommentListProps) {
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery(
    GetVideoCommentsDocument,
    {
      variables: { id: videoId, first: 10 },
      skip: !videoId,
    },
  );

  const handleLoadMore = async () => {
    if (!data?.videoComments.pageInfo?.endCursor) return;
    setLoadingMore(true);
    try {
      await fetchMore({
        variables: {
          after: data.videoComments.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          videoComments: {
            ...prev.videoComments,
            edges: [
              ...(prev.videoComments.edges || []),
              ...(fetchMoreResult.videoComments.edges || []),
            ],
            pageInfo: fetchMoreResult.videoComments.pageInfo,
          },
        }),
      });
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full min-h-0 flex flex-col rounded-lg bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 p-5 overflow-hidden">
        <div className="h-6 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-4 shrink-0" />
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-3 py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 min-w-0">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-4 w-full rounded bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 p-5 text-center">
        <p className="text-zinc-500 text-sm">
          コメントを読み込めませんでした。
        </p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col rounded-lg bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 p-5 overflow-hidden">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 shrink-0">
        コメント ({data?.videoComments.allCount ?? 0})
      </h3>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-custom">
        {data?.videoComments.edges && data.videoComments.edges.length > 0 ? (
          <>
            {data.videoComments.edges.map(
              ({ node }) =>
                node && (
                  <CommentItem
                    key={node.id}
                    contents={node.contents}
                    userName={node.user?.name}
                    userAvatar={node.user?.avatar}
                    createdAt={node.createdAt}
                    likeNum={node.likeNum}
                  />
                ),
            )}

            {data.videoComments.pageInfo?.hasNextPage && (
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="w-full mt-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {loadingMore ? '読み込み中...' : 'もっと見る'}
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-8 min-h-full">
            <MessageCircle
              className="w-10 h-10 text-zinc-600"
              strokeWidth={1.5}
            />
            <p className="text-zinc-500 text-sm text-center">
              まだコメントがありません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
