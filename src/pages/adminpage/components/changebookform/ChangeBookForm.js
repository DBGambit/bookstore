import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatingBook } from '../../../../redux/ducks/booksSlice';

import styles from './ChangeBookForm.module.css';

const ChangeBookForm = ({book}) => {

    const [fileBase64, setFileBase64] = useState('')

    const currentUser = useSelector(state => state.users.currentUser);

    const dispatch = useDispatch()

    const title = useRef('')
    const writer = useRef('')
    const yearPublished = useRef('')
    const genre = useRef('')
    const count = useRef('')
    const price = useRef('')
    const isbn = useRef('')


    const onFileChange = (e) => {
        const file = e.target.files[0]
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

    const changeBookHandler = (e, id) => {
        e.preventDefault()
        const changes = {
            title: title.current.value,
            writer: writer.current.value,
            yearPublished: yearPublished.current.value,
            genre: genre.current.value,
            count: count.current.value,
            isbn: isbn.current.value,
            price: price.current.value,
            img: fileBase64
        }

        dispatch(updatingBook({id, changes, idToken: currentUser.idToken}))
    }

    return (
            <div className={styles.FormDiv} >
                <h3>book id: {book.id}</h3>
                <form className={styles.ChangeForm} >
                    <label>title</label>
                    <input ref={title} type='text' defaultValue={book.title} />
                    <label >writer</label>
                    <input ref={ writer } defaultValue={book.writer} />
                    <label >year published</label>
                    <input ref={ yearPublished } defaultValue={book.yearPublished} />
                    <label >genre</label>
                    <input type='text' ref={ genre } defaultValue={book.genre} />
                    <label >count</label>
                    <input type='number' min={0} defaultValue={book.count} ref={ count } />
                    <label >ISBN</label>
                    <input type='number' min='0' ref={ isbn } defaultValue={book.isbn} />
                    <label >price</label>
                    <input type='number' min='0' ref={ price } defaultValue={book.price} />
                    <label >image</label>
                    <input type='file' onChange={(e) => onFileChange(e)} />
                    {
                        fileBase64 ? <p>image loaded )</p> : null
                    }
                    <button 
                        style={{display: 'block', margin: 'auto', marginTop: '10px'}} 
                        onClick={(e) => changeBookHandler(e, book.id)}
                    
                    >save changes</button>
                </form>
            </div>
    )
}

export default ChangeBookForm;