import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router"

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import './profile.css'

function Profile() {
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const username = useParams().username

    const [user, setUser] = useState({})
    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`https://super-heroclub.herokuapp.com/api/users?username=${username}`)
            // console.log(res)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture} className="profileCoverImg" alt="" />
                            <img src={user.profilePicture} className="profileUserImg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>

                </div>

            </div>

        </>
    )
}

export default Profile
