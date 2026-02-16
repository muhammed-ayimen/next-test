このリポジトリをForkして、映画情報を提供するサービスを作ってください。ページは、トップページとカテゴリ詳細ページと映画情報詳細ページの3つを作成してください。

**トップページ**ではカテゴリごとに映画サムネイルが並んでおり、カテゴリごとにカテゴリ詳細ページへのリンクをつけてください。また映画サムネイルをクリックすると詳細ページに遷移する形にしてください。

**カテゴリ詳細ページ**では映画サムネイルが並んでおり、トップページ同様に映画サムネイルをクリックすると詳細ページに遷移する形にしてください。

**映画情報詳細ページ**では、映画のタイトルと説明とlike数を表示し、右サイドバーで「コメント一覧」を表示してください。

以下のGraphQL Queryを使ってください（Queryの定義はすでに `lib/graphql/query` 以下に入っています）。

詳細や他のQueryを知りたい場合は [https://develop.api.samansa.com/graphiql](https://develop.api.samansa.com/graphiql) を確認してください。

- getHomeScreens
  - 映画一覧ページで表示する映画カテゴリとその映画一覧を返す
- getCategory
  - 映画カテゴリIDを指定することで、そのカテゴリに含まれる映画一覧を返す
- getOriginalVideo
  - 映画IDを指定することで、その詳細情報を返す
- getVideoComments
  - 映画IDを指定することで、その映画へのコメント一覧を返す

実践的な工夫は大歓迎です！（例えば最初のgetHomeScreensでカテゴリのみ取得して、それぞれのカテゴリの映画は後から取得するようにするなど）

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
