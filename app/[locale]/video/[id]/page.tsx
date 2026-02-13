import Breadcrumb from '@/app/components/Breadcrumb';
import CommentList from '@/app/components/CommentList';
import { fetchOriginalVideo } from '@/lib/graphql/server';
import { formatDuration, getImageSrc } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RelatedVideos from './RelatedVideos';

// SEO用のメタデータを生成する / Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const video = await fetchOriginalVideo(id);
  const t = await getTranslations({ locale, namespace: 'video' });
  const tCommonMeta = await getTranslations({ locale, namespace: 'common' });

  if (!video) {
    return {
      title: t('notFoundTitle'),
    };
  }

  const title = video.title ?? tCommonMeta('untitled');
  const description = video.description
    ? video.description.slice(0, 160)
    : t('watchOnSamansa');
  const imageUrl = video.landscapeThumbnail
    ? getImageSrc(video.landscapeThumbnail)
    : undefined;

  return {
    title: `${title} - Samansa`,
    description,
    openGraph: {
      title,
      description,
      type: 'video.movie',
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const video = await fetchOriginalVideo(id);
  const t = await getTranslations('video');
  const tCommon = await getTranslations('common');

  if (!video) {
    notFound();
  }

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: tCommon('home'), href: '/' },
          { label: video.title ?? t('videoFallback') },
        ]}
      />

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6 lg:gap-8 mb-12 @container/video-row">
        <div className="flex-1 min-w-0 order-1 lg:order-1">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 ring-1 ring-zinc-300/50 dark:ring-zinc-700/50">
            {video.landscapeThumbnail ? (
              <Image
                src={getImageSrc(video.landscapeThumbnail)}
                alt={video.title ?? t('movieThumbnailAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                <span className="text-5xl">🎬</span>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full max-h-[60vh] lg:max-h-[calc((100cqw-24rem-2rem)*9/16-7rem)] lg:w-96 lg:shrink-0 lg:self-stretch flex flex-col min-h-0 order-3 lg:order-2">
          <CommentList videoId={id} />
        </aside>

        <div className="w-full order-2 lg:order-3 lg:basis-full">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
            {video.title ?? tCommon('untitled')}
          </h1>

          <div className="flex items-center gap-5 text-zinc-400 mb-8">
            {video.duration && (
              <span className="text-base">
                {formatDuration(video.duration)}
              </span>
            )}
            {video.likeNum != null && (
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span className="text-base font-medium">
                  {video.likeNum.toLocaleString()}
                </span>
              </span>
            )}
          </div>

          {video.description && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t('overview')}</h2>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-base">
                {video.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <RelatedVideos />
    </main>
  );
}
