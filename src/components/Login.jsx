import React from "react";
import techniques from "../assets/images/techniques.jpg";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-28">
      <div className="flex flex-col justify-center items-center">
        <h1 className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text text-center text-3xl lg:text-5xl p-5">
          Student Processing Inventory (SPI)
        </h1>
        <span className="font-semibold text-base lg:text-xl text-center">
          Assessing and Accommodating Diverse Ways of Processing
        </span>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-5 mx-auto gap-10 lg:gap-16">
        <div className="order-last lg:order-first">
          <iframe
            className="w-full lg:w-[500px] h-full lg:h-80 aspect-video"
            src="https://www.youtube-nocookie.com/embed/FD_AdcTABWw?rel=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="border-red-400 border-2 h-40 hidden lg:block"></div>
        <LoginForm />
      </div>
      <div>
        <img
          src={techniques}
          alt="Techniques"
          className="w-[350px] lg:w-[500px]"
        />
      </div>
    </div>
  );
};

export default Login;
