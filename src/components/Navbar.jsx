import React from "react";
import logo from "../assets/images/SPI logo.jpg";
import { Tooltip } from "react-tippy";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-red-400 bg-gray-100 py-1">
      <Link to="/">
        <img
          src={logo}
          alt="SPI"
          height="auto"
          className="lg:p-2 aspect-auto lg:w-20 w-12"
        />
      </Link>
      {location.pathname === "/" || location.pathname === "/result" ? (
        <a
          href="mailto:support@mymemorymentor.com"
          className="p-1 lg:p-1 lg:px-3 text-base lg:text-xl border rounded-lg mr-4 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
        >
          <Tooltip
            title="For any help or request for test code , click here to mail us at support@mymemorymentor.com"
            className="w-[90%] lg:w-full"
            position="bottom"
            trigger="mouseenter focus"
            arrow={true}
            theme="light"
          >
            <span className="hidden lg:block uppercase">Help </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 lg:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </Tooltip>
        </a>
      ) : null}
    </div>
  );
};

export default Navbar;
