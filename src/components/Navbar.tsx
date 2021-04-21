import React, { useState } from "react";
import firebase, { GoogleSignIn } from "../firebase";
import Brand from "./Brand";
import { Link } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io5";
import FullscreenToggle from "./FullscreenToggle";

const Navbar: React.FC = () => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((res: any) => {
    setUser(res);
  });

  return (
    <div className="flex justify-between px-8 py-5">
      <Link to="/">
        <Brand />
      </Link>

      {user && !user!["isAnonymous"] ? (
        <p className="my-auto text-2xl font-caveat">
          Welcome, {user!["displayName"]}
        </p>
      ) : (
        <button
          className="flex px-3 py-2 my-1 text-gray-600 transition duration-100 rounded select-none hover:bg-gray-100 active:bg-gray-300"
          onClick={GoogleSignIn}
        >
          <IoLogoGoogle className="my-auto mr-2" /> Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;
