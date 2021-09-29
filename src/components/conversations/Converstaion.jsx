import axios from 'axios'
import React, { useState, useEffect } from 'react'

import './conversation.css'

function Converstaion({ conversation, currentUser }) {
    const [user, setUser] = useState(null)



    useEffect(() => {
        const friendId = conversation?.members.find((m) => m !== currentUser._id)

        // console.log(friendId)


        const getUser = async () => {
            try {
                const res = await axios('/users?userId=' + friendId)
                // console.log(res.data)
                setUser(res.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [conversation, currentUser])
    return (
        <div className="conversation">
            <img src={user?.profilePicture} alt="" className="conversationImg" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Converstaion
