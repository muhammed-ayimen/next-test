'use client';

import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScrollNavButton from './ScrollNavButton';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';

interface CategoryRowProps {
  categoryId: string;
  categoryName?: string | null;
  priority?: boolean;
}

export default function CategoryRow({
  categoryId,
  categoryName,
  priority = false,
}: CategoryRowProps) {
  const [isVisible, setIsVisible] = useState(priority);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [arrowVisibility, setArrowVisibility] = useState({
    left: false,
    right: false,
  });

  const { data, loading, error } = useQuery(GetCategoryDocument, {
    variables: { id: categoryId },
    skip: !isVisible, // 表示領域に入るまでフェッチしない / Don't fetch until scrolled into view
  });

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setArrowVisibility({
      left: scrollLeft > 10,
      right: scrollLeft < scrollWidth - clientWidth - 10,
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [data]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const videos = data?.category?.videos ?? [];

  // カテゴリーが表示領域に入っていない場合はスケルトンを表示する / Show skeleton while not in view
  if (!isVisible && !priority) {
    return (
      <section ref={sectionRef}>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {categoryName ?? 'カテゴリー'}
          </h2>
          <Link
            href={`/category/${categoryId}`}
            className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
          >
            すべて見る →
          </Link>
        </div>
        <div className="flex gap-3 md:gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-none w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%]"
            >
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // データが読み込まれていない場合は何も表示しない / Don't render if no videos after loading
  if (!loading && !error && videos.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {categoryName ?? 'Category'}
        </h2>
        <Link
          href={`/category/${categoryId}`}
          className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
        >
          すべて見る →
        </Link>
      </div>

      {loading ? (
        <div className="flex gap-3 md:gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex-none w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%]"
            >
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      ) : error ? null : (
        <div className="relative group/row">
          {arrowVisibility.left && (
            <ScrollNavButton
              direction="left"
              onClick={() => scroll('left')}
              label="Scroll left"
            />
          )}
          {arrowVisibility.right && (
            <ScrollNavButton
              direction="right"
              onClick={() => scroll('right')}
              label="Scroll right"
            />
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="flex-none w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] overflow-hidden rounded-lg"
              >
                <VideoCard {...video} priority={priority && index < 6} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
