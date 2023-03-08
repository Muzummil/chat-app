// External Dependencies
import { GraphQLError } from "graphql/error";

export interface ApolloError {
  message: string;
  networkError: Error | null;
  graphQLErrors: ReadonlyArray<GraphQLError>;
}
