import { CONTACT_MSG, GROUP_MSG, REPLY_MSG, SENT_MSG, SET_USER, START_CHATING } from "../constants/Chat";

export function StartConversation(startChating) {
    return {
        type: START_CHATING,
        startChating
    };
}




export function sentMsg(msg) {
    console.log('called from action')
    console.log(msg , 'msg from action')
    return {
        type: SENT_MSG,
        msg,
    }
}

export function setUser(userId, avatar, userName) {
    return {
        type: SET_USER,
        userId,
        avatar,
        userName,
    }
}

export function groupMessage(grpMsg) {
    return {
        type: GROUP_MSG,
        grpMsg,
    }
}

export function contactsMessage(contactMsg) {
    return {
        type: CONTACT_MSG,
        contactMsg,
    }
}

export function getReply(rplyMsg) {
    return {
        type: REPLY_MSG,
        rplyMsg,
    }
}