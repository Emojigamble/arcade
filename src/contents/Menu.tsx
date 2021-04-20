import React from "react";
import AmberPing from "../components/icons/AmberPing";
import BluePing from "../components/icons/BluePing";
import GreenPing from "../components/icons/GreenPing";
import TealPing from "../components/icons/TealPing";
import MenuButton from "../components/MenuButton";
import { SignOut, auth } from "../firebase";
import { HiOutlineLogout } from "react-icons/hi";
import Cursor from "../components/Cursor";

const Menu: React.FC = () => {
  return (
    <div className="max-w-3xl min-h-screen p-4 mx-auto sm:p-8">
      <Cursor/>
      <p className="mt-24 text-2xl text-gray-500 select-text font-caveat">
        Funzel Environment presents
      </p>
      <h1
        className="font-mono text-3xl font-bold"
        style={{ fontFamily: "Inter, 'Segoe UI Emoji'" }}
      >
        Emoji<span className="text-orange-500">gamble</span>
      </h1>
      <p className="block max-w-2xl my-6 font-serif italic select-text">
        A collection of traditional paper games like TicTacToe, connect4, and
        Battleship, but <b>instead of using X and O, you play with emojis</b>.
        Each emoji has either a passive or active ability, which can be used
        during or at the end of each game. <br />
        Have fun! <span className="not-italic">🕹</span>
      </p>
      {auth.currentUser?.isAnonymous ? (
        <div className="px-4 py-2 mt-5 border-l-8 rounded-lg cursor-default select-text bg-amber-200 dark:bg-amber-300 border-amber-400 dark:border-amber-500 text-amber-700">
          <p>
            <b>You're signed in anonymously.</b> Progress won't be saved.
          </p>
        </div>
      ) : (
        <></>
      )}
      <div
        className="mt-8"
        style={{ fontFamily: "Inter, 'Segoe UI Emoji'" }}
      >
        <pre
          className="mb-2 ml-5"
          style={{ fontFamily: "monospace, 'Segoe UI Emoji'" }}
        >
          🎙 PUBLIC GAMES
        </pre>
        <div className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-6">
          <MenuButton
            ping={<GreenPing />}
            bold={true}
            title="🎲 TicTacToe"
            link="/tictactoe"
            className="sm:col-span-2"
          />
          <MenuButton
            ping={<GreenPing />}
            bold={true}
            title="🏆 connect4"
            className="sm:col-span-2"
          />
          <MenuButton
            ping={<GreenPing />}
            bold={true}
            title="⛵️ Battleship"
            className="sm:col-span-2"
          />
          <MenuButton
            ping={<TealPing />}
            title="👁 Spectate"
            className="sm:col-span-3"
          />
          <MenuButton
            ping={<BluePing />}
            title="🙈 Random game"
            className="sm:col-span-3"
          />
        </div>
      </div>
      <div
        className="mt-8"
        style={{ fontFamily: "Inter, 'Segoe UI Emoji'" }}
      >
        <pre
          className="mb-2 ml-5"
          style={{ fontFamily: "monospace, 'Segoe UI Emoji'" }}
        >
          🎭 PRIVATE GAMES
        </pre>
        <div className="max-w-3xl">
          <MenuButton
            ping={<AmberPing />}
            bold={true}
            title="🌳 New private Game"
          />
        </div>
      </div>
      <div className="flex mt-16 mb-12">
        <button onClick={SignOut} className="mx-auto text-gray-500 cursor-none">
          <HiOutlineLogout className={"mr-0.5 mt-[1px] align-text-top"} /> Sign
          Out
        </button>
      </div>
    </div>
  );
};

export default Menu;
