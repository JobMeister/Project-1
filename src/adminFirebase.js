import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import {} from "./admin";
import {} from "./main";

const firebaseConfig = {
  apiKey: "AIzaSyDoC94Xlt0BHfsH_zLp8562xsKMW49mv8s",
  authDomain: "job-meister.firebaseapp.com",
  projectId: "job-meister",
  storageBucket: "job-meister.appspot.com",
  messagingSenderId: "51579629977",
  appId: "1:51579629977:web:eae8590655f4e102e2e308",
  measurementId: "G-W33GWTB6JB",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);
const auth = getAuth();

// collection ref

const colRef = collection(db, "Data");
const msgColRef = collection(db, "Messages");
const adColRef = collection(db, "Ads");
const usersColRef = collection(db, "users");
var oldData;

getDocs(colRef)
  .then((snapshot) => {
    let Data = [];
    snapshot.docs.forEach((doc) => {
      Data.push({ ...doc.data(), id: doc.id });
    });
    console.log(Data);
    oldData = Data[0].id;
  })
  .catch((err) => {
    console.log(err.message);
  });

// sending data

const editAb = document.querySelector(".editbtn");
editAb.addEventListener("submit", (e) => {
  e.preventDefault();

  getDocs(colRef)
    .then((snapshot) => {
      let Data = [];
      snapshot.docs.forEach((doc) => {
        Data.push({ ...doc.data(), id: doc.id });
      });
      oldData = Data[0].id;
    })
    .catch((err) => {
      console.log(err.message);
    });

  // delete old about data
  const docRef = doc(db, "Data", oldData);
  deleteDoc(docRef).then(() => {
    editAb.reset();
  });

  // add new data for about
  addDoc(colRef, {
    dataAbout: editAb.ntext.value,
  }).then(() => {
    alert("Success");
  });
  $("#editP").html(editAb.ntext.value);
});

var size;

// get messages to display in admin panel & admin num of messages report
//
getDocs(msgColRef)
  .then((snapshot) => {
    let Messages = [];
    snapshot.docs.forEach((doc) => {
      Messages.push({ ...doc.data(), id: doc.id });
    });
    size = Messages.length;
    console.log(Messages);

    for (let index = 0; index < size; index++) {
      let indexR = index + 1;
      $("#admin_msg").append(
        "<p class='border border-dark py-2 px-2 bg-white'>" +
          "<strong> Message number: " +
          indexR +
          "</strong>" +
          "<br>" +
          "Name: " +
          Messages[index].name +
          "<br>" +
          "Email: " +
          Messages[index].email +
          "<br>" +
          "Subject: " +
          Messages[index].subject +
          "<br>" +
          "Message: " +
          Messages[index].msg +
          "<br><strong>email to respond: " +
          "<a href ='mailto:"+
          Messages[index].email +
          "'>" +
          Messages[index].email +
          "</a></strong></p>"
      );
    }

    $("#reports").append(
      "<strong>Number of messages is - " + size + "</strong>"
    );
  })
  .catch((err) => {
    console.log(err.message);
  });

// getting data for num of ads
var adSize;
getDocs(adColRef)
  .then((snapshot) => {
    let Ads = [];
    snapshot.docs.forEach((doc) => {
      Ads.push({ ...doc.data(), id: doc.id });
    });
    adSize = Ads.length;
    $("#reports").append(
      "<br><strong>Number of ads is - " + adSize + "</strong>"
    );
  })
  .catch((err) => {
    console.log(err.message);
  });

const logoutButton = document.querySelector(".logoutBtn");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
      location.href = "index.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// get ads to display in admin panel as not confirm
getDocs(adColRef).then((snapshot) => {
  let ads = [];
  snapshot.docs.forEach((doc) => {
    ads.push({ ...doc.data(), id: doc.id });
  });
  size = ads.length;
  console.log(ads);
  let ids = [];
  let counter1 = 0;
  for (let index = 0; index < size; index++) {
    let indexR = index + 1;
    ids[index] = ads[index].id;
    if (ads[index].accepted === false) {
      $("#NotConfirm").append(
        "<p  class='border border-dark py-2 px-2 bg-white' >" +
          "<strong> ad number: " +
          indexR +
          "</strong>" +
          "<br>" +
          "Email of Employer: " +
          ads[index].emailofemployer +
          "<br>" +
          "company name: " +
          ads[index].company +
          "<br>" +
          "Title: " +
          ads[index].title +
          "<br>" +
          "description: " +
          ads[index].des +
          "<br>" +
          "location: " +
          ads[index].location +
          "<br>" +
          "percent: " +
          ads[index].percent +
          "<br>" +
          "Main Occupation : " +
          ads[index].dep +
          "<br>" +
          "requiements: " +
          ads[index].req +
          "<br>" +
          "</p>" +
          "<button id='delbtn" +
          index +
          "' class='btn btn-outline-danger me-2'>delete</button>" +
          "<button id='Acceptbtn" +
          index +
          "' class='btn btn-outline-success'>Accept</button>"
      );
      counter1++;
    }
  }
  let updatename = document.querySelector("#notconfirm1");
  updatename.innerHTML = counter1 + "  " + "???????????? ?????? ??????????";

  console.log(ids);
  for (let index = 0; index < size; index++) {
    if (ads[index].accepted === false) {
      const button = document.getElementById("delbtn" + index);
      button.addEventListener("click", function () {
        const docDel = doc(db, "Ads", ids[index]);
        deleteDoc(docDel);
      });
      const button2 = document.getElementById("Acceptbtn" + index);
      button2.addEventListener("click", function () {
        const updDoc = doc(db, "Ads", ids[index]);
        updateDoc(updDoc, {
          accepted: true,
        });
      });
    }
  }
});

getDocs(adColRef).then((snapshot) => {
  let ads = [];
  snapshot.docs.forEach((doc) => {
    ads.push({ ...doc.data(), id: doc.id });
  });
  size = ads.length;
  console.log(ads);
  let counter2 = 0;
  let ids = [];
  for (let index = 0; index < size; index++) {
    let indexR = index + 1;
    ids[index] = ads[index].id;
    if (ads[index].accepted === true) {
      $("#Confirm").append(
        "<p  class='border border-dark py-2 px-2 bg-white' >" +
          "<strong> ad number: " +
          indexR +
          "</strong>" +
          "<br>" +
          "Email of Employer: " +
          ads[index].emailofemployer +
          "<br>" +
          "company name: " +
          ads[index].company +
          "<br>" +
          "Title: " +
          ads[index].title +
          "<br>" +
          "description: " +
          ads[index].des +
          "<br>" +
          "location: " +
          ads[index].location +
          "<br>" +
          "percent: " +
          ads[index].percent +
          "<br>" +
          "Main Occupation : " +
          ads[index].dep +
          "<br>" +
          "requiements: " +
          ads[index].req +
          "</p>" +
          "<button id='delbtn" +
          index +
          "' class='btn btn-outline-danger me-2'>delete</button>"
      );
      counter2++;
    }
  }
  let updatename = document.querySelector("#confirm1");
  updatename.innerHTML = counter2 + "  " + "???????????? ????????????";
  for (let index = 0; index < size; index++) {
    if (ads[index].accepted === true) {
      const button = document.getElementById("delbtn" + index);
      button.addEventListener("click", function () {
        const docDel = doc(db, "Ads", ids[index]);
        deleteDoc(docDel);
      });
    }
  }
});

onAuthStateChanged(auth, (user) => {
  console.log("User status changed", user);
  if (user == null) {
    location.href = "index.html";
  }
});

// show users on admin panel
getDocs(usersColRef).then((snapshot) => {
  let usersAarray = [];
  snapshot.docs.forEach((doc) => {
    usersAarray.push({ ...doc.data(), id: doc.id });
  });
  size = usersAarray.length;
  console.log(usersAarray);
  let ids = [];
  for (let index = 0; index < size; index++) {
    let indexR = index + 1;
    ids[index] = usersAarray[index].id;
    if (usersAarray[index].eOrS == "Employer") {
      $("#deleteusers").append(
        "<p  class='border border-dark py-2 px-2 bg-white' >" +
          "first name: " +
          usersAarray[index].firstname +
          "<br>" +
          "last name: " +
          usersAarray[index].lastname +
          "<br>" +
          "email: " +
          usersAarray[index].email +
          "<br>" +
          "company: " +
          usersAarray[index].Company +
          "<br>" +
          "user type: " +
          usersAarray[index].eOrS +
          "<br>" +
          "passeord: " +
          usersAarray[index].password +
          "<br>" +
          "</p>" +
          "<button id='deluserbtn" +
          index +
          "' class='btn btn-outline-danger me-2'>delete</button>"
      );
    } else {
      if (usersAarray[index].eOrS == "Work Searcher") {
        $("#deleteusers").append(
          "<p  class='border border-dark py-2 px-2 bg-white' >" +
            "first name: " +
            usersAarray[index].firstname +
            "<br>" +
            "last name: " +
            usersAarray[index].lastname +
            "<br>" +
            "email: " +
            usersAarray[index].email +
            "<br>" +
            "age: " +
            usersAarray[index].age +
            "<br>" +
            "user type: " +
            usersAarray[index].eOrS +
            "<br>" +
            "passeord: " +
            usersAarray[index].password +
            "<br>" +
            "</p>" +
            "<button id='deluserbtn" +
            index +
            "' class='btn btn-outline-danger me-2'>delete</button>"
        );
      }
    }
  }
  console.log(ids);
  for (let index = 0; index < size; index++) {
    const button = document.getElementById("deluserbtn" + index);
    if (button) {
      console.log(index);
      button.addEventListener("click", function () {
        const docDel = doc(db, "users", ids[index]);
        deleteDoc(docDel);
        alert("user deleted");
      });
    }
  }
});
