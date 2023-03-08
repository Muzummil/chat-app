export interface NewMessage {
  text: string;
  userId: string;
  channelId: string;
  status: "Sending" | "Sent" | "Error";
}
