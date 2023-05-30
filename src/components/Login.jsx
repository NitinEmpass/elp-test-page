import React from "react";
import techniques from "../assets/images/techniques.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mb-28">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-gsl-light-red text-center text-3xl lg:text-5xl p-5 text-stroke">
          Student Processing Inventory (SPI)
        </h1>
        <span className="font-semibold text-base lg:text-2xl text-center">
          Embrace and Accommodate Neurodiversity
        </span>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-5 mx-auto gap-10 lg:gap-16">
        <div className="order-last lg:order-first">
          <video
            controls
            className="w-[90%] lg:w-[500px] h-full lg:h-80 rounded-lg aspect-video mx-auto"
          >
            <source
              src="https://drive.google.com/uc?export=download&id=1ILhFCo94yxdDT6K0GjrKY0ughVuqo57F"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="border-red-400 border-2 h-40 hidden lg:block"></div>
        <LoginForm />
      </div>
      <div>
        <img src={techniques} alt="Techniques" className="w-[75%] mx-auto" />
      </div>
    </div>
  );
};

export default Login;
