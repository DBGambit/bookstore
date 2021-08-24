import { call, put, delay } from "@redux-saga/core/effects";

import { requestSignUp, requestCreateUserDB, requestSignIn, requestGetUserByLocalId } from "../requests/users";
import { setCurrentUser, signOut } from "../../ducks/usersSlice";


export function* handleAutoSignIn(action) {
    try {
        const userLS = action.payload
        const newExpirationTime = new Date(userLS.expirationDate) - Date.now()   // calculationg new expirationTime for autologout
        yield put(setCurrentUser(userLS))
        yield delay(+newExpirationTime)
        yield put(signOut())   // signout after token expiration time
    }catch(err) {
        console.log(err)
    }
}

export function* handleSignUp(action) {
    try {
        const {email, password, userName, mobile} = action.payload
        const response = yield call(() => requestSignUp(email, password))
        if (response && response.status === 200) {
            const { data } = response
            console.log('res data', data)
            const newUserDB = {
                email: data.email,
                localId: data.localId,
                userName,
                mobile,
                isAdmin: false,
                purchaseHistory: []
            }
            const createUserResponse = yield call(() => requestCreateUserDB(newUserDB))
            console.log('createUser response', createUserResponse)
        }
    }catch(err) {
        console.log(err)
    }
}

export function* handleSignIn(action) {
    try {
        const {email, password} = action.payload
        console.log(email, password)
        const response = yield call(() => requestSignIn(email, password))
        if (response && response.status === 200) {
            console.log('res', response)
            const { data } = response
            const {localId, email, idToken, expiresIn} = data
            const userDB = yield call(() => requestGetUserByLocalId(localId))   // getting additional user data from db
            console.log(userDB)
            const {isAdmin, mobile, userName, purchaseHistory} = Object.values(userDB.data)[0]
            console.log(isAdmin, mobile, purchaseHistory)
            const expirationDate = new Date(Date.now() + Number(expiresIn * 1000))   // calculating token expiration date
            const user = {email, isAdmin, localId, mobile, purchaseHistory, userName, idToken, expirationDate}   // creating user object for state and local storage
            try {
                localStorage.setItem('currentUser', JSON.stringify(user))
            }catch(err) {
                console.log('problem with local storage')
            }            
            yield put(setCurrentUser(user))
            yield delay(Number(expiresIn) * 1000)
            yield put(signOut())   // signout after token expiration time
        }
    }catch(err) {
        console.log(err)
    }
}