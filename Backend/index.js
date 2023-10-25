import { db, PORT, storage } from './configs.js'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from 'firebase/storage'
import express from 'express'
import cors from 'cors'
import multer from'multer';


const app = express()
app.use(cors())
app.use(express.json())

//upload files to storage
const storageMiddleware = multer({ storage: multer.memoryStorage() });
app.post('/storage', storageMiddleware.single('file'), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const fileRef = ref(storage, `Myfiles/${req.file.originalname}`)
        await uploadBytes(fileRef, req.file.buffer);
        return res.status(200).send('Upload is successful!!');
    } catch (error) {
        return res.status(501).send(`${error}`);
        }
})

//list storage files
app.get('/storage', async(req, res) => {
    try {
        const fileRef = ref(storage, `Myfiles/`)
        const filey = await listAll(fileRef)
        const downloadURLs = await Promise.all(filey.items.map(async (item) => {
            return getDownloadURL(item);
        }));
        return res.status(200).json(downloadURLs)
    } catch (err) {
        return res.status(501).send('Error listing files')
    }
})

//listing requested files through downloads
// app.get('/book/covers', async(req, res) => {
//     const {search} = req.query
//     try {
//         const files = ref(storage, search)
//         const getImages = await getDownloadURL(files)
//         return res.status(200).json(getImages)
//     } catch (err) {
//         return res.status(501).send('Error getting images')
//     }
// })

//delete storage files
app.delete('/storage', async(req, res) => {
    const {fileName} = req.body
    try {
        const fileRef = ref(storage, `Myfiles/${fileName}`)
        await deleteObject(fileRef)
    } catch (err) {
        return res.status(501).send('Error deleting files')
    }
})


//adding to firestore DB
app.post('/click', async(req, res) => {
    try {
        const {text} = req.body
        if(!req.body) {
            return res.status(500).send('Entry cannot be blank')
        } else {
            const textField = {
                text
            }
            const docRef = await addDoc(collection(db, "users"), {
                textField
            });
            return res.status(201).send(`Document written with ID: , ${docRef.id}`);
        }
    } catch (e) {
        return res.status(501).send(`Error adding document: , ${e}`);
    }
})


//retrieving from firestore DB
app.get('/get', async(req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = []
        querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data()})
        });
        return res.status(200).json(userData); //sends data to the frontend
    } catch(error) {
        console.error(error);
        return res.status(501).send('Error retrieving documents')
    }
})

//deleting data
app.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const idList = await deleteDoc(doc(db, "users", id));
        return res.status(200).send('Deleted successfully!!!')
    } catch (err) {
        return res.status(501).send('Error Deleting Items!!!')
    }
})


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})