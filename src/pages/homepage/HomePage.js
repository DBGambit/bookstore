import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../../redux/ducks/booksSlice";
import { signOut } from "../../redux/ducks/usersSlice";

import { Link } from "react-router-dom";

const HomePage = (props) => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books)
    const currentUser = useSelector(state => state.users.currentUser)

    console.log('books', books)

    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <>
            <div style={{height: '50px', width: '80%', margin: 'auto', border: '1px solid black', display: 'flex', justifyContent: 'space-between'}} >
                {
                    currentUser ? <p style={{margin: '0'}} onClick={() => dispatch(signOut())} >SignOut</p> : <Link to='/auth' >LogIn</Link>
                }
                
            </div>
            <h3>
                HomePage
            </h3>
            <button onClick={() => dispatch(getBooks())} >fetch books</button>
            {
                books.map(book => {
                    return (
                        <div key={book.id} style={{width: '300px', border: '1px solid black'}}>
                            <p>{book.title}</p>
                            <p>{book.writer}</p>
                        </div>
                    )
                })
            }
        </>

    )
}

export default HomePage;