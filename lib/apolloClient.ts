import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://develop.api.samansa.com/graphql',
  cache: new InMemoryCache(),
});
