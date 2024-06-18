import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { GRAPHQL_URL, WS_GRAPHQL_URL } from "./constants";
import { http } from "viem";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const wsLink = () => {
  return new GraphQLWsLink(
    createClient({
      url: WS_GRAPHQL_URL,
    }),
  );
};

// export const apolloClient = new ApolloClient({
//   link: typeof window === "undefined" ? httpLink : wsLink(),
//   cache: new InMemoryCache(),
// });

const createApolloClient = () => {
  return new ApolloClient({
    // link: typeof window === "undefined" ? httpLink : wsLink(),
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
// const createApolloClient = () => {
//     return new ApolloClient({
//         uri: GRAPHQL_URL,
//         cache: new InMemoryCache(),
//     });
// };

// export default createApolloClient;
