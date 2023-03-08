// External Dependencies
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
// Apollo Dependencies
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
// Internal Dependencies
import { environment } from "@src/environments/environment";

const ENDPOINT_URL: string = environment.GRAPHQL_ENDPOINT_URL;

/**
 * Create Apollo Client Option
 * @params httpLink @type {HttpLink}
 * @returns apolloOptions @type {ApolloClientOptions}
 */
function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: ENDPOINT_URL }),
    cache: new InMemoryCache({
      typePolicies: undefined,
    }),
  };
}

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
