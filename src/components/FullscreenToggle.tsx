import React, { useContext } from "react";
import { ArcadeContext } from "../App";
import { FaExpand, FaCompress } from "react-icons/fa";

export default function FullscreenToggle() {
  let { isFullscreen, setFullscreen } = useContext(ArcadeContext);

  return (
    <button className="mt-1 text-xl align-text-top cursor-none" onClick={() => setFullscreen(!isFullscreen)}>
      {isFullscreen ? <FaCompress className="text-gray-500" /> : <FaExpand className="text-gray-500" />}
    </button>
  );
}
