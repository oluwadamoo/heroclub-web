import React from 'react'
import { format } from 'timeago.js'

import './message.css'

function Message({ message, own }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src="https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg" alt="" className="messageImg" />
            </div>
            <p className="messageText">{message.text}</p>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
