import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';

import { getBooks, deletingBook, addingBook } from '../../redux/ducks/booksSlice';

import ChangeBookForm from './components/changebookform/ChangeBookForm';

import Modal from '../../ui/modal/Modal';

import styles from './AdminPage.module.css';


const AdminPage = (props) => {
    const [fileBase64, setFileBase64] = useState('')
    const [showBookDetail, setShowBookDetail] = useState(false)
    const [currentBook, setCurrentBook] = useState(null)

    console.log('currentBook', currentBook)
    console.log('base64', fileBase64)

    const currentUser = useSelector(state => state.users.currentUser)
    console.log('admin page cu', currentUser)
    const books = useSelector(state => state.books)
    console.log('books adminPage', books)
    const dispatch = useDispatch()

    const title = useRef('')
    const writer = useRef('')
    const yearPublished = useRef('')
    const genre = useRef('')
    const count = useRef('')
    const isbn = useRef('')
    const price = useRef('')

    const addBookHandler = (e) => {
        e.preventDefault()
        const newBook = {
            title: title.current.value,
            writer: writer.current.value,
            yearPublished: yearPublished.current.value,
            genre: genre.current.value,
            count: count.current.value,
            isbn: isbn.current.value,
            price: price.current.value,
            img: fileBase64
        }
        dispatch(addingBook({newBook, idToken: currentUser.idToken}))
        title.current.value = ''
        writer.current.value = ''
        yearPublished.current.value = ''
        genre.current.value = ''
        count.current.value = 0
        isbn.current.value = 0
        price.current.value = 0

        setFileBase64('')

        title.current.focus()
    }


    const onFileChange = (e) => {
        // console.log('file changed')
        const file = e.target.files[0]
        // console.log('choosen file', file)
        encodeToBase64(file)
    }

    const encodeToBase64 = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                let base64 = reader.result
                setFileBase64(base64)
            }
            reader.onerror = err => console.log(err)
        }
    }

    return (
        <>
        <Modal closing={() => [setShowBookDetail(false), setCurrentBook(null)]} show={showBookDetail} >
            {
                currentBook ?
                <ChangeBookForm book={currentBook} />
                : <h3>Loading...</h3>
            }
        </Modal>
        <h1 style={{width: '30%', margin: 'auto', textAlign: 'center', marginBottom: '10px'}} >Admin Page</h1>
        <div className={styles.AdminPage}>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div className={styles.FormDiv} >
                    <form>
                        <p style={{fontWeight: 'bold'}} >Add new book</p>
                        <label >title</label>
                        <input ref={ title } />
                        <label >writer</label>
                        <input ref={ writer } />
                        <label >year published</label>
                        <input ref={ yearPublished } />
                        <label >genre</label>
                        <input type='text' ref={ genre } />
                        <label >count</label>
                        <input type='number' min={0} defaultValue={0} ref={ count } />
                        <label >ISBN</label>
                        <input type='number' min='0' ref={ isbn } />
                        <label >price(per book)</label>
                        <input type='number' min='0' ref={ price } />
                        <label >image</label>
                        <input type='file' onChange={(e) => onFileChange(e)} />
                        {
                            fileBase64 ? <p>image loaded )</p> : null
                        }
                        <button 
                            style={{display: 'block', margin: 'auto', marginTop: '10px'}} 
                            onClick={(e) => addBookHandler(e)}
                        
                        >add</button>
                    </form>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}} >
            <button style={{marginBottom: '10px'}} onClick={() => dispatch(getBooks())}>show all books</button>
        </div>
        <div className={styles.TableDiv} >
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th style={{width: '20%'}} >count</th>
                        <th>actions</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => {
                            return (
                                <tr key={book.id} >
                                    <td style={{width: '20%'}} >{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>
                                        {book.count}
                                    </td>
                                    <td>
                                        <div style={{display: 'flex', justifyContent: 'space-evenly'}} >
                                            <button
                                                onClick={() => dispatch(deletingBook({bookId: book.id, idToken: currentUser.idToken}))}
                                            >delete</button>
                                            <button onClick={() => [setShowBookDetail(true), setCurrentBook(book)]} >change</button>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={book.img} width={'30px'} alt='cant found' />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default AdminPage;