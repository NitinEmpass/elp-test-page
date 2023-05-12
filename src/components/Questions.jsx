import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";
// import { questions } from "../assets/data/questions";
// import soundfileTitle from "../assets/sounds/que_1146_title.mp3";
// import soundfileDetail from "../assets/sounds/que_1146_detail.mp3";
import { Tooltip } from "react-tippy";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SoundButton from "./SoundButton";

const Questions = () => {
  const navigate = useNavigate();
  const { player_id, questions } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const [checkboxArray, setCheckboxArray] = useState([]);
  const [checked, setChecked] = useState([]);
  const [option, setOption] = useState("");
  // console.log("this is checkbox array", checkboxArray);
  // console.log(questions, player_id);
  // console.log("this is questions array", questions);

  const [openModal, setOpenModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);

  useEffect(() => {
    scrollToTop();
    if (!questions || !player_id) {
      navigate("/");
    }
  }, [navigate, player_id, questions]);

  const [soundTitle, setSoundTitle] = useState(null);
  const [soundDetail, setSoundDetail] = useState(null);

  useEffect(() => {
    const importSoundTitle = async () => {
      try {
        const soundModule = await import(
          `../assets/sounds/que_${questions[current].id}_title.mp3`
        );
        setSoundTitle(soundModule.default);
      } catch (error) {
        console.error(
          `Error loading sound for question ${questions[current].id}:`,
          error
        );
      }
    };
    const importSoundDetail = async () => {
      try {
        const soundModule = await import(
          `../assets/sounds/que_${questions[current].id}_detail.mp3`
        );
        setSoundDetail(soundModule.default);
      } catch (error) {
        console.error(
          `Error loading sound for question ${questions[current].id}:`,
          error
        );
      }
    };

    importSoundTitle();
    importSoundDetail();
  }, [current]);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const [res, setRes] = useState([]);
  function handleAnswerSelect(questionId, selectedAnswer, score) {
    console.log(questionId, selectedAnswer, score);
    const ans = res;
    let existingAnswer = ans.find((answer) => answer.que_id === questionId);
    if (existingAnswer) {
      existingAnswer.answer = selectedAnswer;
      existingAnswer.score = score;
    } else {
      ans.push({
        que_id: questionId,
        answer: selectedAnswer,
        score: score,
      });
      setChecked([...checked, current + 1]);
    }
    console.log("this is ans", ans);
    setRes(ans);
  }
  console.log("this is res", res);

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent(current - 1);
  };
  const handleNext = () => {
    if (current === questions.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  if (!player_id || !questions) {
    return null;
  }
  const handleSubmit = () => {
    if (res.length !== questions.length) {
      setCheckModal(true);
      scrollToTop();
      return;
    }
    setOpenModal(true);
    scrollToTop();
  };

  function NumberList() {
    const containerRef = useRef(null);
    useEffect(() => {
      // Scroll to the current question number when the component mounts
      const container = containerRef.current;
      const questionElems = container.querySelectorAll(".question-number");
      const currentQuestionElem = questionElems[current];
      const containerWidth = container.offsetWidth;
      const currentQuestionLeft = currentQuestionElem.offsetLeft;
      const currentQuestionWidth = currentQuestionElem.offsetWidth;
      const scrollPosition =
        currentQuestionLeft + currentQuestionWidth / 2 - containerWidth / 2;
      container.scrollLeft = scrollPosition;
    }, []);

    const numbers = useMemo(() => {
      return Array.from({ length: questions.length }, (_, i) => {
        const number = i + 1;
        const isCurrent = number === current + 1;
        const isChecked = checked.includes(number);
        const isCheckedBox = checkboxArray.includes(number);
        const className = `question-number px-4 py-3 border rounded-full cursor-pointer hover:bg-gradient-to-r ${
          isChecked
            ? isCheckedBox
              ? "bg-[#ff6fdb] text-black"
              : "bg-[#9fe59f] text-black"
            : "bg-white text-black"
        } ${
          isCurrent
            ? "bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
            : ""
        }`;
        return (
          <div
            className={className}
            key={number}
            onClick={() => setCurrent(number - 1)}
          >
            {number <= 9 ? `0${number}` : number}
          </div>
        );
      });
    }, []);

    return (
      <div
        className="flex items-center w-full overflow-x-auto pb-5"
        ref={containerRef}
      >
        <div className="flex justify-center items-center gap-4">{numbers}</div>
      </div>
    );
  }

  const handleClick = (que_id, option, score) => {
    setOption(option);
    if (checkboxArray.includes(current + 1)) {
      setCheckboxArray((prev) => prev.filter((item) => item !== current + 1));
      handleAnswerSelect(que_id, option, score);
    } else {
      handleAnswerSelect(que_id, option, score);
    }
  };
  return (
    <div className="min-h-screen w-full relative overflow-auto bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat">
      <Navbar />
      <div className="flex flex-col justify-center items-start p-5 mx-auto w-[95%] lg:w-[70%] my-10 mb-32 bg-red-50 rounded-md shadow-lg gap-10 relative">
        <div className="flex flex-col justify-center items-center w-full">
          <div
            key={questions[current].id}
            className="flex flex-col justify-center items-start gap-5 w-full"
          >
            <div className="flex flex-col justify-center items-start gap-6 w-full">
              <div className="flex justify-between items-center w-full">
                <span className="text-xl lg:text-3xl">
                  <span className="text-4xl lg:text-6xl bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text border-b-2 border-gsl-dark-red">
                    {current < 9 ? `0${current + 1}` : current + 1}
                  </span>{" "}
                  of {questions.length}
                </span>
                <Tooltip title="Click to understand the statement better">
                  <button
                    className="block lg:hidden border px-4 py-2 rounded-full font-serif font-bold bg-black/70 hover:bg-white text-white hover:text-black duration-300 ease-in-out"
                    onClick={() => setOpenDesc(!openDesc)}
                  >
                    i
                  </button>
                </Tooltip>
              </div>
              <div className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center justify-center gap-6">
                  <h3 className="text-2xl lg:text-4xl">
                    {questions[current].que_title}
                    {"  "}
                    <div className="inline-block lg:hidden">
                      <Tooltip title="Listen to audio">
                        <SoundButton src={soundTitle} />
                      </Tooltip>
                    </div>
                  </h3>
                </div>
                <div className="hidden lg:block">
                  <Tooltip title="Listen to audio">
                    <SoundButton src={soundTitle} />
                  </Tooltip>
                </div>
                <Tooltip title="Click to understand the statement better">
                  <button
                    className="hidden lg:block border px-4 py-2 rounded-full font-serif font-bold bg-black/70 hover:bg-white text-white hover:text-black duration-300 ease-in-out"
                    onClick={() => setOpenDesc(!openDesc)}
                  >
                    i
                  </button>
                </Tooltip>
              </div>
              <div
                className={
                  openDesc === true
                    ? "absolute border p-2 lg:p-5 rounded-md -top-1 right-0 bg-slate-100 w-full lg:w-[90%] overflow-y-auto"
                    : "hidden"
                }
              >
                <button
                  className="absolute border px-4 py-2 rounded-full top-1 right-1 bg-slate-200"
                  onClick={() => setOpenDesc(!openDesc)}
                >
                  x
                </button>
                <div className="mr-10 flex items-center justify-center gap-4">
                  <span>{questions[current].que_detail}</span>
                  <Tooltip title="Listen to audio">
                    <SoundButton src={soundDetail} />
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 text-lg lg:text-2xl w-[90%] mx-auto">
              <li
                onClick={() => {
                  handleClick(
                    questions[current].id,
                    questions[current].choice_1,
                    questions[current].score_choice_1
                  );
                }}
                className={`flex justify-center items-center gap-4 border border-gray-500 p-1 lg:p-2 rounded-full w-full cursor-pointer ${
                  res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_1
                  ) &&
                  "ring-2 ring-[#9fe59f] bg-[#9fe59f] text-black border-transparent"
                }`}
              >
                {questions[current].choice_1}
              </li>
              <li
                onClick={() => {
                  handleClick(
                    questions[current].id,
                    questions[current].choice_2,
                    questions[current].score_choice_2
                  );
                }}
                className={`flex justify-center items-center gap-4 border border-gray-500 p-1 lg:p-2 rounded-full w-full cursor-pointer ${
                  res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_2
                  ) &&
                  "ring-2 ring-[#9fe59f] bg-[#9fe59f] text-black border-transparent"
                }`}
              >
                {questions[current].choice_2}
              </li>
              <li
                onClick={() => {
                  handleClick(
                    questions[current].id,
                    questions[current].choice_3,
                    questions[current].score_choice_3
                  );
                }}
                className={`flex justify-center items-center gap-4 border border-gray-500 p-1 lg:p-2 rounded-full w-full cursor-pointer ${
                  res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_3
                  ) &&
                  "ring-2 ring-[#9fe59f] bg-[#9fe59f] text-black border-transparent"
                }`}
              >
                {questions[current].choice_3}
              </li>
              <li
                onClick={() => {
                  if (!checkboxArray.includes(current + 1)) {
                    setCheckboxArray([...checkboxArray, current + 1]);
                  } else {
                    setCheckboxArray((prev) =>
                      prev.filter((item) => item !== current + 1)
                    );
                  }
                  handleAnswerSelect(
                    questions[current].id,
                    questions[current].choice_4,
                    questions[current].score_choice_4
                  );
                }}
                className={`flex justify-center items-center gap-4 border border-gray-500 p-1 lg:p-2 rounded-full w-full cursor-pointer ${
                  res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_4
                  ) &&
                  "ring-2 ring-[#9fe59f] bg-[#9fe59f] text-black border-transparent"
                }`}
              >
                {questions[current].choice_4}
              </li>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Tooltip title="Previous">
            <button
              onClick={handlePrev}
              className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-red-400 rounded-md text-2xl bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-black hover:text-white bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </Tooltip>
          {current === questions.length - 1 ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-red-400 rounded-md text-xl bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
            >
              Submit
            </button>
          ) : (
            <Tooltip title="Next">
              <button
                onClick={handleNext}
                className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-red-400 rounded-md text-2xl bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-black hover:text-white bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </Tooltip>
          )}
        </div>
        <NumberList />
      </div>
      <Footer />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        res={res}
        player_id={player_id}
        heading={`You have selected ${checkboxArray.length} items as "I don't know" (marked as pink), would you like to submit?`}
        firstText={"No"}
        secondText={"Yes"}
      />
      <Modal
        open={checkModal}
        onClose={() => setCheckModal(false)}
        res={res}
        player_id={player_id}
        heading={`You have not selected answers for ${
          questions.length - res.length
        } questions, Please review your answer!`}
        firstText={"Ok"}
      />
    </div>
  );
};

export default Questions;
