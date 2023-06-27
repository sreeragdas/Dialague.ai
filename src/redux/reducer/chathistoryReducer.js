import { SET_SECOND_RESPONSE } from "../constants/chathistory";


const initialState = {
  chatHistory: [], // Initial value for chatHistory

};

const chatHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECOND_RESPONSE:
      return {
        ...state,
        chatHistory: action.payload,
      };


    default:
      return state;
  }
};

export default chatHistoryReducer;
