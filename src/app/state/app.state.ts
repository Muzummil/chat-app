// Internal Dependencies
import { UsersList } from "@app/chat/features/users-module/models/UsersList";
import { ChannelsList } from "@app/chat/features/channels-module/models/ChannelsList";
import { MessagesList } from "@app/chat/features/messages-module/models/MessagesList";
/**
 * Generalized State for App
 */
export interface AppState {
  usersList: UsersList;
  channelsList: ChannelsList;
  messagesList: MessagesList;
}
