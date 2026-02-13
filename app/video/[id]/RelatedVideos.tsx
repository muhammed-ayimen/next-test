import CategoryRow from '@/app/components/CategoryRow';
import { fetchHomeScreens } from '@/lib/graphql/server';

export default async function RelatedVideos() {
  const homeScreens = await fetchHomeScreens();

  // ランダムにカテゴリを選択する / Pick a random category for related videos
  const randomCategory =
    homeScreens && homeScreens.length > 0
      ? homeScreens[Math.floor(Math.random() * homeScreens.length)]
      : null;

  if (!randomCategory?.category?.id) {
    return null;
  }

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">おすすめの動画</h2>
      <CategoryRow
        categoryId={randomCategory.category.id}
        categoryName={randomCategory.category.name}
      />
    </div>
  );
}
