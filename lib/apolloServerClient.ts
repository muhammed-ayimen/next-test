import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const uri =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://develop.api.samansa.com/graphql';

const httpLink = new HttpLink({
  uri,
  fetchOptions: {
    next: { revalidate: 300 },
  },
});

/**
 * Apollo Client for server-side usage (RSC, generateMetadata, generateStaticParams).
 * Uses the same GraphQL endpoint and queries as the client-side Apollo setup.
 */
export const serverClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: true,
});
