import { print } from 'graphql';
import {
  GetCategoryDocument,
  type GetCategoryQuery,
  GetHomeScreensDocument,
  type GetHomeScreensQuery,
} from './generated/graphql';

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://develop.api.samansa.com/graphql';

/**
 * Fetch a category data from the GraphQL API by its ID
 * @param id - The ID of the category to fetch
 * @returns The category data
 */
export async function fetchCategory(
  id: string,
): Promise<GetCategoryQuery['category'] | null> {
  try {
    const query = print(GetCategoryDocument);
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data?.category ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch the home screens data from the GraphQL API (only the category data)
 * @returns The home screens data (only the category data)
 */
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
