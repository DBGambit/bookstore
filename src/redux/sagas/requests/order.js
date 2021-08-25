import axios from 'axios';

const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL;

export function requestBookOrder(user, book, quantity) {
    const { email, userName, mobile, localId, idToken } = user
    const data = { email, userName, mobile, localId, quantity, book: {title: book.title, id: book.id}, orderedAt: (new Date()).toISOString() }
    console.log('data', data)
    return axios.request({
        method: 'post',
        url: `${dbUrl}/orders.json?auth=${idToken}`,
        data
    })
}
