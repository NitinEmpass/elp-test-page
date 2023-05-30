import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 justify-center items-center">
      <span className="loader"></span>
      <span className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text text-xl text-center">
        Loading...
      </span>
    </div>
  );
};

export default LoadingPage;
