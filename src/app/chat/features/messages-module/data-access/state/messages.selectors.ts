// External Dependencies
import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from "@ngrx/store";
// Internal Dependencies
import {
  Message,
  MessagesList,
} from "@app/chat/features/messages-module/models/MessagesList";
import { AppState } from "@app/state/app.state";
/**
 * Messages State Selector
 * @returns { messagesList: MessagesList }
 */
export const selectMessagesList = (state: AppState) => state.messagesList;
/**
 * Messages List State Selector
 * @returns { MessagesListState }
 */
export const messagesList:
  | MemoizedSelector<AppState, MessagesList, DefaultProjectorFn<Array<Message>>>
  | any = createSelector(selectMessagesList, (state: MessagesList) => state);
