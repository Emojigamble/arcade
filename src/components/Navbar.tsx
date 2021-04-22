import React, { useState } from "react";
import firebase from "../firebase";
import Brand from "./Brand";
import { Link } from "react-router-dom";

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

      {user && !user!["isAnonymous"] && (
        <p className="my-auto text-2xl font-caveat">
          Welcome, {user!["displayName"]}
        </p>
      )}
    </div>
  );
};

export default Navbar;
