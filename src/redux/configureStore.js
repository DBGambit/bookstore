import { configureStore, combineReducers } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";

import books from './ducks/booksSlice';
import users from './ducks/usersSlice';
import orders from './ducks/ordersSlice';

const sagaMiddlware = createSagaMiddleware();

const reducer = combineReducers({
    books,
    users,
    orders
})

const store = configureStore({
    reducer,
    middleware: [sagaMiddlware]
})

sagaMiddlware.run(rootSaga)

export default store;