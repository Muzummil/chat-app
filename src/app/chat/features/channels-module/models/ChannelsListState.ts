// Internal Dependencies
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";
/**
 * Channels List State Interface
 */
export interface ChannelsListState {
  channelsList: ChannelsList;
  error: string | null;
}
