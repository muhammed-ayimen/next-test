import Link from 'next/link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-zinc-500 mb-8" aria-label="パンくずリスト">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2 text-zinc-400 dark:text-zinc-700">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-amber-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
