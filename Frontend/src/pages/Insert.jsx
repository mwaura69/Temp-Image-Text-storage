import React, { useState } from 'react'
import axios from 'axios'
import add from '../assets/add.png'
import { useSnackbar } from 'notistack'

const Insert = () => {
    const [text, setText] = useState('')
    const { enqueueSnackbar } = useSnackbar();
    const addToInput = () => {
        if (!text) {
            alert('Cannot Be Blank!!')
        } else {
            axios.post('http://localhost:3333/click', {text})
            .then((res) => {
                enqueueSnackbar('Text inserted successfully', { variant: 'success'})
                setText('')
            })
            .catch((error) => {
                enqueueSnackbar(`Error inserting document, ${error}`, { variant: 'error' });
            })
        }
    }
    return (
        <>
            <div className='insert-div'>
                <textarea name="message" type='text' value={text} onChange={(e) => setText(e.target.value)} />
                <img className='image-add' onClick={addToInput} src={add} />
            </div>
        </>
    )
}

export default Insert