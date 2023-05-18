import React, { useState } from "react";

const CustomTour = ({ content, isTour, setTour, text, className, tour }) => {
  const classnames = `${
    isTour ? "absolute" : "hidden"
  } bg-black/80 text-white text-base lg:text-xl w-52 lg:min-w-[400px] h-auto rounded-xl px-6 pt-2 flex flex-col justify-center items-center my-1 mx-5 z-[1] ${className}`;
  console.log(classnames);
  console.log(tour);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setLoading(true);
    setTimeout(() => {
      setTour((prev) => prev + 1);
      setLoading(false);
    }, 4000);
  };
  if (tour === 0 || tour === 9) {
    return (
      <>
        {isTour && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-[1] bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat"
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <div
          className={`${classnames} w-64 lg:w-[500px] bg-red-50 !text-black py-5`}
        >
          <h1 className="text-2xl lg:text-4xl font-semibold text-center pb-2">
            Quick Tour
          </h1>
          <div className="border-2 border-gsl-dark-red w-full"></div>
          <span className="text-2xl py-10">{content}</span>
          {tour === 0 && (
            <button
              className="uppercase py-3 px-3 text-lg bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-40 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
              onClick={() => setTour((prev) => prev + 1)}
            >
              {!text ? "Next" : text}
            </button>
          )}
          {tour === 9 && (
            <div className="font-semibold text-black text-base flex justify-between items-center w-full">
              <button
                className="uppercase py-3 px-2 bg-gray-400 w-40 text-white text-lg rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
                onClick={() => setTour(0)}
              >
                Restart Tour
              </button>
              <button
                className="uppercase py-3 px-2 text-lg bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-40 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
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
        <span
          className="uppercase p-2 w-full text-base text-center text-white mx-auto cursor-pointer font-semibold mt-5 border-t border-white"
          onClick={() => setTour((prev) => prev + 1)}
        >
          {!text ? "Next" : text}
        </span>
      </div>
    </>
  );
};

export default CustomTour;
