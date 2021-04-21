import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./contents/Menu";
import io, { Socket } from "socket.io-client";
import { auth, GoogleSignIn, AnonymousSignIn } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicTacToe from "./contents/TicTacToe";
import StatusDisplay from "./contents/StatusDisplay";
import RedPing from "./components/icons/RedPing";
import GreenPing from "./components/icons/GreenPing";
import AmberPing from "./components/icons/AmberPing";
import BluePing from "./components/icons/BluePing";
import TextBanner from "./components/TextBanner";
import { IoLogoGoogle } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import Cursor from "./components/Cursor";
import Fullscreen from "fullscreen-react";

export const ArcadeContext = createContext({isFullscreen: false, setFullscreen: (value) => {}});

function App() {
  let [loading, setLoading] = useState<boolean>(true);

  let [socket, setSocket] = useState<typeof Socket>();
  let [connected, setConnected] = useState<boolean>(false);
  let [connectionError, setConnectionError] = useState<boolean>(false);

  let [isFullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);

      if (user == null) {
        return;
      }

      user.getIdToken().then((res) => {
        const s = io("http://localhost:8000?idToken=" + res, {
          reconnectionDelay: 5000,
        });
        setSocket(s);

        s.on("connect", () => {
          console.log("connected!!");
          setConnectionError(false);
        });

        s.on("authenticated", () => {
          setConnected(true);
        });

        s.on("connect_error", (error: any) => {
          // TODO: deal with connection errors
          console.log("Encountered connection error");
          setConnectionError(true);
          setConnected(false);
        });

        s.on("disconnect", () => {
          if (!auth.currentUser) {
            s.disconnect();
          }

          console.log("disconnected");
          setConnected(false);
        });
      });
    });
  }, []);

  return (
    <ArcadeContext.Provider value={{ isFullscreen, setFullscreen }}>
      <Fullscreen isEnter={isFullscreen} onChange={setFullscreen}>
        <div className="min-h-screen select-none bg-warmGray-100 dark:bg-gray-900 dark:text-white cursor-none">
          <Router>
            {loading ? (
              <StatusDisplay
                icon={<BluePing center={true} />}
                message={<TextBanner title="Loading" />}
              />
            ) : connected ? (
              <>
                <Switch>
                  <Route path="/tictactoe">
                    <Navbar />
                    <TicTacToe socket={socket!} />
                  </Route>
                  <Route path="/">
                    <Menu />
                  </Route>
                </Switch>
              </>
            ) : !auth.currentUser ? (
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
                        <IoLogoGoogle className="my-auto ml-0.5 mr-5" /> Sign in
                        with Google
                      </button>
                      <button
                        className="flex px-3 py-2 text-gray-600 transition duration-100 rounded select-none cursor-none dark:text-gray-200"
                        onClick={AnonymousSignIn}
                      >
                        <HiOutlineUser className="my-auto ml-0.5 mr-5" />{" "}
                        Continue Anonymous
                      </button>
                    </div>
                  </>
                }
              />
            ) : connectionError ? (
              <StatusDisplay
                icon={<RedPing center={true} />}
                message={
                  <TextBanner
                    title="Connectivity Error"
                    message="Please make sure you're online"
                  />
                }
              />
            ) : (
              <StatusDisplay
                icon={<GreenPing center={true} />}
                message={
                  <TextBanner
                    title="Connecting"
                    message="Establishing a secured connection"
                  />
                }
              />
            )}
          </Router>
        </div>
      </Fullscreen>
    </ArcadeContext.Provider>
  );
}

export default App;
