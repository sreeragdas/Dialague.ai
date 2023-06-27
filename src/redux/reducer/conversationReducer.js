// chatHistoryReducer.js

import { SET_CONVERSATION_KEY } from "../constants/conversation";

const initialState = {
  conversationKey: null,
};

const conversationReducer  = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATION_KEY:
      return {
        ...state,
        conversationKey: action.payload,
      };

    default:
      return state;
  }
};

export default conversationReducer;
