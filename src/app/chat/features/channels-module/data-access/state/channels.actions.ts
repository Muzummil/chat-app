// External Dependencies
import { createAction, props } from "@ngrx/store";
// Internal Dependencies
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";
/**
 * OnLoad Channels List
 */
export const loadChannelsList = createAction(
  "[ChannelsList Page] Load Channels"
);
/**
 * OnLoad Channels List Success
 * @returns props { channels: ChannelsList }
 */
export const loadChannelsListSuccess = createAction(
  "[ChannelsList API] Channels Load Success",
  props<{ channels: ChannelsList }>()
);
/**
 * OnLoad Channels List Failure
 * @returns props { error: string }
 */
export const loadUChannelsListFailure = createAction(
  "[ChannelsList API] Channels Load Failure",
  props<{ error: string }>()
);
