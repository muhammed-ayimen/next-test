import Breadcrumb from '@/app/components/Breadcrumb';
import VideoCard from '@/app/components/VideoCard';
import { fetchCategory, fetchHomeScreens } from '@/lib/graphql/server';
import { Metadata } from 'next';
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
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = await fetchCategory(id);

  if (!category) {
    return {
      title: 'カテゴリーが見つかりません - Samansa',
    };
  }

  const categoryName = category.name ?? 'カテゴリー';
  const videoCount = category.videos?.length ?? 0;
  const description = `${categoryName}カテゴリーの動画${videoCount}本を視聴できます`;

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await fetchCategory(id);

  if (!category) {
    notFound();
  }

  const videos = category.videos ?? [];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: category.name ?? 'カテゴリー' },
        ]}
      />

      <h1 className="text-3xl font-bold text-white mb-8">
        {category.name ?? 'カテゴリー'}
      </h1>

      {videos.length === 0 ? (
        <p className="text-zinc-500 text-center py-12">
          このカテゴリーには動画がありません。
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
