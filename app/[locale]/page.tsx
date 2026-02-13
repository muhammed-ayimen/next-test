import { fetchHomeScreens } from '@/lib/graphql/server';
import { getTranslations } from 'next-intl/server';
import CategoryRow from '../components/CategoryRow';

export default async function HomePage() {
  const homeScreens = await fetchHomeScreens();
  const t = await getTranslations('home');

  return (
    <main className="max-w-[1400px] mx-auto px-6">
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white">
          {t('heading')}
        </h1>
        <p className="text-zinc-500 mt-3 text-base md:text-lg">
          {t('subtitle')}
        </p>
      </section>

      {!homeScreens && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <p className="text-zinc-500 mb-4">
            {t('loadError')}
          </p>
        </div>
      )}

      {homeScreens && (
        <div className="space-y-14 pb-16">
          {homeScreens
            .filter((screen) => screen.category)
            .map((screen, index) => (
              <CategoryRow
                key={screen.id}
                categoryId={screen.category!.id}
                categoryName={screen.category!.name}
                priority={index === 0}
              />
            ))}
        </div>
      )}
    </main>
  );
}
