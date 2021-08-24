import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { autoSigningIn, signOut } from './redux/ducks/usersSlice';

import Routes from './routes/pageRoutes';

const BookStore = (props) => {

    // const currentUser = useSelector(state => state.users.currentUser)
    const dispatch = useDispatch()

    // console.log('currentUser from Bookstore', currentUser)

    useEffect(() => {
        let currentUserLS
        try {
            currentUserLS = JSON.parse(localStorage.getItem('currentUser'))
        }catch(err) {
            console.log('problem with local storage')
        }

        if (currentUserLS) {
            const expirationDate = new Date(currentUserLS.expirationDate)
            const newExpirationTime = expirationDate - Date.now()
            console.log('newExpirationDate from Bookstore', newExpirationTime)
            console.log('currentUserLS', currentUserLS)
            if (expirationDate > new Date()) {
                dispatch(autoSigningIn(currentUserLS))
            }else {
                dispatch(signOut())
            }
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

export default BookStore;