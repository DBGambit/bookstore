import { firebase } from '../initFirebase';
import { useEffect, useState, useContext, createContext } from "react";

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}



const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsLoggingIn(false)
        })

        return () => unsubscribe()
    }, [])

    const sendSignInLinkToEmail = email => {
        return firebase.auth().sendSignInLinkToEmail(email, {
            url: 'http://localhost:3000',
            handleCodeInApp: true
        }).then(() => true)
    }


    const signInWithEmailLink = (email, code) => {
        return firebase.auth().signInWithEmailLink(email, code).then(result => {
            setCurrentUser(result.user)
            return true
        })
    }

    const logOut = () => firebase.auth().signOut().then(() => setCurrentUser(null))

    const values = {
        currentUser,
        isLoggingIn,
        sendSignInLinkToEmail,
        signInWithEmailLink,
        logOut
    }

    return (
        <AuthContext.Provider value={values}>
            {!isLoggingIn && children}
        </AuthContext.Provider>
    )

}

export { AuthProvider }