import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default async function Breadcrumb({ items }: BreadcrumbProps) {
  const t = await getTranslations('nav');

  return (
    <nav
      className="text-sm text-zinc-500 mb-8"
      aria-label={await t('breadcrumbLabel')}
    >
      {await items.map((item, index) => (
        <span key={index}>
          {index > 0 && (
            <span className="mx-2 text-zinc-400 dark:text-zinc-700">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-amber-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-300">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
