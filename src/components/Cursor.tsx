import React from 'react'
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";

export default function Cursor() {
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
}
