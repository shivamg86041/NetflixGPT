

export const checkValidData = (email, password, name = "", isSignIn = true) =>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    if(!isSignIn && name.trim() === "") return "Name is required";

    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid){
        return "Email ID is not valid"
    }
    if(!isPasswordValid){
        return "Password is not valid";
    }

    return null;
}