import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import resolvers from './resolvers';

let apolloClient = null;

function create(initialState) {
  const isBrowser = typeof window !== 'undefined';
  const cache = new InMemoryCache().restore(initialState || {});

  cache.writeData({
    data: {
      me: null,
    },
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    // link: new HttpLink({
    //   uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
    //   credentials: 'same-origin',
    //   fetch: !isBrowser && fetch,
    // }),
    cache,
    resolvers,
    typeDefs: './lib/schema.graphql',
  });
}

export default function initApollo(initialState?) {
  if (typeof window === 'undefined') {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
