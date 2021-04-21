import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./contents/Menu";
import io, { Socket } from "socket.io-client";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TicTacToe from "./contents/TicTacToe";
import StatusDisplay from "./contents/StatusDisplay";
import AmberPing from "./components/icons/AmberPing";
import BluePing from "./components/icons/BluePing";
import TextBanner from "./components/TextBanner";
import Cursor from "./components/Cursor";
import Fullscreen from "fullscreen-react";
import LoginStatus from "./components/status/Login";
import ConnectivityError from "./components/status/ConnectivityError";
import Connecting from "./components/status/Connecting";
import Legal from "./contents/Legal";

export const ArcadeContext = createContext({
  isFullscreen: false,
  setFullscreen: (value) => {},
});

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
        <div className="select-none bg-warmGray-100 dark:bg-gray-900 dark:text-white cursor-none">
          <Router>
            <div className="flex min-h-screen">
              <Switch>
                <Route path="/sitenotice"><Legal sitenotice={true} privacypolicy={false}/></Route>
                <Route path="/privacypolicy"><Legal sitenotice={false} privacypolicy={true}/></Route>
                {connected && (
                  <>
                    <Route path="/tictactoe">
                      <div className="w-screen">
                      <Navbar />
                      <TicTacToe socket={socket!} />
                      </div>
                    </Route>
                    <Route exact path="/">
                      <Menu />
                    </Route>
                  </>
                )}
                <Route path="/">
                  {process.env.REACT_APP_PRE === "true" ? (
                    <>
                      <Cursor />
                      <StatusDisplay
                        icon={<AmberPing center={true} />}
                        message={
                          <TextBanner
                            title="Coming soon!"
                            message="Beta program on the way"
                          />
                        }
                      />
                    </>
                  ) : loading ? (
                    <>
                      <Cursor />
                      <StatusDisplay
                        icon={<BluePing center={true} />}
                        message={<TextBanner title="Loading" />}
                      />
                    </>
                  ) : !auth.currentUser ? (
                    <LoginStatus />
                  ) : connectionError ? (
                    <ConnectivityError />
                  ) : (
                    <Connecting />
                  )}
                </Route>
              </Switch>
            </div>
            <div className="flex justify-center text-gray-500 transform -translate-y-10">
              <Link to="/sitenotice">Site Notice</Link>
              <span className="mx-1">{"|"}</span>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </div>
          </Router>
        </div>
      </Fullscreen>
    </ArcadeContext.Provider>
  );
}

export default App;
