import React from "react";
import GSL from "../assets/images/GSL.avif";
import Empass from "../assets/images/empass_logo.svg";

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
              width={150}
              className="aspect-auto mix-blend-darken"
            />
          </a>
          <a href="https://www.empasslearning.com/">
            <img
              src={Empass}
              alt="Empass Learning"
              width={100}
              className="bg-black/80 p-3 lg:p-3 rounded-md"
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:text-lg">
        &#169; {date.getFullYear()} Empass Learning Pvt. Ltd.
      </div>
    </div>
  );
};

export default Footer;
