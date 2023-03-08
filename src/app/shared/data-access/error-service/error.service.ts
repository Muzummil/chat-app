// External Dependencies
import { Injectable } from "@angular/core";
import { GraphQLError } from "graphql/error";
// Internal Dependencies
import { ApolloError } from "@app/shared/models/ApolloError";
import { ErrorCodes, ErrorMessages } from "@app/shared/models/Errors";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  /**
   * Captilize the first word of a string
   * @param {string} string of words
   * @returns {string} string of words
   */
  private titleCaseWord(word: string): string {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  /**
   * Get the error message string from API Error
   * @param {ApolloError} apolloError
   * @returns {string} custom/maped error message
   */
  public getErrorMessage(apolloError: ApolloError): string {
    let errorMessageStr: string = "";
    if (apolloError.graphQLErrors.length == 0) {
      errorMessageStr = this.titleCaseWord(apolloError.message);
    } else {
      apolloError.graphQLErrors.forEach((graphqlError: GraphQLError) => {
        errorMessageStr = errorMessageStr + graphqlError.message;
        // Or get custom error message which is not been used bcz error codes are same for different errors
      });
    }

    return errorMessageStr;
  }
  /**
   * Get the custom error message based on status code
   * @param {GraphQLError} graphqlError
   * @returns {string} custom error message
   */
  getCustomErrorMessage(graphqlError: GraphQLError): string {
    switch (graphqlError.extensions["code"]) {
      case ErrorCodes.UN_AUTHORIZED:
        return ErrorMessages.UN_AUTHORIZED;
      case ErrorCodes.NOT_FOUND:
        return ErrorMessages.NOT_FOUND;
      default:
        return graphqlError.message
          ? this.titleCaseWord(graphqlError.message)
          : ErrorMessages.GENERAL;
    }
  }
}
