import React from "react";

const CustomTour = ({ content, isTour, setTour, text, className }) => {
  const classnames = `${
    isTour ? "absolute" : "hidden"
  } bg-black/80 text-white text-base lg:text-xl w-52 lg:min-w-[270px] h-auto rounded-3xl px-4 py-2 flex flex-col justify-center items-center my-1 mx-5 z-[1] ${className}`;
  console.log(classnames);

  return (
    <div className={classnames}>
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
