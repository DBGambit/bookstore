import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signingUp, signingIn, signOut } from '../../redux/ducks/usersSlice';

import { adminIds } from './adminIds';

import styles from './AuthPage.module.css';

const AuthPage = (props) => {
    const [signupMode, setSignupMode] = useState(false)
    const history = useHistory()

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.users.currentUser)
    console.log('cr', currentUser)

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const userNameRef = useRef('')
    const mobileRef = useRef('')

    if (currentUser) {
        history.push(currentUser.isAdmin && adminIds.includes(currentUser.localId) ? '/admin' : '/') // after successfull signin redirect
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const userName = userNameRef.current.value
        const mobile = mobileRef.current.value
        const payload = {email, password, userName, mobile}

        dispatch(signingUp(payload))
        emailRef.current.value = ''
        passwordRef.current.value = ''
        userNameRef.current.value = ''
        mobileRef.current.value = ''
        setSignupMode(false)
    }

    const signingInHandler = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const payload = {email, password}
        dispatch(signingIn(payload))
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }

    const singUpClickHandler = () => {
        emailRef.current.value = ''
        passwordRef.current.value = ''
        setSignupMode(true)
    }

    const signInClickHandler = () => {
        emailRef.current.value = ''
        passwordRef.current.value = ''
        userNameRef.current.value = ''
        mobileRef.current.value = ''
        setSignupMode(false)
    }

    return (
        signupMode ?
        <div className={styles.AuthDiv}>
            {
                currentUser ? <p onClick={() => dispatch(signOut())} >signOut</p> : null
            }
            <h3>SignUp</h3>
            <form className={styles.Form}>
                <label>Username</label>
                <input ref={userNameRef} type='text' required={true} minLength='5' />
                <label>Email</label>
                <input ref={emailRef} type='email' required={true} />
                <label>Pass</label>
                <input ref={passwordRef} type='password' required={true} />
                <label>Mobile</label>
                <input ref={mobileRef} type='number' required={true} />
                <button onClick={(e) => signUpHandler(e)}>SignUp</button>
                <p>Switch to <span onClick={signInClickHandler} >SignIn</span></p>
            </form>
        </div> :
        <div className={styles.AuthDiv}>
            {
                currentUser ? <p onClick={() => dispatch(signOut())} >signOut</p> : null
            }
            <h3>Login</h3>
            <form className={styles.Form}>
                <label>Email</label>
                <input ref={emailRef} type='email' required={true} />
                <label>Pass</label>
                <input ref={passwordRef} type='password' required={true} />
                <button onClick={(e) => signingInHandler(e)}>LogIn</button>
                <p>Dont have account yet ? <span onClick={singUpClickHandler}>SignUp</span></p>
            </form>
        </div>
    )
};

export default AuthPage;