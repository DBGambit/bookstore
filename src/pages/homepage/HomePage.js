import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../../redux/ducks/booksSlice";
import { signOut } from "../../redux/ducks/usersSlice";

import { makingOrder } from "../../redux/ducks/ordersSlice";

import { Link, useHistory } from "react-router-dom";

const HomePage = (props) => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books)
    const currentUser = useSelector(state => state.users.currentUser)

    console.log('books', books)
    const history = useHistory()

    useEffect(() => {
        dispatch(getBooks())
    }, [])

    const bookCardClickHandler = (book) => {
        history.push({
            pathname: `/book/${book.id}`,
            state: {book}
        })
    }

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
                            <p>{book.price}</p>
                            
                            {/*<Link to={`/book/${book.id}`} >
                                <button
                                    // onClick={() => dispatch(makingOrder({user: currentUser, book, quantity: 5}))}
                                    // onClick={() => history.push(`/book/${book.id}`)}
                                >see more
                                </button>
                            </Link>*/}
                            <button
                                // onClick={() => dispatch(makingOrder({user: currentUser, book, quantity: 5}))}
                                // onClick={() => history.push(`/book/${book.id}`)}
                                onClick={() => bookCardClickHandler(book)}
                            >see more
                            </button>
                        </div>
                    )
                })
            }
        </>

    )
}

export default HomePage;