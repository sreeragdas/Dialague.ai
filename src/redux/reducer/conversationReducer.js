// chatHistoryReducer.js

import { SET_CONVERSATION_KEY , SET_EXISTINGCONVERSATION_KEY } from "../constants/conversation";

const initialState = {
  conversationKey: null,
  existconversationKey:null
};

const conversationReducer  = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATION_KEY:
      return {
        ...state,
        conversationKey: action.payload,
      };
      case SET_EXISTINGCONVERSATION_KEY:
        return {
          ...state,
          existconversationKey: action.payload,
        };

    default:
      return state;
  }
};

export default conversationReducer;
