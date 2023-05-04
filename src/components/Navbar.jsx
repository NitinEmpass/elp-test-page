import React from "react";
import logo from "../assets/images/SPI logo.jpg";
import { Tooltip } from "react-tippy";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-red-400 bg-gray-100">
      <Link to="/">
        <img src={logo} alt="SPI" width={100} height="auto" className="mix-blend-darken aspect-auto" />
      </Link>
      <a
        href="mailto:support@mymemorymentor.com"
        className="p-2 px-4 text-2xl border rounded-2xl mr-4 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
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
    </div>
  );
};

export default Navbar;
