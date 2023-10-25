## Text and Image Insert

This project involves inserting and retrieving text and images from Firestore DB and Firestore Storage.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Getting Started

To begin with this project, we will be using React v18 (React-Vite) and Firestore DB and Firebase Storage. If you don't have an account, sign up [here](https://console.firebase.google.com/.).

### Prerequisites

Make sure you have the following prerequisites:

- Firebase account
- React-Vite
- Axios
- Express
- Nodemon
- Notistack

### Installation

1. Start by creating a project directory. You can name it however you like. For this example, we'll use 'copy-paste':

    ```bash
    mkdir copy-paste
    ```

2. Inside the "copy-paste" directory, create two additional folders for the backend and frontend:

    ```bash
    mkdir Backend && mkdir Frontend
    ```

3. Navigate to the "Backend" directory and create an "index.js" file.

4. Initialize the folder using the following commands:

    ```bash
    npm init -y
    npm set "type" "module"
    ```

5. In the "package.json" file, enable ES modules by adding the `"type": "module"` property. In the "scripts" section, make sure your code is configured as follows:

    ```json
    "scripts": {
        "dev": "node server.js",
        "start": "nodemon server.js"
    }
    ```

6. Install the necessary dependencies:

    ```bash
    npm install firebase nodemon express cors multer
    ```

7. After signing up for the Firebase Console and enabling storage and database, you will receive a Firebase configuration that allows you to access the Firestore DB and Firebase Storage.

8. Create a folder called "firebase," and inside it, create a file named "config.js" to store all the Firebase auth. It should look like this:

    ```javascript
    export const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-auth-domain",
        projectId: "your-project-id",
        storageBucket: "your-storage-bucket",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id"
    };
    ```

   To prevent initialization errors, make sure you initialize your app and storage from this file:

    ```javascript
    import { initializeApp } from "firebase/app";
    import { getStorage } from "firebase/storage";

    const app = initializeApp(firebaseConfig);
    export const storage = getStorage(app);
    ```


### Usage

Navigate to the *index.js* file and import the necessary dependencies like **firestore, multer express cors* and the exported *storage*

The reason we are using multer is because we are parsing images from the frontend to the backend and we want a middleware to be able to parse it before sending to the database.

We are going to use **GET** **POST** **DELETE** to fetch, send and delete data from the database
Make sure you also define your PORT to one that is not being used by your comp

We are performing the fetch, delete, and send functions from the database to the frontend for security reasons.

**Frontend**

Navigate to the frontend folder and create a Vite project ```bash npm create vite```

Install dependencies ```bash npm install axios notistack```

Inside the src folder create a folder **pages** where we are going to house all the pages of our project. Create another one called **navigation** and this is where our nav bar is going to be.

In the **pages** folder create four files **Upload, Insert, Read, Files** Each file is going to house its respective function of fetching data. In the **Navigation** folder create a **Nav** file to handle the routing of the above-listed pages.

The notistack we installed earlier is a very convenient tool used for providing notifications. Before we start using it, navigate to the main.jsx file and import the browser router and snackprovider as ```javascript 
import { BrowserRouter } from 'react-router-dom' Import { SnackbarProvider } from 'notistack'
``` and remove the ReactStrictmode ```javascript <React.StrictMode>
    <App />
  </React.StrictMode>```,surrounding the App components nd replace it with the browser router and snackprovider for notistack as follows ```javascript <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>```

when everything is done and similar to the code posted run the server and start playing around with firebase


### License

This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.

### Contact

For questions or feedback, please contact [mwaura69] at [mwauramwaura69@gmail.com].
Corrections Made:
