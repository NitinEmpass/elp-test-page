import React from "react";
import GSL from "../assets/images/GSL.avif";
import Empass from "../assets/images/empass_logo.svg";
import LSC from "../assets/images/lsc.png";
import APIC from "../assets/images/apic_icon.png";
import MAPPR from "../assets/images/mappr_icon.png";
import SPI from "../assets/images/spi_logo.jpg";
import CDS from "../assets/images/cds_logo.png";
import EFCS from "../assets/images/efcs-removebg.png";
import MMM from "../assets/images/mmm_logo.png";
const Footer = () => {
  const date = new Date();
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:gap-10 border border-t-2 border-t-red-400 lg:px-5 py-1 fixed bottom-0 bg-gray-100">
      <div className="hidden lg:flex flex-col lg:flex-row justify-evenly items-center w-[90%] mx-auto p-2 lg:p-0 gap-5">
        <div className="lg:flex justify-center items-center gap-6 lg:gap-26">
          <a
            href="https://goodsensorylearning.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={GSL}
              alt="Good Sensory Learning"
              width={110}
              className="aspect-auto mix-blend-darken"
            />
          </a>
          <a
            href="https://www.empasslearning.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Empass}
              alt="Empass Learning"
              width={70}
              className="bg-black/80 px-2 py-2.5 rounded-md"
            />
          </a>
          <a
            href="https://mymemorymentor.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={MMM}
              alt="MMM"
              width={35}
              className="rounded-md cursor-pointer"
            />
          </a>
          <a
            href="https://www.learningspecialistcourses.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LSC} alt="LSC" width={35} className="cursor-pointer" />
          </a>
          <a
            href="https://mymemorymentor.com/mappr/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={MAPPR}
              alt="MAPPR"
              width={70}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://mymemorymentor.com/spi/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={SPI} alt="SPI" width={45} className="cursor-pointer" />
          </a>
          <a
            href="https://mymemorymentor.com/efcs/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={EFCS} alt="EFCS" width={45} className="cursor-pointer" />
          </a>
          <a
            href="https://mymemorymentor.com/cds/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={CDS} alt="CDS" width={45} className="cursor-pointer" />
          </a>
          <a
            href="https://mymemorymentor.com/apic/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={APIC} alt="APIC" width={45} className="cursor-pointer" />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full text-gray-500">
        &#169; {date.getFullYear()} MyMemoryMentor LLC.
      </div>
    </div>
  );
};

export default Footer;
