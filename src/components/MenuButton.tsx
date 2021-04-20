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
      <Link to={props.link ? props.link : "/"} className="cursor-none">
        <button
          className={
            "w-full cursor-none px-2 py-4 bg-white dark:bg-gray-800 border-1.5 border-transparent dark:hover:border-orange-500 border-opacity-30 border-transparent dark:hover:ring ring-opacity-50 ring-orange-500 transition duration-50 flex rounded-lg hover:shadow-md " +
            props.className
          }
        >
          <div className="my-auto ml-3 mr-2 sm:mb-auto">{props.ping}</div>
          <div className="ml-1">
            <p className={props.bold ? "font-bold" : ""}>{props.title}</p>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default MenuButton;
