import React, { useState, useEffect, useCallback} from 'React'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const Files = () => {
    const[items, setItems] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const listAllFiles = useCallback(() => {
        axios.get('http://localhost:3333/storage')
            .then((res) => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                enqueueSnackbar(`${err}`, { variant: 'error'})
            })
    }, [])
    useEffect(() => {
        listAllFiles()
    }, [listAllFiles])

    const deleteFiles = async(del) => {
        try {
            await axios.delete(`http://localhost:3333/delete`, )
            enqueueSnackbar('Files Deleted Successfully', { variant: 'success'})
        } catch (err) {
            enqueueSnackbar('Error deleting files', { variant: 'error'})
        }
    }

    return (
        <>
            <div>
                {items.map((item, index) => (
                    <>
                        <div key={index}>
                            <img
                                key={index}
                                src={item}
                                alt={`Image ${index}`} width='100px' height='150px'
                            />
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Files