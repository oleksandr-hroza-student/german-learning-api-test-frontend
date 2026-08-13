//Import firebase config
import { auth } from "./firebase-config.js";

//import the service from firebase
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";



console.log("Hello from login.js!");

const loginButton = document.getElementById("loginButton");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

async function handleLogin(event){
    event.preventDefault();
    console.log("Login button pressed");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if(!validateInputs(email, password)){
        console.log("Invalid inputs");
        return;
    }
    console.log("Inputs are valid!");

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;
        const idToken = await user.getIdToken();


        console.log("Got user's info from firebase!");
        console.log("\n\nUser's JWT token:", idToken);
        console.log("\n\nUser's ID:", user.uid);

        //Fetch - giver a HTTP responce, not a parced Json
        //eg: (status: 200, ok: true, redirected: false, type: "cors", url: "http://)
        //to get JSON: Flask jsonify -> HTTP responce -> fetch() -> responce.json() -> JavaScript object.
        const response = await fetch("http://127.0.0.1:5000/api/protected", {
            method: "GET",
            headers: {
                //` ` is used when we want to insert variables into strings
                //'' - will just send Bearer ${idToken} instead of value inside of the idToken
                "Authorization": `Bearer ${idToken}`
            }
        })
        console.log("Status:", response.status);


        const data = await response.json();

        console.log("Backend response:", data);

    }catch(error){
        console.log(error.message);
        console.log("Shit hit the fan!\nLogin failed miserably");
    }



}


function validateInputs(email, password){
    if(email === "" || password === ""){
        console.log("One on the fields is empty");
        return false
    }
    return true;
}


loginButton.addEventListener("click", handleLogin);

