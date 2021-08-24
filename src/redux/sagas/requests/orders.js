import axios from 'axios';

const dbUrl = process.env.REACT_APP_FIREBASE_DB_URL;

export function requestBookOrder(user, book, quantity) {
    const { email, userName, mobile, localId } = user
    const data = { email, userName, mobile, localId, quantity, book }
    return axios.request({
        method: 'post',
        url: `${dbUrl}/orders.json`,
        data
    })    
}