import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { questions } from "../assets/data/questions";

const Rules = () => {
  const { player_id, setQuestions } = useContext(UserContext);
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

  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    if (!player_id) {
      navigate("/");
    }
  }, [navigate, player_id]);
  // const location = useLocation();
  // console.log(location);

  // const player_id = location.state.player_id;
  // console.log(player_id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [questions, setQuestions] = useState([]);
  const [intro, setIntro] = useState("");

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  useEffect(() => {
    scrollToTop();
    const func = async () => {
      setLoading(true);

      // setQuestions(questions);
      // setLoading(false);
      const data = {
        quiz_id: "9",
        crt_id: "9",
        player_id: player_id,
        quiz_source: "elp",
      };
      await axios
        .post(
          "/MetaData",
          { data },
          {
            headers: {
              task: process.env.REACT_APP_WEBSITE_QUESTIONS,
              token: process.env.REACT_APP_WEBSITE_TOKEN,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          // console.log(res.data); // data is here
          // console.log(res.data.data.crt_que);
          setQuestions(res.data.data.crt_que);
          setIntro(res.data.data.crt_prop.intro_msg);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again later.");
        });
    };
    func();
  }, [player_id, setQuestions]);

  const mySafeHTML = DOMPurify.sanitize(intro);

  if (!player_id) {
    return null;
  }

  return (
    <div className="h-screen w-full bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat">
      <Navbar />
      <div className="flex flex-col items-center w-[95%] lg:w-[50%] mx-auto gap-4 p-5 lg:p-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl rounded-md bg-red-50">
        {error ? (
          <p className="bg-gsl-dark-red p-3 my-2 rounded-md text-white">
            {error}
          </p>
        ) : null}
        <h1 className="text-2xl lg:text-4xl font-semibold text-center">
          SPI Self Assessment
        </h1>
        <div className="border-2 border-gsl-dark-red w-full"></div>
        <span className="font-medium">
          Read all Instructions below before you start the self assessment.
        </span>
        <div className="w-[85%]">
          <div dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
        </div>

        <button
          type="button"
          className="uppercase py-3 px-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <Link
              to="/ques"
              // state={{ player_id: player_id, questions: questions }}
            >
              Next
            </Link>
          )}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Rules;
