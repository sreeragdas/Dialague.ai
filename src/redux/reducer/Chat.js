import { START_CHATING, SENT_MSG, REPLY_MSG, GROUP_MSG, CONTACT_MSG, SET_USER } from "../constants/Chat";
//images
import avatar8 from '../../assets/dist/img/avatar8.jpg';

const initialState = {
    startChating: false,
    avatar: avatar8,
    userId: 2,
    userName: "Huma Therman",
    msg: [],
    grpMsg: [],
    contactMsg: [],
    rplyMsg: [],
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CHATING:
            console.log('START_CHATING')
            return {
                ...state,
                startChating: action.startChating,
                startChating: false,
                avatar: avatar8,
                userId: 2,
                userName: "Huma Therman",
                msg: [],
                grpMsg: [],
                contactMsg: [],
                rplyMsg: [],
             
            };
        case SENT_MSG:
            console.log('SENT_MSG')
            console.log(action.msg , 'aaaaction.msg')
            return {
                ...state,
                msg: [...state.msg, action.msg]
            };
        case SET_USER:
            console.log('SET_USER')
            return {
                ...state,
                userId: action.userId,
                avatar: action.avatar,
                userName: action.userName,

            };
        case GROUP_MSG:
            console.log('GROUP_MSG')
            return {
                ...state,
                grpMsg: [...state.grpMsg, action.grpMsg]
            };
        case CONTACT_MSG:
            console.log('GCONTACT_MSG')
            return {
                ...state,
                contactMsg: [...state.contactMsg, action.contactMsg]
            };
        case REPLY_MSG:
            console.log('REPLY_MSG')
            return {
                ...state,
                rplyMsg: [...state.rplyMsg, action.rplyMsg]
            };
        default:
            console.log('default')
            return state;
    }
};

export default ChatReducer;