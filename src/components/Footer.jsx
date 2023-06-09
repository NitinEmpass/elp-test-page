import React from "react";
import GSL from "../assets/images/GSL.avif";
import Empass from "../assets/images/empass_logo.svg";
import LSC from "../assets/images/lsc.png";

const Footer = () => {
  const date = new Date();
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:gap-10 border border-t-2 border-t-red-400 lg:px-5 py-1 fixed bottom-0 bg-gray-100">
      <div className="hidden lg:flex flex-col lg:flex-row justify-evenly items-center w-[80%] lg:w-[60%] mx-auto p-2 lg:p-0 gap-5">
        <div className="lg:flex justify-center items-center gap-6 lg:gap-26">
          <a href="https://goodsensorylearning.com/">
            <img
              src={GSL}
              alt="Good Sensory Learning"
              width={110}
              className="aspect-auto mix-blend-darken"
            />
          </a>
          <a href="https://www.empasslearning.com/">
            <img
              src={Empass}
              alt="Empass Learning"
              width={70}
              className="bg-black/80 px-2 py-2.5 rounded-md"
            />
          </a>
          {/* <a href="#"> */}
          <img
            src={LSC}
            alt="LSC"
            width={50}
            className="rounded-md cursor-pointer"
          />
          {/* </a> */}
        </div>
      </div>
      <div className="flex justify-center items-center w-full text-gray-500">
        &#169; {date.getFullYear()} Empass Learning Pvt. Ltd.
      </div>
    </div>
  );
};

export default Footer;
