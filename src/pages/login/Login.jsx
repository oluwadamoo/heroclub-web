import React, { useRef, useContext } from 'react'
import { CircularProgress } from '@material-ui/core'


import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
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
                        <input type="email" placeholder="Email" className="loginInput" ref={email} required />
                        <input type="password" placeholder="Password" className="loginInput" ref={password} minLength="6" required />
                        <button type="submit" className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
