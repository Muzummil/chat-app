// Internal Dependencies
import { Message } from "@app/chat/features/messages-module/models/MessagesList";
/**
 * Messages List State Interface
 */
export interface MessagesListState {
  messagesList: Array<Message>;
  loading: boolean;
  error: string | null;
}
