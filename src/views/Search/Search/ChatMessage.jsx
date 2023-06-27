import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Copy, CheckSquare } from 'react-feather';
import { copyToClipboard } from '../../../utils/common-util';

import chatGptIcon from '../../../assets/dist/img/chatgpt-icon-48x48.png';
import botIcon from '../../../assets/dist/img/bot-icon-48x48.png';
import { formattedResponse } from '../../../utils/common-util';


const avatarImages = {
    'internal': botIcon,
    'external': chatGptIcon,
}

function ChatMessage({ chat }) {
    console.log(chat , 'from props from chat message')
    const [copied, setCopied] = useState(false);

    const copyText = (text) => {
        const result = copyToClipboard(text);
        if (result) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <>
            {chat.types === 'received' && (
                <div className="avatar avatar-xs avatar-rounded">
                    <img src={avatarImages['internal']} alt="Internal" className="avatar-img" />
                    {/* <img src={avatarImages['external']} alt="External" className="avatar-img" /> */}
                </div>
            )}
            <div className="media-body">
                <div className="msg-box" id="msg-1">
                    <div>
                        <p>{formattedResponse(chat.text)}</p>
                        <span className="chat-time">{chat.time}</span>
                    </div>
                    <div className="msg-action">
                        {copied && (<Button
                            className="btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                        >
                            <span className="icon">
                                <span className="feather-icon">
                                    <CheckSquare />
                                </span>
                            </span>
                        </Button>)
                        }

                        {!copied && (<Button
                            onClick={() => copyText(chat.text)}
                            className="btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                        >
                            <span className="icon">
                                <span className="feather-icon">
                                    <Copy />
                                </span>
                            </span>
                        </Button>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatMessage;