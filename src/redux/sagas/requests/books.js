import axios from 'axios';

const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL

export function requestGetBooks() {
    console.log(process.env)
    return axios.request({
        method: 'get',
        url: `${dbUrl}/books.json`
    })
}

export function requestDeleteBook(id, idToken) {
    return axios.request({
        method: 'delete',
        url: `${dbUrl}/books/${id}.json?auth=${idToken}`
    })
}

export function requestAddBook(book, idToken) {
    return axios.request({
        method: 'post',
        url: `${dbUrl}/books.json?auth=${idToken}`,
        data: book
    })
}

export function requestUpdateBook(id, changes, idToken) {
    console.log('token update request', idToken)
    return axios.request({
        method: 'put',
        url: `${dbUrl}/books/${id}.json?auth=${idToken}`,
        data: changes
    })
}