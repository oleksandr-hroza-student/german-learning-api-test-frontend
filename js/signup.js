//Which exact Firebase suthentication service?
import { auth } from "./firebase-config.js";

//WHat action do I want to perform with the help of the service?
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

console.log("Hello from signup.js!");


const signUpButton = document.getElementById("signUpButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

async function handleProfileCreation(idToken, username){
    const response = await fetch("http://127.0.0.1:5000/api/me", {
        method: "POST",
        headers: {
            //because the backend is going data = request.get_json()
            "Content-Type": "application/json",
            //` ` is used when we want to insert variables into strings
            //'' - will just send Bearer ${idToken} instead of value inside of the idToken
            "Authorization": `Bearer ${idToken}`

        },
        body: JSON.stringify({
            username: username
        })
    });

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Backend response:", data);
    if (!response.ok){
        if (response.status === 409){
            console.log("Profile already exists!");
            return false;
        }
        if (response.status >= 500){
            console.log("Server error! Profile creation could be retried");
            return false;
        }
        console.log("Account exists, but profile creation failed!", data);
        return false;
    }
    return true;
}


//async - to wait for the response from firebase later on.
async function handleSignUp(event){
    //Prevents weird page reloads
    event.preventDefault();
    console.log("handleSignUp called");


    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = usernameInput.value.trim();

    if(!validateInputs(email, password, confirmPassword)){
        console.log("Invalid inputs");
        return;
    }
    console.log("Inputs are valid!");

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        const profileCreated = await handleProfileCreation(idToken, username);
        if (!profileCreated){
            console.log("Account created, but profine not created");
            return;
        }
        console.log("Account created and profile created!");


        //console.log("Account created!");
        //console.log(userCredential.user);
    }catch(error){
        console.log(error.message);
        console.log("BIGGG PROBLEMM\nSign Up failed miserably");
    }




    console.log(email, password, confirmPassword);

}

function validateInputs(email, password, confirmPassword){
    if(email === "" || password === "" || confirmPassword === ""){
        console.log("One on the fields is empty");
        return false
    }
    if(password !== confirmPassword){
        console.log("Passwords do not match!");
        return false;
    }
    if (password.length < 6){
        console.log("Password is too short!")
        return false;
    }
    return true;
}





//Here we need to add:
//email format validation.
//password conplexity validation
//password == confirmPassword?
//is there a more "modular" way of doing it, instead of writing all into one func
//eg signUpButton.addEventListener("click", specific_function())

//No need to pass event into the button, as the browser does it automatically
signUpButton.addEventListener("click", handleSignUp);

