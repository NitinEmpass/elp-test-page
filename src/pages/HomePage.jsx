import React from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-full w-full flex flex-col justify-between items-center overflow-auto">
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
};

export default HomePage;
