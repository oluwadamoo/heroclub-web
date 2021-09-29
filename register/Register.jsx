import axios from 'axios'
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'

import './register.css'

function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords do not match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                const res = await axios.post("https://super-heroclub.herokuapp.com/api/auth/register", user)
                history.push('/login')
            }
            catch (err) {
                console.log(err)
            }

        }

    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Heroclub</h3>
                    <span className="loginDesc">
                        Connect with super heros in your multiverse and other multiverses on Heroclub
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" className="loginInput" required ref={username} />
                        <input type="email" placeholder="Email" className="loginInput" required ref={email} />
                        <input type="password" placeholder="Password" className="loginInput" required ref={password} minLength="6" />
                        <input type="password" placeholder="Confirm Password" className="loginInput" required ref={confirmPassword} />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
