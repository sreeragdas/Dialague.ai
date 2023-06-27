import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Alert } from "react-bootstrap";
import SimpleBar from "simplebar-react";
//Redux
import { connect } from "react-redux";
import ChatMessage from "./ChatMessage";

const ChatBody = ({ msg }) => {
  console.log(msg , 'from catBody')
  console.log('chatbody called')
  const [messages, setMessages] = useState(msg);

  //Get New Messages
  useEffect(() => {
    setMessages(msg);
  }, [msg, messages]);

  // 👇️ scroll to bottom every time messages change
  const bottomRef = useRef(null);
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <SimpleBar
      style={{ height: "100%", width: "100vw", marginRight: "none" }}
      id="chat_body"
      className="chat-body"
    >
      {!messages.length && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <Alert variant="primary">
            <span>No conversations found. Start new conversation now!</span>
          </Alert>
        </div>
      )}

      {!!messages.length && (
        <ul
          id="dummy_avatar"
          className="list-unstyled chat-single-list"
          style={{
            marginLeft: "10vw",
            marginRight: "15vw",
            width: "75vw",
          }}
        >
          <li className="day-sep">
            <span>Today</span>
          </li>
          {messages.map((elem, index) => (
            <li className={classNames("media", elem.types)} key={index}>
              <ChatMessage chat={elem} />
            </li>
          ))}
        </ul>
      )}
      <div ref={bottomRef} />
    </SimpleBar>
  );
};

const mapStateToProps = ({ chatReducer }) => {
  const { msg } = chatReducer;
  return { msg };
};

export default connect(mapStateToProps)(ChatBody);
