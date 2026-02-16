import Breadcrumb from '@/app/components/Breadcrumb';
import VideoCard from '@/app/components/VideoCard';
import { fetchCategory, fetchHomeScreens } from '@/lib/graphql/server';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

// ビルド時にカテゴリーページを事前生成する / Pre-generate category pages at build time
export async function generateStaticParams() {
  const homeScreens = await fetchHomeScreens();
  if (!homeScreens) return [];

  return homeScreens
    .filter((screen) => screen.category?.id)
    .map((screen) => ({
      id: screen.category!.id,
    }));
}

// SEO用のメタデータを生成する / Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const category = await fetchCategory(id);
  const t = await getTranslations({ locale, namespace: 'category' });

  if (!category) {
    return {
      title: t('notFoundTitle'),
    };
  }

  const categoryName = category.name ?? t('fallbackName');
  const videoCount = category.videos?.length ?? 0;
  const description = locale === 'ja'
    ? `${categoryName}カテゴリーの動画${videoCount}本を視聴できます`
    : `Watch ${videoCount} videos in the ${categoryName} category`;

  return {
    title: `${categoryName} - Samansa`,
    description,
    openGraph: {
      title: categoryName,
      description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const category = await fetchCategory(id);
  const t = await getTranslations('category');
  const tCommon = await getTranslations('common');

  if (!category) {
    notFound();
  }

  const videos = category.videos ?? [];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: tCommon('home'), href: '/' },
          { label: category.name ?? t('fallbackName') },
        ]}
      />

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
        {category.name ?? t('fallbackName')}
      </h1>

      {videos.length === 0 ? (
        <p className="text-zinc-500 text-center py-12">
          {t('noVideos')}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      )}
    </main>
  );
}
