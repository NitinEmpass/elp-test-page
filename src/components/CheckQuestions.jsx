import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";
import { Tooltip } from "react-tippy";

const CheckQuestions = () => {
  const navigate = useNavigate();
  const { player_id, questions } = useContext(UserContext);
  // console.log(questions, player_id);
  const location = useLocation();
  // console.log(location);

  const checkResultData = location.state;
  console.log("this is checkResultData: ", checkResultData);
  // const questions = location.state.questions;
  // const player_id = location.state.player_id;

  useEffect(() => {
    if (!questions || !player_id) {
      navigate("/");
    }
  }, [navigate, player_id, questions]);

  const [openModal, setOpenModal] = useState(false);
  const [openCheckModal, setOpenCheckModal] = useState(false);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const [res, setRes] = useState([]);
  console.log("this is result: ", res);

  function handleAnswerSelect(questionId, selectedAnswer, score) {
    const ans = res;
    let existingAnswer = ans.find((answer) => answer.que_id === questionId);
    // console.log(existingAnswer);
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
    console.log(ans);
    setRes(ans);
  }
  console.log("this is result after option switching: ", res)

  const onSubmit = () => {
    //handling the 10 "Yes" answers condition
    const yesCount = res.reduce((count, answer) => {
      if (answer.answer === "Yes") {
        count++;
      }
      return count;
    }, 0);

    console.log("this is yesCount", yesCount);

    scrollToTop();
    yesCount !== 6 ? setOpenCheckModal(true) : setOpenModal(true);
  }

  if (!player_id || !questions) {
    return null;
  }
  return (
    <div className="bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat h-full w-full relative overflow-hidden">
      <div className="flex flex-col w-[90%] p-5 lg:w-[80%] mx-auto h-full gap-4 lg:p-10 shadow-2xl rounded-md bg-white my-5 border-t-4 border-t-orange-500 relative overflow-auto">
        <span className="font-semibold text-2xl">
          Place a check next to the ways you learn best. Please hover over questions to understand it better.
          <br />
          <span className="italic text-gray-500 text-xl">( Parents can also administer this profile aloud for students and record their responses.)</span>
        </span>
        <table className="table-auto border-collapse shadow-2xl bg-amber-50 rounded-lg w-full overflow-auto">
          <thead>
            <tr>
              <th className="p-2 text-left w-16">S.No.</th>
              <th className="p-2 text-left">Questions</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => {
              const answerObj = checkResultData?.find((ans) => ans.que_id === question.id);
              const yesSelected = answerObj?.answer === "Yes";
              return (
                <tr className={yesSelected ? "py-2" : "py-2 bg-gray-200"} key={question.id}>
                  <td className="pl-4 w-16">
                    <span className="py-2 px-3 bg-yellow-400 text-white rounded-full">
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-2">
                    <Tooltip title={question.que_detail}
                      position="bottom"
                      trigger="mouseenter"
                      arrow={true}
                      animation="shift"
                      duration={200}
                      inertia={true}
                      hideDelay={100}
                      interactive={true}
                      theme="light" >
                      <span>
                        {question.que_title}<span className="text-blue-500 text-2xl">  . . .</span>
                      </span>
                    </Tooltip>
                  </td>
                  <td className="p-4 pr-8 text-center">
                    <label>
                      <input
                        type="checkbox"
                        name={question.id}
                        disabled={!yesSelected}
                        defaultChecked={!yesSelected}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          handleAnswerSelect(
                            question.id,
                            !checked ? question.choice_1 : question.choice_2,
                            !checked ? question.score_choice_1 : question.score_choice_2,
                          )
                        }
                        }
                        className="h-4 w-4"
                      />
                      <span></span>
                    </label>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="uppercase py-3 px-2 bg-yellow-400 w-32 text-white m-5 rounded-md mx-auto flex justify-center hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
      >
        Submit
      </button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        res={res}
        player_id={player_id}
        heading={"Are you sure you want to submit?"}
        firstText={"No"}
        secondText={"Yes"}
      />
      <Modal
        open={openCheckModal}
        onClose={() => setOpenCheckModal(false)}
        heading={"You have to select only 6 items as Yes!"}
        firstText={"Ok"}
      />
    </div>
  );
};

export default CheckQuestions;
