import React, { useEffect, useState } from "react";

const CustomTour = ({
  content,
  top,
  left,
  right,
  bottom,
  edge,
  isTour,
  setTour,
  text,
}) => {
  return (
    <div
      className={`${
        isTour ? "lg:absolute" : "hidden"
      } bg-black/80 text-white text-base lg:text-xl min-w-[100px] lg:min-w-[270px] h-auto rounded-3xl px-4 py-2 ${left} ${right} ${bottom} ${top} ${edge} flex flex-col justify-center items-center my-1 mx-5`}
    >
      <span>{content}</span>
      <button
        type="button"
        className="uppercase p-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold my-5"
        onClick={() => setTour((prev) => prev + 1)}
      >
        {!text ? "Next" : text}
      </button>
    </div>
  );
};

export default CustomTour;
