// chatHistoryActions.js

import { SET_CONVERSATION_KEY } from '../constants/conversation';

export const setConversationKey = (conversationKey) => ({

  type: SET_CONVERSATION_KEY,
  payload: conversationKey,
});
