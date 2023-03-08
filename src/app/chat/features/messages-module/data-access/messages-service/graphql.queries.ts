/**
 * Graphql query to load latest messages by channel
 */
export const fetchLatestMessagesByChennelId: string = `
query fetchLatestMessages($channelId: String!) {
  fetchLatestMessages(channelId: $channelId) {
    messageId
    text
    datetime
    userId
  }
}
`;
/**
 * Graphql query to more messages
 */
export const fetchMoreMessages: string = `
query fetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
  fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
    messageId
    text
    datetime
    userId
  }
}
`;
/**
 * Graphql mutation to post new message in the channel based on userId
 */
export const postNewMessageByChennelId: string = `
mutation postMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;
