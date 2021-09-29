
import React, { useContext, useRef, useState } from 'react'
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'

import { AuthContext } from '../../context/AuthContext'
import './share.css'
import axios from 'axios'

function Share() {

    const { user } = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    console.log(file)
    const submitHandler = async (e) => {
        e.preventDefault()

        const newPost = {
            userId: user?._id,
            desc: desc.current.value,
        }

        if (file) {
            const data = new FormData()
            data.append("file", file);
            data.append("upload_preset", "instagram-clone");
            data.append("cloud_name", "diils");
            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/diils/image/upload", data)

                newPost.img = res.data.url
            } catch (err) {
                console.log(err)
            }
        }



        try {
            await axios.post('https://super-heroclub.herokuapp.com/api/posts', newPost)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }


    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user?.profilePicture} className="shareProfileImg" alt="" />
                    <input type="text" ref={desc} placeholder={`what's in your mind ${user?.username}?`} className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancleImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>

                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
