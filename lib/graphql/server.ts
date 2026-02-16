import { serverClient } from '../apolloServerClient';
import {
  GetCategoryDocument,
  type GetCategoryQuery,
  GetHomeScreensDocument,
  type GetHomeScreensQuery,
  GetOriginalVideoDocument,
  type GetOriginalVideoQuery,
} from './generated/graphql';

/**
 * Fetch a category data from the GraphQL API by its ID
 * @param id - The ID of the category to fetch
 * @returns The category data
 */
export async function fetchCategory(
  id: string,
): Promise<GetCategoryQuery['category'] | null> {
  try {
    const { data } = await serverClient.query({
      query: GetCategoryDocument,
      variables: { id },
    });
    return data.category ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch a video/movie details from the GraphQL API by its ID
 * @param id - The ID of the video/movie to fetch
 * @returns The video/movie data
 */
export async function fetchOriginalVideo(
  id: string,
): Promise<GetOriginalVideoQuery['originalVideo'] | null> {
  try {
    const { data } = await serverClient.query({
      query: GetOriginalVideoDocument,
      variables: { id },
    });
    return data.originalVideo ?? null;
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
    const { data } = await serverClient.query({
      query: GetHomeScreensDocument,
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    return data.homeScreens ?? null;
  } catch {
    return null;
  }
}
