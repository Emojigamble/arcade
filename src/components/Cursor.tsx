import React, {useContext, useEffect, useState} from 'react'
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { ArcadeContext } from '../App';

export default function Cursor() {
  let {isFullscreen} = useContext(ArcadeContext)
  let [cursorHidden, setCursorHidden] = useState(false);

  useEffect(() => {
    // small logic to position cursor properly when going into fullscreen
    setCursorHidden(true)
    setTimeout(() => setCursorHidden(false), 100)
  }, [isFullscreen])

  if (!cursorHidden)
    return (
      <>
        <CustomCursor
          targets={["button", "a", ".tile"]}
          customClass="custom-cursor"
          dimensions={30}
          fill="#FFF"
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.3,
          }}
          targetOpacity={0.1}
          targetScale={1.5}
        />
      </>
    )
  else
    return <></>
}
