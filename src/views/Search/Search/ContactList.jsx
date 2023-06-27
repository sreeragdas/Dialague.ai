import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { setConversationKey } from "../../../redux/action/conversationKey";
import { client } from "../../../axios";
import { Plus, Edit2, Trash, Check } from "react-feather";
import "./chatHistory.css";
import { sentMsg } from "../../../redux/action/Chat";
import { StartConversation } from "../../../redux/action/Chat";
const ContactList = ({ chatHistory }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [chatHistoryState, setChatHistoryState] = useState([]); // Store chatHistory in a useState variable
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setChatHistoryState(chatHistory); // Update chatHistoryState when chatHistory prop changes
  }, [chatHistory]);

  const getMessageTime = () => {
    //Get current system time
    const current = new Date();
    return current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function getRandomInt() {
    const randomInt = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    dispatch(setConversationKey(randomInt));
    return randomInt;
  }

  const getHistroyData = async () => {
    const data = await client.get("/conversations/");
    setChatHistoryState(data);
  };

  const handleNewChatsClick = () => {
   dispatch(StartConversation(true))
    getRandomInt();
  };

  const handleEditClick = (item) => {
    setEditMode(true);
    setEditedTitle(item.title);
    setEditedItem(item);
  };

  const handleSaveClick = (index) => {
    // Perform the API call with the updated title (editedTitle)
    // After successfully saving, you can set edit mode to false
    console.log("clicked", index);
    console.log(editedTitle, "eeeeeeeeee");
    console.log(index);
    client
      .patch(`/conversations/${index}/`, { title: editedTitle })
      .then(() => {
        getHistroyData();
      });
    setEditMode(false);
    setEditedItem(null);
  };

  const onDeleteIndex = (index) => {
    client.delete(`/conversations/${index}/`).then(() => {
      getHistroyData();
    });
    console.log("delete clicked");
    console.log(index);
  };

  const handleOnClick = async (conversation) => {
    console.log("hi", conversation);
    dispatch(StartConversation(true))
    const que = await client.get(`history/?conversation=${conversation}`);

  
     dispatch( sentMsg({
        text: que.data[0].question,
        time: getMessageTime(),
        types: "sent",
      }) , 'question'
    )
 
    dispatch(  sentMsg({
        text: que.data[0].answer,
        time: getMessageTime(),
        types: "received",
      })
    )

    // for(let i =0 ; i>que.data?.length ; i++){
    //   sentMsg({
    //     text: que.data[i],
    //     time: getMessageTime(),
    //     types: "received",
    //   });
    // }
    // dispatch(sentMsg(data.data));
  };
  console.log(history, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

  return (
    <>
      <div style={{ backgroundColor: "black" }} className="chatapp-aside">
        <header className="aside-header">
          {/* <div>Chats History</div> */}
          <div className="d-flex"></div>
        </header>
        <div>
          <div>
            <button className="addChatButton" onClick={handleNewChatsClick}>
              <Plus />
              <span>New chats</span>
            </button>
          </div>
          <div>
            {chatHistoryState
              ? chatHistoryState?.data?.map((item, index) => {
                  const isEditing = editedItem === item;
                  return (
                    <div
                      key={index}
                      style={{
                        marginLeft: "10px",
                        marginTop: "20px",
                        color: "white",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                          {isEditing ? (
                            <Check
                              onClick={() => handleSaveClick(item.id)}
                              style={{ justifyItems: "end" }}
                            /> // Pass a function reference
                          ) : (
                            <Edit2
                              onClick={() => handleEditClick(item)}
                              style={{ justifyItems: "end" }}
                            /> // Pass a function reference
                          )}
                        </div>
                        <div style={{ marginLeft: "5px", fontSize: "1.3rem" }}>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                            />
                          ) : (
                            <div
                              onClick={() => {
                                handleOnClick(item.id);
                              }}
                            >
                              {" "}
                              {item.title}{" "}
                            </div>
                          )}
                        </div>
                        <div
                          style={{ justifyItems: "end" }}
                          onClick={() => onDeleteIndex(item.id)}
                        >
                          <Trash />
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { chatHistoryReducer } = state;
  const { chatHistory } = chatHistoryReducer;

  return {
    chatHistory: chatHistory,
  };
};

export default connect(mapStateToProps)(ContactList);
