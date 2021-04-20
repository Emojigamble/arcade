import React from "react";
import Brand from "../components/Brand";

interface StatusDisplayProps {
  icon?: any;
  centered?: boolean;
  message: any;
}

const StatusDisplay: React.FC<StatusDisplayProps> = (props) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-row justify-center mx-auto my-auto text-center">
        <div className="mb-5">
          <Brand large={true} centered={props.centered === false ? false : true} />
        </div>
        <div className="mb-5">{props.icon}</div>
        <div>{props.message}</div>
      </div>
    </div>
  );
};

export default StatusDisplay;
