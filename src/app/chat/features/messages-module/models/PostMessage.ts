// Internal Dependencies
import { Message } from "@app/chat/features/messages-module/models/MessagesList";

export interface MessagesObj {
  data: PostMessage;
}
export interface PostMessage {
  postMessage: Message;
}
