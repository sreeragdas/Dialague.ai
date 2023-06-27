import React, { useEffect, useState } from 'react';
import ContactList from './ContactList';
import ChatBody from './ChatBody';
import ChatInfo from './ChatInfo';
import ChatFooter from '../ChatFooter';
import classNames from 'classnames';
import InvitePeopleModal from '../InvitePeopleModal';
import ChatHeader from '../ChatHeader';
import { useWindowWidth } from '@react-hook/window-size';
//Redux
import { connect } from 'react-redux';
import { StartConversation } from '../../../redux/action/Chat';

const Chats = ({ startChating }) => {

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
                    <div className="chatapp-single-chat">
                        <ChatHeader infoState={showInfo} infoToggle={() => setShowInfo(!showInfo)} invitePeople={() => setInvitePeople(!invitePeople)} />
                        <ChatBody />
                        <ChatFooter />
                        {/* <ChatInfo infoToggle={() => setShowInfo(!showInfo)} /> */}
                    </div>
                    {/* Invite People */}
                    <InvitePeopleModal show={invitePeople} onClose={() => setInvitePeople(!invitePeople)} />
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
