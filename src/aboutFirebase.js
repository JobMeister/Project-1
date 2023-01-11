import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import{getAuth, onAuthStateChanged } from 'firebase/auth'

import {} from './about'
import {} from './main'
import {} from './admin'

    
const firebaseConfig = {
  apiKey: "AIzaSyDoC94Xlt0BHfsH_zLp8562xsKMW49mv8s",
  authDomain: "job-meister.firebaseapp.com",
  projectId: "job-meister",
  storageBucket: "job-meister.appspot.com",
  messagingSenderId: "51579629977",
  appId: "1:51579629977:web:eae8590655f4e102e2e308",
  measurementId: "G-W33GWTB6JB"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore(app);

// collection ref

const colRef = collection(db,'Data');

//v
var oldData;


// get collection data
getDocs(colRef).then((snapshot) => {
let Data = []
snapshot.docs.forEach((doc)=>{
    Data.push({...doc.data(), id:doc.id })
})
console.log(Data);
$("#RealAbout").html(Data[0].dataAbout);
})
.catch(err => {
    console.log(err.message);
})





