

import classNames from 'classnames';

//Redux


import React, { useEffect, useState } from 'react';
import ContactList from './ContactList';
import ChatBody from './ChatBody';
import ChatFooter from '../ChatFooter';


import { useWindowWidth } from '@react-hook/window-size';
//Redux
import { connect } from 'react-redux';
import { StartConversation } from '../../../redux/action/Chat';



const Chats = ({ startChating }) => {
console.log(startChating , 'starchating from index')
    const [showInfo, setShowInfo] = useState(true);
    const [invitePeople, setInvitePeople] = useState(false);

    const windowWidth = useWindowWidth();
    useEffect(() => {
        if (windowWidth <= 1199) {
            setShowInfo(false);
        }
        else {
            setShowInfo(true)
        }
    }, [windowWidth])

    return (
        <div className="hk-pg-body py-0">
            <div className={classNames("chatapp-wrap", { "chatapp-info-active": showInfo }, { "chatapp-slide": startChating })}>
                <div className="chatapp-content">
                    <ContactList invitePeople={() => setInvitePeople(!invitePeople)} />
                    <div className="chatapp-single-chat" style={{overflow:'auto'}}>
                    <ChatBody />
                        {/*  */}
            
                        <ChatFooter />
                    </div>
                    {/* Invite People */}
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = ({ chatReducer }) => {
    const { startChating } = chatReducer;
    return { startChating }
};

export default connect(mapStateToProps, { StartConversation })(Chats);
