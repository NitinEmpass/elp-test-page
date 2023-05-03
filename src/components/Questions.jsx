import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";
// import { questions } from "../assets/data/questions";
import soundfile from "../assets/sounds/ques.mp3";
const Questions = () => {
  const navigate = useNavigate();
  const { player_id, questions } = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const [checkboxArray, setCheckboxArray] = useState([]);
  // console.log("this is checkbox array", checkboxArray);
  // console.log(questions, player_id);
  // console.log("this is questions array", questions);

  const [openModal, setOpenModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);

  useEffect(() => {
    if (!questions || !player_id) {
      navigate("/");
    }
  }, [navigate, player_id, questions]);

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
    const numbers = [];
    for (let i = 1; i <= questions.length; i++) {
      numbers.push(
        <div
          className={`px-4 py-3 border rounded-full cursor-pointer hover:bg-gradient-to-r from-orange-500 to-yellow-500 hover:text-white ${
            checkboxArray.includes(i)
              ? "bg-slate-200 text-black"
              : "bg-white text-black"
          }`}
          key={i}
          onClick={() => setCurrent(i - 1)}
        >
          {i <= 9 ? `0${i}` : i}
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center gap-4">{numbers}</div>
    );
  }

  function SoundButton({ src }) {
    const [audio] = useState(new Audio());

    const handleClick = () => {
      console.log(src);
      audio.src = src;
      audio.play().catch((err) => {
        console.error(err);
      });
    };

    return (
      <button
        onClick={handleClick}
        className="border rounded-full p-2 bg-slate-50 hover:bg-slate-100 hover:scale-105 duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
      </button>
    );
  }
  return (
    <div className="bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat min-h-screen w-full relative overflow-hidden">
      <div className="flex flex-col justify-center items-start p-5 mx-auto w-[95%] lg:w-[50%] mt-20 bg-orange-50 rounded-md shadow-lg gap-10">
        <div className="flex flex-col justify-center items-center w-full">
          <div
            key={questions[current].id}
            className="flex flex-col justify-center items-start gap-5 w-full"
          >
            <div className="flex flex-col justify-center items-start gap-2 w-full relative">
              <span className="text-xl">
                <span className="text-5xl bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text border-b-2 border-orange-500">
                  {current < 9 ? `0${current + 1}` : current + 1}
                </span>{" "}
                of {questions.length}
              </span>
              <div className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center justify-center gap-4">
                  <h3 className="text-2xl">{questions[current].que_title}</h3>
                  <SoundButton src={soundfile} />
                </div>
                <button
                  className="border px-4 py-2 rounded-full font-serif font-bold bg-slate-50 hover:bg-slate-100"
                  onClick={() => setOpenDesc(true)}
                >
                  i
                </button>
              </div>
              <div
                className={
                  openDesc === true
                    ? "absolute border p-5 rounded-md top-0 right-0 bg-slate-100"
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
                  <SoundButton
                    src={soundfile}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 items-start">
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  name={questions[current].id}
                  value={questions[current].choice_1}
                  className="text-5xl h-4 w-4"
                  defaultChecked={res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_1
                  )}
                  onChange={() => {
                    if (checkboxArray.includes(current + 1)) {
                      setCheckboxArray((prev) =>
                        prev.filter((item) => item !== current + 1)
                      );
                    }
                    handleAnswerSelect(
                      questions[current].id,
                      questions[current].choice_1,
                      questions[current].score_choice_1
                    );
                  }}
                />
                <label htmlFor={questions[current].id}>Not helpful</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  name={questions[current].id}
                  value={questions[current].choice_2}
                  defaultChecked={res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_2
                  )}
                  className="text-5xl h-4 w-4"
                  onChange={() => {
                    if (checkboxArray.includes(current + 1)) {
                      setCheckboxArray((prev) =>
                        prev.filter((item) => item !== current + 1)
                      );
                    }
                    handleAnswerSelect(
                      questions[current].id,
                      questions[current].choice_2,
                      questions[current].score_choice_2
                    );
                  }}
                />
                <label htmlFor={questions[current].id}>Somewhat helpful</label>
              </div>
              <div className="flex justify-center items-center gap-4">
                <input
                  type="radio"
                  name={questions[current].id}
                  value={questions[current].choice_3}
                  className="text-5xl h-4 w-4"
                  defaultChecked={res.find(
                    (item) =>
                      item.que_id === questions[current].id &&
                      item.answer === questions[current].choice_3
                  )}
                  onChange={() => {
                    if (checkboxArray.includes(current + 1)) {
                      setCheckboxArray((prev) =>
                        prev.filter((item) => item !== current + 1)
                      );
                    }
                    handleAnswerSelect(
                      questions[current].id,
                      questions[current].choice_3,
                      questions[current].score_choice_3
                    );
                  }}
                />
                <label htmlFor={questions[current].id}>Most helpful</label>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <input
                type="radio"
                name={questions[current].id}
                value={questions[current].choice_4}
                defaultChecked={res.find(
                  (item) =>
                    item.que_id === questions[current].id &&
                    item.answer === questions[current].choice_4
                )}
                className="text-5xl h-4 w-4"
                onChange={() => {
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
              />
              <label htmlFor={questions[current].choice_4}>I don't know</label>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={handlePrev}
            className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-orange-400 rounded-md text-xl hover:bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:text-white bg-white"
          >
            Prev
          </button>
          {current === questions.length - 1 ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-orange-400 rounded-md text-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-orange-400 rounded-md text-xl hover:bg-gradient-to-r from-orange-500 to-yellow-500 text-black hover:text-white bg-white"
            >
              Next
            </button>
          )}
        </div>
        <div className="flex items-center w-full overflow-auto pb-5">
          <NumberList />
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        res={res}
        player_id={player_id}
        heading={`You have selected ${checkboxArray.length} items as "I don't know" (marked as gray), would you like to submit?`}
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
