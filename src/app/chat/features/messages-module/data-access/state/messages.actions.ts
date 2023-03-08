// External Dependencies
import { createAction, props } from "@ngrx/store";
// Internal Dependencies
import { Message } from "@app/chat/features/messages-module/models/MessagesList";
import { NewMessage } from "@app/chat/features/messages-module/models/NewMessage";
import { MessagesInput } from "@app/shared/models/MessagesInput";
import { FetchMoreMessagesFilters } from "@app/chat/features/messages-module/models/FetchMoreMessagesFilters";
/**
 * OnLoad Messages List
 * @returns props { filters: MessagesInput }
 */
export const loadMessagesList = createAction(
  "[MessagesList Page] Load Messages",
  props<{ filters: MessagesInput }>()
);
/**
 * OnLoad Messages List Success
 * @returns props { messages: MessagesList }
 */
export const loadMessagesListSuccess = createAction(
  "[MessagesList Page] Messages Load Success",
  props<{ messages: Array<Message> }>()
);
/**
 * OnLoad Messages List Failure
 * @returns props { error: string }
 */
export const loadUMessagesListFailure = createAction(
  "[MessagesList Page] Messages Load Failure",
  props<{ error: string }>()
);
/**
 * OnUpdate Messages List
 * @returns props { newMessage: NewMessage }
 */
export const updateMessagesList = createAction(
  "[CreateMessage Page] Update Messages",
  props<{ newMessage: NewMessage }>()
);
/**
 * OnUpdate Messages List Success
 * @returns props { newMessage: NewMessage }
 */
export const updateMessagesListSuccess = createAction(
  "[CreateMessage Page] Update Messages Success",
  props<{ newMessage: Message }>()
);
/**
 * OnUpdate Messages List Failure
 * @returns props { message: Message }
 */
export const updateMessagesListFailure = createAction(
  "[CreateMessage Page] Update Messages Failure",
  props<{ message: Message }>()
);
/**
 * Load Older Messages List
 * @params fiters @type {FetchMoreMessagesFilters}
 */
export const loadMoreMessagesList = createAction(
  "[MessagesList Page] Load More Messages",
  props<{ filters: FetchMoreMessagesFilters }>()
);
/**
 * Load Older Messages List Success
 * @returns messages @type {Array<Message>}
 */
export const loadMoreMessagesListSuccess = createAction(
  "[MessagesList Page] More Messages Load Success",
  props<{ messages: Array<Message> }>()
);
/**
 * Load Older Messages List Failure
 * @returns error @type {string}
 */
export const loadMoreMessagesListFailure = createAction(
  "[MessagesList Page] More Messages Load Failure",
  props<{ error: string }>()
);
