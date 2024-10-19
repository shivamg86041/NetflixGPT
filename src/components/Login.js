import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import avatar from "../assets/avatar.png";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = (e) => {
    e.preventDefault();
    setSignIn(!isSignIn);
  };

  const handleButtonClick = (e) => {
    //validate the form data
    // checkValidData(email, password);
    e.preventDefault();
    const messages = checkValidData(
      email.current.value,
      password.current.value,
      name.current?.value,
      isSignIn
    );
    setMessage(messages);

    //sign / sign up

    if (message) return;

    //sign in / sign up Logic
    if (!isSignIn) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        name.current.value
      )
        .then((userCreadential) => {
          const user = userCreadential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: avatar,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setMessage(error.message);
            });
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          setMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="bg-cover overflow-hidden h-screen w-screen aspect-square object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <div className="absolute bg-black bg-opacity-40 w-full h-screen overflow-hidden bg-cover object-cover"></div>

      <form className="absolute items-center flex-col justify-center px-12 py-8 w-[95%] bg-black md:w-[30%] my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            ref={name}
            required
            placeholder="Full Name"
            className="px-4 py-3 my-4 bg-transparent border-gray-500 border-solid border-[1.5px] outline-none rounded-md w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          required
          placeholder="Email Address"
          className="px-4 py-3 rounded-md bg-transparent border-gray-500 border-solid border-[1.5px] outline-none my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          required
          placeholder="Password"
          className="px-4 py-3 my-4 bg-transparent border-gray-500 border-solid border-[1.5px] outline-none rounded-md w-full bg-gray-700"
        />
        <p className="text-red-600">{message}</p>
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 my-4 w-full font-semibold transition-all duration-300 hover:bg-[#df1818] bg-[#ff0b0b]"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4">
          {isSignIn ? (
            <>
              New to Netflix?{" "}
              <button
                className="font-bold hover:underline"
                onClick={toggleSignInForm}
              >
                Sign Up Now
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                className="font-bold hover:underline"
                onClick={toggleSignInForm}
              >
                Sign In Now
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
