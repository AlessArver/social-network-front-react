import { split, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import Cookie from "js-cookie";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const token = Cookie.get("userToken");

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `ws://localhost:5000/graphql`,
          connectionParams: {
            authToken: token ? `${token}` : null,
          },
        })
      )
    : null;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});
const httpLink = new HttpLink({ uri: "/graphql" });

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  cache,
  link,
});
