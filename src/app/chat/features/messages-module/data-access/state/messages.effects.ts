// External Dependencies
import { of, from } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, concatMap } from "rxjs/operators";
// Internal Dependencies
import {
  Message,
  MessagesApiResponse,
  MoreMessagesApiResponse,
} from "@app/chat/features/messages-module/models/MessagesList";
import { ApolloError } from "@app/shared/models/ApolloError";
import { ErrorService } from "@app/shared/data-access/error-service/error.service";
import { MessagesObj } from "@app/chat/features/messages-module/models/PostMessage";
import * as MessagesActions from "@app/chat/features/messages-module/data-access/state/messages.actions";
import { MessagesService } from "@app/chat/features/messages-module/data-access/messages-service/messages.service";
/**
 * Messages List Effects Class
 */
@Injectable()
export class MessagesListEffects {
  /**
   * Users Effects Constructor
   * @param _actions$ @type {Actions}
   * @param _errorService @type {ErrorService}
   * @param _messagesService @type {MessagesService}
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _errorService: ErrorService,
    private readonly _messagesService: MessagesService
  ) {}
  /**
   * Effect to load messages list from API and returning to reducer
   */
  loadMessagessList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MessagesActions.loadMessagesList),
      switchMap(({ filters }) =>
        from(
          // Get messages from API based on channelId
          this._messagesService.getMessagesListByChannelId(
            filters.selectedChannelId
          )
        ).pipe(
          // Take the returned value and return a new success action containing the MessagesList
          map((messages: MessagesApiResponse) => {
            return MessagesActions.loadMessagesListSuccess({
              messages: messages.data.fetchLatestMessages,
            });
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error: ApolloError) => {
            const errorStr: string = this._errorService.getErrorMessage(error);
            return of(
              MessagesActions.loadUMessagesListFailure({ error: errorStr })
            );
          })
        )
      )
    )
  );
  /**
   * Effect to load more messages list from API and returning to reducer
   */
  loadMoreMessagessList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MessagesActions.loadMoreMessagesList),
      // Used switchMap so that in case new request comes old will be cancelled
      switchMap(({ filters }) =>
        // Get more messages from API based on filters i.e channelId,messageId, old
        from(this._messagesService.getMoreMessages(filters)).pipe(
          // Take the returned value and return a new success action containing the MessagesList
          map((messages: MoreMessagesApiResponse) => {
            return MessagesActions.loadMoreMessagesListSuccess({
              messages: messages.data.fetchMoreMessages,
            });
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error: ApolloError) => {
            const errorStr: string = this._errorService.getErrorMessage(error);
            return of(
              MessagesActions.loadMoreMessagesListFailure({ error: errorStr })
            );
          })
        )
      )
    )
  );
  /**
   * Effect to load more messages list from API and returning to reducer
   */
  updateMessagesList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(MessagesActions.updateMessagesList),
      // Used concatMap for message order
      concatMap(({ newMessage }) =>
        // Send new message to DB or to local state in case of error
        this._messagesService.sendNewMessage(newMessage).pipe(
          map((newAddedMessage: MessagesObj) => {
            let message: Message = newAddedMessage.data.postMessage;
            message.status = "Sent";
            return MessagesActions.updateMessagesListSuccess({
              newMessage: message,
            });
          }),
          catchError((error: ApolloError) => {
            const message: Message = {
              messageId: null,
              text: newMessage.text,
              datetime: new Date().toISOString(),
              userId: newMessage.userId,
              status: "Error",
            };
            return of(
              MessagesActions.updateMessagesListFailure({ message: message })
            );
          })
        )
      )
    )
  );
}
