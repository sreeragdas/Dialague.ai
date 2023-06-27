// Action Types

import {SET_SECOND_RESPONSE } from '../constants/chathistory'
// Action Creator
export const setChatHistory = (chatHistory) => ({
  type:SET_SECOND_RESPONSE ,
  payload: chatHistory,
});


