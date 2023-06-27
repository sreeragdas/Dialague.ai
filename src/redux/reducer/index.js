
import { combineReducers } from 'redux';
import ChatReducer from './Chat';
import ChatPopupReducer from './ChatPopup';
import EmailReducer from './Email';
import Theme from './Theme';
import ToDoReducer from './ToDo';
import chatHistoryReducer from './chathistoryReducer';
import conversationReducer from './conversationReducer';
const reducers = combineReducers({
    theme: Theme,
    chatReducer: ChatReducer,
    emailReducer: EmailReducer,
    chatPopupReducer: ChatPopupReducer,
    toDoReducer: ToDoReducer,
    chatHistoryReducer:chatHistoryReducer,
    conversationReducer:conversationReducer
});

export default reducers;