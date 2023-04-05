import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/elp.jpg";
import axios from "axios";
import { genderOptions, gradeOptions } from "../assets/data/selectOptions";

const Login = () => {
  const navigator = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    e.target.classList.add("submitted");
    if (grade === "") {
      setError("Please enter your Grade");
    } else if (gender === "") {
      setError("Please enter your Gender");
    }

    // create a new Date object representing the current date and time
    const now = new Date();

    // extract the individual components of the date and time
    // concatenate the components into the desired format
    const formattedDate =
      now.getFullYear().toString().padStart(4, "0") +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0") +
      now.getMilliseconds().toString().padStart(3, "0").slice(0, 2);

    console.log(formattedDate); // output: "2023040411140755"
    const player_id = formattedDate;
    const data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      age: age,
      gender: gender,
      grade: grade,
      country: "India",
      city: "NA",
      quiz_id: "9",
      player_id: player_id,
      source: "elp",
      code: "ELP21",
      school_name: "NA",
    };
    console.log(data);

    await axios
      .post(
        "/UserProfile",
        { data },
        {
          headers: {
            task: "websiteregister",
            token: "amazeqyjtstedf8ie04osghaqw",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      });
    setLoading(false);
    // console.log(response);
    // console.log(testCode, firstName, lastName, email, gender, age, grade);
    navigator("/rules", { state: { player_id: player_id } });
  };
  return (
    <div className="flex justify-center items-center lg:w-[80%] mx-auto lg:gap-16 p-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div>
        <img src={logo} alt="LOGO" className="hidden lg:block w-[500px]" />
      </div>
      <div className="border-orange-400 border-2 h-40 hidden lg:block"></div>
      <div className="flex flex-col justify-center items-center w-full lg:w-[60%] gap-6 shadow-2xl p-10 rounded-lg">
        <h1 className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl">
          Welcome to ELP
        </h1>
        <span>Electric Learning Profile</span>
        {error ? (
          <p className="bg-red-500 p-3 my-2 rounded-md text-white">{error}</p>
        ) : null}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Test Code"
            className="outline-none border-2 border-gray-500 p-2 rounded-md text-gray-500"
            required
            value={"ELP21"}
            disabled
          />
          <span className="text-gray-500">
            A tool for you to help with you to assess your executive
            functioning. Make sure you have a Test Code before starting it.
          </span>
          <div className="w-full flex items-center gap-6">
            <input
              type="text"
              placeholder="Your First Name"
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[50%]"
              required
              autoComplete="first-name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Your Last Name"
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[50%]"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
            <input
              type="email"
              placeholder="Your email"
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[80%] lg:w-[50%]"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <select
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[80%] lg:w-[50%]"
              required
              autoComplete="gender"
              defaultValue={""}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="" disabled>
                Your Gender
              </option>
              {genderOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
            <input
              type="number"
              name="age"
              placeholder="Your age"
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[80%] lg:w-[50%]"
              required
              autoComplete="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <select
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-[80%] lg:w-[50%]"
              required
              autoComplete="grade"
              onChange={(e) => {
                setGrade(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled className="text-gray-500">
                Your Grade
              </option>
              {gradeOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="uppercase py-3 px-2 bg-yellow-400 w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold"
          >
            {loading ? <span className="loader"></span> : "start test"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
