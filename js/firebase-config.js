//Connect users to my firebase project!
//getAuth - to get the authentication service that is assosiated with out app.
//Separate getAuth and initialise app - due to separation of conserns,
//only add the serviced that we need rather than goin for everything at once
import { initialiseApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js"

//Configuration for the project (ie it's adress)
const firebaseConfig = {
  apiKey: "AIzaSyABqlkRBL0K1PJYhFSvtEw1_BhcaSQl-Ug",
  authDomain: "german-learning-api.firebaseapp.com",
  projectId: "german-learning-api",
  storageBucket: "german-learning-api.firebasestorage.app",
  messagingSenderId: "742721578753",
  appId: "1:742721578753:web:9e6f0406949fede7e65d00",
  measurementId: "G-PNPENETCEQ"
};


const app = initialiseApp(firebaseConfig);

const auth = getAuth(app);

//Here we are letting other JS files see the auth object
//Later they would be able to import that shit.
export { auth };


