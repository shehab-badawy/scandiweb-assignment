import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URI,
  }),
  cache: new InMemoryCache(),
});

export default client;