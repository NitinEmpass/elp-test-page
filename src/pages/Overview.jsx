import React, { useCallback, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import QuickGuide from "../assets/images/quick_guide.png";
import { UserContext } from "../context/UserContext";

const Overview = () => {
  const { player_id } = useContext(UserContext);
  // console.log(player_id);

  const confirmLeavePage = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
    const message = "Do you really want to lose your progress?";
    e.returnValue = message;
    return message;
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmLeavePage);
    return () => {
      window.removeEventListener("beforeunload", confirmLeavePage);
    };
  }, [confirmLeavePage]);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    if (!player_id) {
      navigate("/");
    }
  }, [navigate, player_id]);
  if (!player_id) {
    return null;
  }
  return (
    <div className="min-h-screen w-full bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full mx-auto gap-4 p-5 lg:p-10 shadow-2xl rounded-md bg-red-50">
        <h1 className="text-2xl lg:text-4xl font-semibold text-center">
          Quick Guide
        </h1>
        <div className="border-2 border-gsl-dark-red w-full"></div>
        <div className="w-full">
          <img src={QuickGuide} alt="Quick Guide" />
        </div>
        <Link to="/ques" className="mb-20 mt-10">
          <button
            type="button"
            className="uppercase py-3 px-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
          >
            continue
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Overview;
