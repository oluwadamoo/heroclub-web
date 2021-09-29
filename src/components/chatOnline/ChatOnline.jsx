import axios from 'axios'
import React, { useState, useEffect } from 'react'

import './chatOnline.css'

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/api/users/friends/" + currentId)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers])

    const gotoChat = async (user) => {
        try {
            const res = await axios.get(`/api/conversations/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="chatOnline">
            {
                onlineFriends.map(o => (
                    <div className="chatOnlineFriend" onClick={() => { gotoChat(o) }}>
                        <div className="chatOnlineImgContainer">
                            <img src={o.profilePicture} alt="" className="chatOnlineImg" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o.username}</span>
                    </div>
                ))
            }

        </div>
    )
}

export default ChatOnline
