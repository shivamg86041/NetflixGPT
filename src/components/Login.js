import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setSignIn] = useState(true);

  const toggleSignInForm = (e) => {
    e.preventDefault();
    setSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_small.jpg"
          alt="logo"
        />
      </div>
      <form className="absolute items-center flex-col justify-center px-12 py-8 bg-black w-[30%] my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-3 my-4 bg-transparent border-gray-500 border-solid border-[1.5px] outline-none rounded-md w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="px-4 py-3 rounded-md bg-transparent border-gray-500 border-solid border-[1.5px] outline-none my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 my-4 bg-transparent border-gray-500 border-solid border-[1.5px] outline-none rounded-md w-full bg-gray-700"
        />
        <button className="px-4 py-2 my-4 w-full font-semibold transition-all duration-300 hover:bg-[#df1818] bg-[#ff0b0b]">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4">
          {isSignIn ? (
            <>
              New to Netflix?{" "}
              <button className="font-bold hover:underline" onClick={toggleSignInForm}>Sign Up Now</button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button className="font-bold hover:underline" onClick={toggleSignInForm}>Sign In Now</button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
