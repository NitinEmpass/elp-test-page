import React from "react";
import logo from "../assets/images/SPI logo.jpg";
import { Tooltip } from "react-tippy";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-red-400 bg-gray-100">
      <Link to="/">
        <img
          src={logo}
          alt="SPI"
          width={100}
          height="auto"
          className="mix-blend-darken aspect-auto"
        />
      </Link>
      {location.pathname === "/" || location.pathname === "/result" ? (
        <a
          href="mailto:support@mymemorymentor.com"
          className="p-2 px-4 text-2xl border rounded-lg mr-4 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
        >
          <Tooltip
            title="For any help or request for test code , click here to mail us at support@mymemorymentor.com"
            className="w-[90%] lg:w-full"
            position="bottom"
            trigger="mouseenter focus"
            arrow={true}
            theme="light"
          >
            Help ?
          </Tooltip>
        </a>
      ) : null}
    </div>
  );
};

export default Navbar;
