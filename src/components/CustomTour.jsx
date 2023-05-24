import React, { useState } from "react";

const CustomTour = ({ content, isTour, setTour, text, className, tour }) => {
  const classnames = `${
    isTour ? "absolute" : "hidden"
  } bg-[#ffff99] text-black text-base lg:text-xl w-52 lg:min-w-[400px] h-auto rounded-2xl px-6 pt-2 flex flex-col justify-center items-center my-1 mx-5 z-[1] ${className}`;
  // console.log(classnames);
  // console.log(tour);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setTour((prev) => prev + 1);
      setLoading(false);
    }, 4000);
  };
  if (tour === 0 || tour === 7) {
    return (
      <>
        {isTour && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[1] bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <div
          className={`${classnames} w-[95%] lg:w-[500px] !bg-red-50 !text-black py-5 shadow-lg`}
        >
          <h1 className="text-2xl lg:text-4xl font-semibold text-center pb-2">
            Quick Tour
          </h1>
          <div className="border-2 border-gsl-dark-red w-full"></div>
          <span className="text-xl lg:text-2xl py-10">{content}</span>
          {tour === 0 && (
            <button
              className="uppercase py-3 px-3 lg:text-lg bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-40 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
              onClick={() => setTour((prev) => prev + 1)}
            >
              {!text ? "Next" : text}
            </button>
          )}
          {tour === 7 && (
            <div className="font-semibold text-black text-base flex justify-between items-center w-full gap-4">
              <button
                className="uppercase py-3 px-2 bg-gray-400 w-40 text-white lg:text-lg rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
                onClick={() => setTour(0)}
              >
                Tour Again
              </button>
              <button
                className="uppercase py-3 px-2 w-40 lg:text-lg bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
                onClick={handleClose}
              >
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <span>{!text ? "Next" : text}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      {isTour && (
        <div
          className="fixed top-0 left-0 w-screen h-screen z-[1]"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div className={classnames}>
        <span>{content}</span>
        <button
          className="uppercase p-2 w-36 bg-black rounded-md text-base text-center text-white mx-auto cursor-pointer font-semibold my-5"
          onClick={() => setTour((prev) => prev + 1)}
        >
          {!text ? "Next" : text}
        </button>
      </div>
    </>
  );
};

export default CustomTour;
