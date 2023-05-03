import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CheckModal = ({
  open,
  onClose,
  res,
  player_id,
  heading,
  firstText,
  secondText,
  callAPI = true,
}) => {
  const { questions } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log(heading, firstText, secondText);
  const handleSubmit = async (e) => {
    //handling the case when user does not select any answer
    const updatedRes = [...res];
    questions.forEach((question) => {
      const existingAnswer = updatedRes.find(
        (answer) => answer.que_id === question.id
      );
      if (!existingAnswer) {
        updatedRes.push({
          que_id: question.id,
          answer: "No",
          score: "0",
        });
      }
    });
    console.log("this is updated res", updatedRes);
    // console.log("this is result", res);
    console.log(callAPI);
    e.preventDefault();
    if (!callAPI) {
      onClose();
      navigate("/checkQues", { state: updatedRes });
    } else {
      const data = {
        crt_id: "9",
        player_id: player_id,
        res: updatedRes,
      };

      console.log(data);

      setLoading(true);

      await axios
        .post(
          "/UserProfile",
          { data },
          {
            headers: {
              task: process.env.REACT_APP_WEBSITE_ADD_TEST,
              token: process.env.REACT_APP_WEBSITE_TOKEN,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          navigate("/result");
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again later.");
        });
    }
  };
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="bg-black/90 absolute top-0 left-0 h-full w-full flex justify-center"
    >
      <div
        className="bg-orange-50 lg:w-[30%] w-[90%] max-h-[500px] absolute p-5 my-5 rounded-md shadow-2xl flex flex-col justify-center items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {error ? (
          <p className="bg-red-500 p-3 my-2 rounded-md text-white">{error}</p>
        ) : null}
        <h1 className="text-xl">{heading}</h1>
        <div className="flex justify-center items-center gap-5">
          {firstText === undefined ? null : (
            <button
              onClick={onClose}
              className="uppercase py-3 px-2 bg-red-400 w-32 text-white m-5 rounded-md mx-auto flex justify-center hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
            >
              {firstText}
            </button>
          )}
          {secondText === undefined ? null : (
            <button
              onClick={handleSubmit}
              className="uppercase py-3 px-2 bg-gradient-to-r from-orange-500 to-yellow-500 w-32 text-white m-5 rounded-md mx-auto flex justify-center hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
            >
              {loading ? (
                <span className="loaderOrange"></span>
              ) : (
                <span>{secondText}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
