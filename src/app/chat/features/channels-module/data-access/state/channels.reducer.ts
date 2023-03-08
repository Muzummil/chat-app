// External Dependencies
import { createFeature, createReducer, on } from "@ngrx/store";
// Internal Dependencies
import {
  loadChannelsList,
  loadChannelsListSuccess,
  loadUChannelsListFailure,
} from "./channels.actions";
import { ChannelsListState } from "@app/chat/features/channels-module/models/ChannelsListState";
/**
 * Channels List Initial State
 */
export const initialState: ChannelsListState = {
  channelsList: { channels: [] },
  error: null,
};
/**
 * Channels List Reducer
 */
export const channelsListReducer = createFeature({
  // Supply the initial state
  name: "channelsList",
  reducer: createReducer(
    initialState,
    on(loadChannelsList, (state) => ({ ...state })),
    // Handle successfully loaded users list
    on(loadChannelsListSuccess, (state, { channels }) => ({
      ...state,
      channelsList: channels,
      error: null,
    })),
    // Handle Channels list load failure
    on(loadUChannelsListFailure, (state, { error }) => ({
      ...state,
      error: error,
    }))
  ),
});
