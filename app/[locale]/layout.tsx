import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '../components/Header';
import { Providers } from '../providers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Samansa - ' + (locale === 'ja' ? '映画情報サービス' : 'Movie Info Service'),
    description: locale === 'ja'
      ? 'カテゴリ別に映画を探して、詳細やコメントをチェックしよう'
      : 'Browse movies by category and check details and comments',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        <Header />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
