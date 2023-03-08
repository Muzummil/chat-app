export interface MessagesApiResponse {
  data: MessagesDataObj;
}
export interface MoreMessagesApiResponse {
  data: MoreMessagesDataObj;
}
export interface MessagesDataObj {
  fetchLatestMessages: Array<Message>;
}
export interface MoreMessagesDataObj {
  fetchMoreMessages: Array<Message>;
}
export interface MessagesList {
  messages: Array<Message>;
}
export interface Message {
  messageId: string | null;
  text: string;
  datetime: string;
  userId: string;
  status?: "Sending" | "Sent" | "Error";
}
