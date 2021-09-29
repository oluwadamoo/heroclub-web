import "./feed.css"

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import Share from "../share/Share"
import Post from "../post/Post"
import { AuthContext } from '../../context/AuthContext'

function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        const fetchPost = async () => {
            const res = username ?
                await axios.get(`/api/posts/profile/${username}`)
                : await axios.get(`/api/posts/timeline/${user?._id}`)
            // console.log(res)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPost()
    }, [username, user?._id])
    return (
        <div className="feed">
            <div className="feedWrapper">

                {(!username || username === user?.username) && <Share />}
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                )

                )}


            </div>
        </div>
    )
}

export default Feed
