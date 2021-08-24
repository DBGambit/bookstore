import axios from 'axios';

const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL

export function requestGetBooks() {
    console.log(process.env)
    return axios.request({
        method: 'get',
        url: `${dbUrl}/books.json`
    })
}

export function requestDeleteBook(id) {
    return axios.request({
        method: 'delete',
        url: `${dbUrl}/books/${id}.json`
    })
}

export function requestAddBook(book) {
    return axios.request({
        method: 'post',
        url: `${dbUrl}/books.json`,
        data: book
    })
}

export function requestUpdateBook(id, changes) {
    console.log('axios', id, changes)
    return axios.request({
        method: 'patch',
        url: `${dbUrl}/books/${id}.json`,
        data: changes
    })
}