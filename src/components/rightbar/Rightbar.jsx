import "./rightbar.css"

import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"

import { Users } from '../../dummyData'
import Online from "../online/Online"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from "@material-ui/icons"


function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(currentUser?.followings?.includes(user?._id))

    useEffect(() => {
        setFollowed(currentUser.followings?.includes(user?._id))
    }, [currentUser, user])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`/api/users/friends/${user?._id}`)
                setFriends(friendList.data)
            } catch (err) {
                console.log(err)
            }
        }
        getFriends()
    }, [user?._id])

    console.log(user, "from profile")
    console.log(currentUser, "currentUser from profile")
    const handleFollow = async () => {
        try {
            if (followed) {
                await axios.put(`/api/users/${user?._id}/unfollow`, { userId: currentUser._id })
            } else {
                await axios.put(`/api/users/${user?._id}/follow`, { userId: currentUser._id })
            }
        } catch (e) {
            console.log(e)
        }
        setFollowed(!followed)
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Bruce Wayne</b> and <b>3 other friends</b> have birthdays today
                </span>
                </div>
                <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u} />
                    ))}

                </ul>
            </>
        )
    }


    const ProfileRightBar = () => {
        return (
            <>
                {user?.username !== currentUser?.username && (
                    <button className="rightbarFollowButton" onClick={handleFollow}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information </h4>

                <div className="rightbarInfo">
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {user.relationship === 1 ? "Single"
                                : user.relationship === 2 ? "Engaged"
                                    : user.relationship === 3 ? "Married" : "-"}
                        </span>
                    </div>

                </div>

                <h4 className="rightbarTitle">User friends </h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
                            <div key={friend._id} className="rightbarFollowing"><img src={friend.profilePicture} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}

                </div>

            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {
                    user ? <ProfileRightBar /> : <HomeRightBar />
                }

            </div>
        </div>

    )
}

export default Rightbar
