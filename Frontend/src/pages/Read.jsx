import React, { useEffect , useState, useCallback } from 'React'
import axios from 'axios'
import trash from '../assets/trash.png'
import Copy from '../assets/copy.png'
import { useSnackbar } from 'notistack'

const Read = () => {
    const [data, setData] = useState([])
    const { enqueueSnackbar } = useSnackbar();

    const deleteItem = async(id) => {
        try {
            await axios.delete(`http://localhost:3333/delete/${id}`)
            enqueueSnackbar('Items Deleted Successfully', { variant: 'success'})
        } catch (err) {
            enqueueSnackbar('error', { variant: 'error'})
        }
    }

    const copyItem = (text) => {
        if(navigator.clipboard) {
            navigator.clipboard.writeText(text)
            enqueueSnackbar('copied item', { variant: 'success'})
        } else {
            enqueueSnackbar('error copying details', { variant: 'error'})
        }
    }

    const getList = useCallback(() => {
        axios.get('http://localhost:3333/get')
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                enqueueSnackbar(`${err}`, { variant: 'error'})
            })
    }, [data])

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <>
                <div>
                    {data.map((item, index) => (
                            <div className='map-div'  key={index}>
                                {item.textField.text && (
                                    <>
                                        <p>{item.textField.text}</p>
                                        <div>
                                            <img className='trash-image' onClick={() => deleteItem(item.id)} src={trash} />
                                            <img className='copy-image' src={Copy} onClick={() => copyItem(item.textField.text)} />
                                        </div>
                                    </>
                                )}
                                
                            </div>
                        ))
                    }
                </div>
        </>
    )
}

export default Read