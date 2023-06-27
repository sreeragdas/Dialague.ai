import React, { useState, useEffect, useRef } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { ArrowRight } from "react-feather";
//Redux
import { connect } from "react-redux";
import { sentMsg } from "../../redux/action/Chat";
import { client, aiClient } from "../../axios";
import useDomainList from "../../hooks/useDomainList";
import ContactList from "./Search/ContactList";
import ChatContext from "../Search/Search/ChatContext";
import { setChatHistory } from "../../redux/action/chatHistory";

import { useDispatch } from "react-redux";
const emptyMessage = {
  domain: "",
  subDomain: "",
  question: "",
};

const ChatFooter = ({ sentMsg, conversation_key, existconversationKey }) => {
  console.log(
    existconversationKey,
    "from chatfooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
  );
  const propRef = useRef(conversation_key);
  useEffect(() => {
    propRef.current = conversation_key;
  }, [conversation_key]);

  const dispatch = useDispatch();
  const [domainList] = useDomainList(true);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [subDomainList, setSubDomainList] = useState([]);
  const [message, setMessage] = useState(emptyMessage);
  const [loading, setLoading] = useState(false);
  const messageRef = useRef(null);
  const [historyApi, setHistoryApi] = useState([]);
  const [historyData, setHistroyData] = useState([]);
  // const [chatHistory , setChathistory] =useState([])
  const fetchSubDomainList = async (domainId) => {
    setSubDomainList([]);
    try {
      const { data } = await client.get(`/domains/${domainId}/subdomains/`);

      if (data.length) {
        data?.unshift({
          id: "",
          name: "- Select - ",
        });
      }

      setSubDomainList(data);
    } catch (error) {
      console.error("Error fetching domain list:", error);
    }
  };

  useEffect(() => {
    messageRef?.current?.focus();
  }, []);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const initialSessionId = getRandomInt();
    setSessionId(initialSessionId);
  }, []);

  function getRandomInt() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
  useEffect(() => {
    if (message.domain !== selectedDomain && !loading) {
      setSelectedDomain(message.domain);
      fetchSubDomainList(message.domain);
    }
  }, [message, selectedDomain, loading]);

  function generateUniqueValue() {
    return Math.floor(Math.random() * 1000000); // Adjust as needed for uniqueness
  }

  useEffect(() => {
    chatHistoryDisplay();
  }, []);

  const chatHistoryDisplay = async () => {
    console.log("called");
    const thirdResponse = await client.get("/conversations/");
    console.log(thirdResponse, "re");
    console.log(thirdResponse.data, "dddddddddddddddddd");
    setHistroyData(thirdResponse);
    // console.log(  dispatch(setChatHistory(historyData)) , 'from foter')
    console.log(dispatch(setChatHistory(thirdResponse)));
  };

  const searchRequest = async (reqBody) => {
    setLoading(true);

    try {
      const { data } = await aiClient.post("/search/", reqBody);

      const question = reqBody.question;
      const answer = data.output;
      const conversation = Math.floor(Math.random() * 1000000);
      if (data?.output) {
        if (conversation_key) {
          const secondResponse = await client.post("/history/", {
            question,
            answer,
            conversation_key: conversation_key,
          });

          // dispatch(setChatHistory(secondResponse));
          sentMsg({
            text: data.output,
            time: getMessageTime(),
            types: "received",
          });
          chatHistoryDisplay();
        } else if (existconversationKey) {
          const secondResponse = await client.post("/history/", {
            question,
            answer,
            conversation_key: existconversationKey,
          });
          console.log(secondResponse, "secondresponse print");
          // dispatch(setChatHistory(secondResponse));
          sentMsg({
            text: data.output,
            time: getMessageTime(),
            types: "received",
          });
          chatHistoryDisplay();
        } else {
          const num = historyApi.conversation_key;
          if (num) {
            const secondResponse = await client.post("/history/", {
              question,
              answer,
              conversation_key: num,
            });
            //  dispatch(setChatHistory(secondResponse));
            setHistoryApi(secondResponse.data);
            chatHistoryDisplay();
          } else {
            const secondResponse = await client.post("/history/", {
              question,
              answer,
              conversation_key: conversation,
            });

            setHistoryApi(secondResponse.data);
            chatHistoryDisplay();
            sentMsg({
              text: data.output,
              time: getMessageTime(),
              types: "received",
            });
          }
        }
      }
    } catch (error) {
      console.error(error);

      sentMsg({
        text: "Unable to get response. Please try again.",
        time: getMessageTime(),
        types: "received",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMessageTime = () => {
    //Get current system time
    const current = new Date();
    return current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Send a new messages
  const sendMessage = () => {
    const data = { ...message };
    sentMsg({ text: message.question, time: getMessageTime(), types: "sent" });
    setMessage(emptyMessage);
    searchRequest(data);
  };
  const handleClick = () => {
    sendMessage();
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <footer
      className="chat-footer d-flex justify-content-center align-items-center"
      style={{
        marginBottom: "2rem",
        marginLeft: "10vw",
        marginRight: "15vw",
        width: "75vw",
      }}
    >
      <Form.Group className="me-3">
        <Form.Select
          size="sm"
          className="w-200p"
          value={message.domain}
          onChange={(e) => setMessage({ ...message, domain: e.target.value })}
        >
          {domainList.map((option) => (
            <option value={option?.id} key={option?.id}>
              {option?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="">
        <Form.Select
          size="sm"
          className="w-180p"
          value={message.subDomain}
          disabled={!selectedDomain || !subDomainList.length}
          onChange={(e) =>
            setMessage({ ...message, subDomain: e.target.value })
          }
        >
          {subDomainList.map((option) => (
            <option value={option?.id} key={option?.id}>
              {option?.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <InputGroup>
        <span className="input-affix-wrapper">
          <Form.Control
            ref={messageRef}
            type="text"
            id="input_msg_send_chatapp"
            name="send-msg"
            className="input-msg-send rounded-input"
            placeholder={
              loading ? "Awaiting for response" : "Type your message..."
            }
            value={message.question}
            onChange={(e) =>
              setMessage({ ...message, question: e.target.value })
            }
            onKeyDown={onKeyDown}
          />
          <span className="input-suffix">
            {!!loading ? (
              <Button
                as="a"
                variant="link"
                disabled
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span className="user-status fs-1 me-2 mb-2">
                  <span className="one">.</span>
                  <span className="two">.</span>
                  <span className="three">.</span>
                </span>
              </Button>
            ) : (
              <Button
                variant="flush-primary"
                className="btn-icon btn-rounded btn-send"
                disabled={!message.question.length || !message.domain.length}
              >
                <span className="icon" onClick={handleClick}>
                  <span className="feather-icon">
                    <ArrowRight />
                  </span>
                </span>
              </Button>
            )}
          </span>
        </span>
      </InputGroup>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  conversation_key: state.conversationReducer.conversationKey,
  existconversationKey: state.conversationReducer.existconversationKey,
});

export default connect(mapStateToProps, { sentMsg })(ChatFooter);
