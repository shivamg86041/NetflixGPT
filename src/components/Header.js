import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import {toggleGptSearchView} from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        //sign out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () =>{
    // Toggle GPT Search Button
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange =(e) =>{
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between">
      <img
        className="w-44"
        src= {logo}
        alt="logo"
      />
      {user && (
        <div className="flex items-center p-3 gap-2 justify-around">
        {showGptSearch && <select className="p-2 bg-gray-900 text-white font-semibold m-2 outline-none" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick={handleGptSearchClick} className="py-2 px-4 m-2 text-white font-bold rounded-lg mx-4 hover:text-red-600 duration-150 bg-black bg-opacity-50">{showGptSearch ? "Home" : "GPT Search"}</button>
          <img
            className="h-7 object-cover aspect-square"
            src={user?.photoURL}
            alt="user icon"
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
