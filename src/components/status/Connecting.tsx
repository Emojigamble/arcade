import React from "react";
import StatusDisplay from "../../contents/StatusDisplay";
import Cursor from "../Cursor";
import GreenPing from "../icons/GreenPing";
import TextBanner from "../TextBanner";

export default function Connecting() {
  return (
    <>
      <Cursor />
      <StatusDisplay
        icon={<GreenPing center={true} />}
        message={
          <TextBanner
            title="Connecting"
            message="Establishing a secured connection"
          />
        }
      />
    </>
  );
}
