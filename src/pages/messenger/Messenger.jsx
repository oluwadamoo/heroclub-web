import React, { useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

import ChatOnline from '../../components/chatOnline/ChatOnline'
import Converstaion from '../../components/conversations/Converstaion'
import Message from '../../components/message/Message'


import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './messenger.css'

function Messenger() {

    const [conversations, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const { user } = useContext(AuthContext)
    const scrollRef = useRef()


    useEffect(() => {
        socket.current = io("ws://my-chatapps-api.herokuapps.com")


        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })

    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user?._id)
        socket.current.on("getUsers", users => {
            console.log(users)
            console.log(user.followings)
            setOnlineUsers(
                user?.followings.filter((f) => users.some((u) => u?.userId === f)))
        })
    }, [user])


    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axios.get('/api/conversations/' + user._id)

                setConversation(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversation()
    }, [user?._id])


    useEffect(() => {
        const getMessages = async () => {
            try {
                //console.log(currentChat)
                const res = await axios.get("/api/messages/" + currentChat?._id)
                setMessages(res.data)
            } catch (e) {
                console.log(e)
            }

        }
        getMessages()

    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        const receiverId = currentChat.members.find(m => m !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axios.post("/api/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for Friends" className="chatMenuInput" />

                        {conversations.map((c) => (
                            <div key={c._id} onClick={() => setCurrentChat(c)}>
                                <Converstaion currentUser={user} conversation={c} />
                            </div>
                        ))
                        }

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                    <div className="chatBoxTop">

                                        {messages.map(m => (
                                            <div key={m._id} ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput" placeholder="write something..."></textarea>
                                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                    </div></> : <span className="noConversationText">Open a converation to start a chat</span>
                        }

                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user?._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
