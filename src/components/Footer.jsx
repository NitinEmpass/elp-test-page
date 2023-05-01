import React from "react";
import GSL from "../assets/images/GSL.avif";
import Empass from "../assets/images/empass_logo.svg";

const Footer = () => {
  const date = new Date();
  return (
    <div className="flex-col w-full justify-between items-center gap-10 border border-t-2 border-t-red-400 lg:px-5 lg:py-2 fixed bottom-0 bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-evenly items-center w-[80%] lg:w-[60%] mx-auto p-4 lg:p-0 gap-5">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-16">
          <span className="lg:text-3xl text-2xl">Our Partners: </span>
          <div className="flex items-center justify-center gap-6">
            <a href="https://goodsensorylearning.com/">
              <img src={GSL} alt="Good Sensory Learning" width={250} />
            </a>
            <a href="https://www.empasslearning.com/">
              <img
                src={Empass}
                alt="Empass Learning"
                width={200}
                className="bg-black/80 p-5 rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:text-lg">
        &#169; {date.getFullYear()} Student Processing Inventory
      </div>
    </div>
  );
};

export default Footer;
