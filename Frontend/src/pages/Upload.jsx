import React, { useState } from 'React'
import axios from 'axios'
import upload from '../assets/upload.png'
import { useSnackbar } from 'notistack'

const Upload = () => {
    const [file, setFile] = useState([])
    const [progress, setProgress] = useState(0)
    const [uploading, setUploading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const uploadChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const uploadButton = () => {
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true)
            axios.post('http://localhost:3333/storage', formData , {
                headers: { 'Content-Type': 'multipart/form-data',} ,
                onUploadProgress: (progressEvent) => {
                    // Calculate the progress percentage
                    const percentage = (progressEvent.loaded / progressEvent.total) * 100;
                    setProgress(percentage);
                },
                
        }) 
            .then(res => {
                enqueueSnackbar('File uploaded successfully', { variant: 'success'})
                setUploading(false);
                setProgress(0)
            })
            .catch(err => {
                setUploading(false);
                setProgress(0);
                enqueueSnackbar('Error', { variant: 'error' });
            })
    }
    return (
        <>
            <div>
                <div>
                    <label>
                        <input type="file" onChange={uploadChange} name="file" />
                    </label>
                    {uploading && (
                        <progress value={progress} max={100} />
                    )}
                </div>
                <img src={upload} className='image-upload' onClick={uploadButton} />
            </div>
        </>
    )
}

export default Upload