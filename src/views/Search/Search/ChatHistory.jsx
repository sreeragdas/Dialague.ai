import './chatHistory.css'
import { Plus } from "react-feather";
const ChatHistory = ({ msg }) => {
    return (
        <div className="sidebar" style={{backgroundColor:'black' , width:'12%' , height:'100vh'}}>
        {/* Sidebar content */}
        <button className="addChatButton"> <Plus/><span style={{marginLeft:'5px'}}>New Chat</span></button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    );
  };
  export default ChatHistory;