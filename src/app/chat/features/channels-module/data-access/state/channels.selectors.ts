// External Dependencies
import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from "@ngrx/store";
// Internal Dependencies
import { AppState } from "@app/state/app.state";
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";
/**
 * Channels State Selector
 * @returns { channelsList: ChannelsList }
 */
export const selectChannels = (state: AppState) => state.channelsList;
/**
 * Channels List State Selector
 * @returns { ChannelsListState }
 */
export const channelsList:
  | MemoizedSelector<AppState, ChannelsList, DefaultProjectorFn<ChannelsList>>
  | any = createSelector(selectChannels, (state: ChannelsList) => state);
