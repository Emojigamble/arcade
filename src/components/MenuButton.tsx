import React from "react";
import { Link } from "react-router-dom";

interface MenuButtonProps {
  title: string;
  bold?: boolean;
  ping: any;
  className?: string;
  link?: string;
}

const MenuButton: React.FC<MenuButtonProps> = (props) => {
  return (
    <div className={props.className}>
      <Link to={props.link ? props.link : "/"}>
        <div
          className={
            "px-2 py-4 bg-white dark:bg-gray-800 border-1.5 border-transparent dark:hover:border-orange-500 border-transparent dark:hover:ring ring-opacity-50 ring-orange-500 cursor-pointer transition duration-50 flex rounded-lg hover:shadow-md " +
            props.className
          }
        >
          <div className="my-auto sm:mb-auto ml-3 mr-2">{props.ping}</div>
          <div className="ml-1">
            <p className={props.bold ? "font-bold" : ""}>{props.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuButton;
