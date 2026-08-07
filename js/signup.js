//Which exact Firebase suthentication service?
import { auth } from "./firebase-config.js";

//WHat action do I want to perform with the help of the service?
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

console.log("Hello from signup.js!");

const signUpButton = document.getElementById("signUpButton");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

//async - to wait for the response from firebase later on.
async function handleSignUp(event){
    //Prevents weird page reloads
    event.preventDefault();
    console.log("Sign Up button pressed");


    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if(!validateInputs(email, password, confirmPassword)){
        console.log("Invalid inputs");
        return;
    }
    console.log("Inputs are valid!");

    try{
        const userCredential = createUserWithEmailAndPassword(auth, email, password);

        console.log("Account created!");
        console.log(userCredential.user);
    }catch(error){
        console.log(error.message);
        console.log("BIGGG PROBLEMM\nSign Up failed miserably");
    }
    //This is a PROMISE
    const result = createUserWithEmailAndPassword(auth, email, password)



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

