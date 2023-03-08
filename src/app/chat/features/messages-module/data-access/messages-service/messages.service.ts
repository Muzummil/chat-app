// External Dependencies
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
// Apollo Dependencies
import { Apollo, gql, TypedDocumentNode } from "apollo-angular";
// Internal Dependencies
import {
  fetchLatestMessagesByChennelId,
  fetchMoreMessages,
  postNewMessageByChennelId,
} from "./graphql.queries";
import {
  MessagesApiResponse,
  MoreMessagesApiResponse,
} from "@app/chat/features/messages-module/models/MessagesList";
import { NewMessage } from "@app/chat/features/messages-module/models/NewMessage";
import { MessagesObj } from "@app/chat/features/messages-module/models/PostMessage";
import { FetchMoreMessagesFilters } from "@app/chat/features/messages-module/models/FetchMoreMessagesFilters";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  /**
   * MessagesService Constructor
   * @param _apollo @type {Apollo}
   */
  constructor(private readonly _apollo: Apollo) {}
  /**
   * Get Messages List
   * @returns Observable of @type {Observable<MessagesApiResponse>}
   */

  getMessagesListByChannelId(
    channelId: string
  ): Observable<MessagesApiResponse | any> {
    const queryOptions: any = {
      query: gql`
        ${fetchLatestMessagesByChennelId}
      `,
      variables: {
        channelId: channelId,
      },
    };
    return this._apollo.watchQuery<MessagesApiResponse>(queryOptions)
      .valueChanges;
  }
  /**
   * Get More Messages List
   * @returns Observable of @type {Observable<MoreMessagesApiResponse>}
   */

  getMoreMessages(
    filters: FetchMoreMessagesFilters
  ): Observable<MoreMessagesApiResponse | any> {
    const queryOptions: any = {
      query: gql`
        ${fetchMoreMessages}
      `,
      variables: {
        old: filters.old,
        messageId: filters.messageId,
        channelId: filters.channelId,
      },
    };
    return this._apollo.watchQuery<MoreMessagesApiResponse>(queryOptions)
      .valueChanges;
  }
  /**
   * Send New Messages
   * @returns Observable of @type {Observable<MessagesObj>}
   */

  sendNewMessage(message: NewMessage): Observable<MessagesObj | any> {
    const queryOptions: TypedDocumentNode = gql`
      ${postNewMessageByChennelId}
    `;
    return this._apollo.mutate<MessagesObj>({
      mutation: queryOptions,
      variables: {
        text: message.text,
        userId: message.userId,
        channelId: message.channelId,
      },
    });
  }
}
