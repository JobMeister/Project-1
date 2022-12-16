import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
    
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
initializeApp(firebaseConfig)

// init services
const db = getFirestore();

// collection ref

const colRef = collection(db,'Acounts');


// get collection data
getDocs(colRef).then((snapshot) => {
let Acounts = []
snapshot.docs.forEach((doc)=>{
    Acounts.push({...doc.data(), id:doc.id })
})
console.log(Acounts);
})
.catch(err => {
    console.log(err.message);
})
