import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { genderOptions, gradeOptions } from "../assets/data/selectOptions";

const LoginForm = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    testCode: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    grade: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setPlayer_Id, setName } = useContext(UserContext);

  const handleSubmit = async (e) => {
    setLoading(true);
    setName(formData.firstName + " " + formData.lastName);
    e.preventDefault();
    e.target.classList.add("submitted");
    if (formData.grade === "") {
      setError("Please enter your Grade");
    } else if (formData.gender === "") {
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

    // console.log(formattedDate); // output: "2023040411140755"
    const player_id = formattedDate;
    const data = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      grade: formData.grade,
      country: "India",
      city: "NA",
      quiz_id: "9",
      player_id: player_id,
      source: "elp",
      code: formData.testCode,
      school_name: "NA",
    };
    // console.log(data);

    await axios
      .post(
        "/UserProfile",
        { data },
        {
          headers: {
            task: process.env.REACT_APP_WEBSITE_REGISTER,
            token: process.env.REACT_APP_WEBSITE_TOKEN,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setPlayer_Id(player_id);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      });
    setLoading(false);
    // console.log(response);
    // console.log(testCode, firstName, lastName, email, gender, age, grade);
    // navigator("/rules", { state: { player_id: player_id } });
    navigator("/rules");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  return (
    <div className="flex flex-col justify-center items-center w-[90%] lg:w-[60%] gap-6 shadow-2xl px-10 py-5 rounded-lg bg-white">
      {error && (
        <p className="bg-gsl-dark-red p-3 my-2 rounded-md text-white">
          {error}
        </p>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Test Code"
          className="outline-none border-2 border-gray-500 p-2 rounded-md"
          required
          name="testCode"
          value={formData.testCode}
          onChange={handleChange}
        />
        <div className="w-full flex items-center gap-6">
          <input
            type="text"
            placeholder="Your First Name"
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-[50%]"
            required
            name="firstName"
            autoComplete="first-name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Your Last Name"
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-[50%]"
            required
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
          <input
            type="email"
            placeholder="Your email"
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%]"
            required
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <select
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%]"
            required
            name="gender"
            autoComplete="gender"
            defaultValue={""}
            onChange={handleChange}
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
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%]"
            required
            min={5}
            autoComplete="age"
            value={formData.age}
            onChange={handleChange}
          />
          <select
            className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%]"
            required
            name="grade"
            autoComplete="grade"
            onChange={handleChange}
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
          className="uppercase py-3 px-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold"
        >
          {loading ? <span className="loader"></span> : "start test"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
