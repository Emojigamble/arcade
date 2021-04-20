import React from "react";
import BrandAlt from "./BrandAlt";

interface BrandProps {
  large?: boolean;
  centered?: boolean;
}

const Brand: React.FC<BrandProps> = (props) => {
  const alt = localStorage.getItem("alt");

  return (
    <>
      {!alt ? (
        <div
          className={(!props.centered ? "text-left " : "text-center ") + "flex cursor-none"}
        >
          <div
            className={
              (props.centered && "mx-auto") + " " + ((!props.large || !props.centered) && "flex")
            }
          >
            {!props.centered && (
              <span className="my-auto mr-2 text-4xl">🕹</span>
            )}
            {props.large && props.centered && <p className="my-auto mb-2 text-4xl">🕹</p>}
            <div className="my-auto">
              {!props.centered && !props.large && (
                <p className="-mb-1 font-mono text-sm tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  funzel environment
                </p>
              )}
              {props.large && (
                <p className="-mb-1 font-mono text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  funzel environment
                </p>
              )}
              <p
                className={
                  "text-xl font-bold" + (!props.centered ? " mr-2" : "")
                }
              >
                {props.centered && !props.large && "🕹 "}Emoji
                <span className="text-orange-500">gamble</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <BrandAlt />
      )}
    </>
  );
};

export default Brand;
