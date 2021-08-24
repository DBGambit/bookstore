import axios from 'axios';

const apiKey = process.env.REACT_APP_FIREBASE_APIKEY
const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL

export function requestSignUp(email, password) {
    const newUser = {
        email,
        password,
        returnSecureToken: true
    }
    return axios.request({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        method: 'post',
        data: newUser
    })
}

export function requestCreateUserDB(userData) {
    return axios.request({
        method: 'post',
        url: `${dbUrl}/users.json`,
        data: userData
    })
}

export function requestSignIn(email, password) {
    const data = {email, password, returnSecureToken: true}
    return axios.request({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        data
    })
}

export function requestGetUserByLocalId(localId) {
    return axios.request({
        method: 'get',
        url: `${dbUrl}/users.json?orderBy="localId"&equalTo="${localId}"`
    })
}