import React from "react";
import StatusDisplay from "../../contents/StatusDisplay";
import Cursor from "../Cursor";
import { GoogleSignIn, AnonymousSignIn } from "../../firebase";
import { IoLogoGoogle } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

export default function LoginStatus() {
  return (
    <StatusDisplay
      centered={false}
      message={
        <>
          <Cursor />
          <div className="flex-row -mt-1">
            <button
              className="flex px-3 py-2 text-gray-600 transition duration-100 rounded select-none cursor-none dark:text-gray-200"
              onClick={GoogleSignIn}
            >
              <IoLogoGoogle className="my-auto ml-0.5 mr-5" /> Sign in with
              Google
            </button>
            <button
              className="flex px-3 py-2 text-gray-600 transition duration-100 rounded select-none cursor-none dark:text-gray-200"
              onClick={AnonymousSignIn}
            >
              <HiOutlineUser className="my-auto ml-0.5 mr-5" /> Continue
              Anonymous
            </button>
          </div>
        </>
      }
    />
  );
}
