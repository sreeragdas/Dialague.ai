import React, { useState } from "react";
import ContactList from "../../Chat/Chats/ContactList";

const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <ChatContext.Provider value={chatHistory}>
        <ContactList />
    </ChatContext.Provider>
  );
};

export  default { ChatContext, ChatProvider };
