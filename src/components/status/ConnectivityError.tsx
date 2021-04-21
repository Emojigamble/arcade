import React from "react";
import StatusDisplay from "../../contents/StatusDisplay";
import Cursor from "../Cursor";
import RedPing from "../icons/RedPing";
import TextBanner from "../TextBanner";

export default function ConnectivityError() {
  return (
    <>
      <Cursor />
      <StatusDisplay
        icon={<RedPing center={true} />}
        message={
          <TextBanner
            title="Connectivity Error"
            message="Please make sure you're online"
          />
        }
      />
    </>
  );
}
