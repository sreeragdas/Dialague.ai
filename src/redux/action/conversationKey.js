// chatHistoryActions.js

import { SET_CONVERSATION_KEY, SET_EXISTINGCONVERSATION_KEY  } from '../constants/conversation';


export const setConversationKey = (conversationKey) => ({

  type: SET_CONVERSATION_KEY,
  payload: conversationKey,
});

export const setExistConversationKey = (existconversationKey) => ({

  type: SET_EXISTINGCONVERSATION_KEY,
  payload: existconversationKey,
});
