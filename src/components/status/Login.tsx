import React, { useEffect, useState } from "react";
import StatusDisplay from "../../contents/StatusDisplay";
import Cursor from "../Cursor";
import { GoogleSignIn, AnonymousSignIn } from "../../firebase";
import { IoLogoGoogle } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function LoginStatus() {
  let [consent, setConsent] = useState(false);
  let [cursorHidden, setCursorHidden] = useState(false);

  useEffect(() => {
    setCursorHidden(true);
    setTimeout(() => setCursorHidden(false), 100);
  }, [consent]);

  return (
    <StatusDisplay
      centered={false}
      message={
        <>
          {!cursorHidden && <Cursor />}
          <div className="flex-row -mt-1">
            {consent ? (
              <button
                className="flex px-3 py-2 text-gray-600 transition duration-100 rounded select-none cursor-none dark:text-gray-200"
                onClick={consent && GoogleSignIn}
              >
                <IoLogoGoogle className="my-auto ml-0.5 mr-5" /> Sign in with
                Google
              </button>
            ) : (
              <label className="flex mb-2 cursor-none">
                <input
                  className="my-auto ml-4 mr-5"
                  type="checkbox"
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span className="leading-tight">
                  By logging in, I consent to
                  <br /> the{" "}
                  <span className="underline">
                    <Link to="/privacypolicy">privacy policy</Link>
                  </span>
                  .
                </span>
              </label>
            )}
            <button
              className="flex px-3 py-2 text-gray-600 transition duration-100 rounded select-none cursor-none dark:text-gray-200"
              onClick={consent && AnonymousSignIn}
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
