import { call, put } from 'redux-saga/effects';
import { setBooks, deleteBook } from '../../ducks/booksSlice';
import { requestGetBooks, requestDeleteBook, requestAddBook, requestUpdateBook } from '../requests/books';

export function* handleGetBooks(action) {
    try {
        const res = yield call(requestGetBooks);
        if (res && res.status === 200) {
            console.log(res)
            const books = Object.keys(res.data).reduce((a,b) => {
                a.push({id: b, ...res.data[b]})
                return a
            }, [])
            yield put(setBooks(books))
        }
    }catch(err) {
        console.log(err)
    }
}

export function* handleDeleteBook(action) {
    try {
        const {bookId, idToken} = action.payload
        const res = yield call(() => requestDeleteBook(bookId, idToken))
        if (res && res.status === 200) {
            yield put(deleteBook(action.payload))
        }
    }catch(err) {
        console.log(err)
    }
}

export function* handleAddBook(action) {
    try {
        const { newBook, idToken } = action.payload
        const addBookRes = yield call(() => requestAddBook(newBook, idToken))
        if (addBookRes && addBookRes.status === 200) {
            const res = yield call(requestGetBooks)
            if (res && res.status === 200) {
                const books = Object.keys(res.data).reduce((a,b) => {
                    a.push({id: b, ...res.data[b]})
                    return a
                }, [])
                yield put(setBooks(books))
            }
        }
    }catch(err) {
        console.log(err)
    }
}

export function* handleUpdateBook(action) {
    try {
        const {id, changes, idToken} = action.payload
        yield call(() => requestUpdateBook(id, changes, idToken))
        const res = yield call(requestGetBooks)
        const books = Object.keys(res.data).reduce((a,b) => {
            a.push({id: b, ...res.data[b]})
            return a
        }, [])
        yield put(setBooks(books))
    }catch(err) {
        console.log(err)
    }
}