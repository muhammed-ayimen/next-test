import { print } from 'graphql';
import {
  GetHomeScreensDocument,
  type GetHomeScreensQuery,
} from './generated/graphql';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '';

export async function fetchHomeScreens(): Promise<
  GetHomeScreensQuery['homeScreens'] | null
> {
  try {
    const query = print(GetHomeScreensDocument);
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data?.homeScreens ?? null;
  } catch {
    return null;
  }
}
