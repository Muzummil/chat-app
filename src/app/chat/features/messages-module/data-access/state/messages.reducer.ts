// External Dependencies
import { createFeature, createReducer, on } from "@ngrx/store";
// Internal Dependencies
import {
  loadMessagesList,
  loadMoreMessagesList,
  loadMessagesListSuccess,
  loadUMessagesListFailure,
  updateMessagesListFailure,
  updateMessagesListSuccess,
  loadMoreMessagesListFailure,
  loadMoreMessagesListSuccess,
} from "./messages.actions";
import { MessagesListState } from "@app/chat/features/messages-module/models/MessagesListState";
/**
 * Messages List Initial State
 */
export const initialState: MessagesListState = {
  messagesList: [],
  error: null,
  loading: true,
};
/**
 * Messages List Reducer
 */
export const messagesListReducer = createFeature({
  // Supply the initial state
  name: "messagesList",
  reducer: createReducer(
    initialState,
    // Handle loading list of messages
    on(loadMessagesList, (state) => {
      return {
        ...state,
        loading: true,
      };
    }),
    // Handle loading new/old more messages
    on(loadMoreMessagesList, (state) => ({ ...state })),
    // Optional for full section loading
    // on(loadMoreMessagesList, (state) => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // }),
    // Handle successfully loaded Messages list
    on(loadMessagesListSuccess, (state, { messages }) => {
      return {
        ...state,
        messagesList: messages,
        error: null,
        loading: false,
      };
    }),
    // Handle Messages list load failure
    on(loadUMessagesListFailure, (state, { error }) => {
      return {
        ...state,
        error: error,
        loading: false,
      };
    }),
    // Handle create new message success
    on(updateMessagesListSuccess, (state, { newMessage }) => {
      // NewMessage object is added in the messagesList
      return {
        ...state,
        messagesList: [...state.messagesList, newMessage],
        loading: false,
      };
    }),
    // Handle create new message failure
    on(updateMessagesListFailure, (state, { message }) => {
      // NewMessage object is added in the messagesList with error flag
      return {
        ...state,
        messagesList: [...state.messagesList, message],
        loading: false,
      };
    }),
    // Handle successfully loaded More Messages list
    on(loadMoreMessagesListSuccess, (state, { messages }) => {
      return {
        ...state,
        messagesList: [...state.messagesList, ...messages],
        error: null,
        loading: false,
      };
    }),
    // Handle More Messages list load failure
    on(loadMoreMessagesListFailure, (state, { error }) => {
      return {
        ...state,
        error: error,
        loading: false,
      };
    })
  ),
});
