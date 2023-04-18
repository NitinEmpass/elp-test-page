import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";

const Questions = () => {
  const navigate = useNavigate();
  const { player_id, questions } = useContext(UserContext);
  console.log(questions, player_id);
  // const location = useLocation();
  // console.log(location);

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
  function handleAnswerSelect(questionId, selectedAnswer, score) {
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
    console.log(ans);
    setRes(ans);
  }

  const onSubmit = () => {
    //handling the 10 "Yes" answers condition
    const yesCount = res.reduce((count, answer) => {
      if (answer.answer === "Yes") {
        count++;
      }
      return count;
    }, 0);

    console.log(yesCount);

    scrollToTop();

    yesCount > 10 ? setOpenCheckModal(true) : setOpenModal(true);
  }

  if (!player_id || !questions) {
    return null;
  }
  return (
    <div className="bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat h-full w-full relative overflow-hidden">
      <div className="flex flex-col w-[90%] p-5 lg:w-[80%] mx-auto h-full gap-4 lg:p-10 shadow-2xl rounded-md bg-white my-5 border-t-4 border-t-orange-500 relative overflow-auto">
        <span className="font-semibold">
          Read each statement carefully. Select how well each of these
          statements describes you.
        </span>
        <table className="table-auto border-collapse shadow-2xl bg-amber-50 rounded-lg w-full overflow-auto">
          <thead>
            <tr>
              <th className="p-2">S.No.</th>
              <th className="p-2">Questions</th>
              <th className="p-4">No</th>
              <th className="p-4">Yes</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr className="p-2" key={question.id}>
                <td className="p-5">
                  <span className="py-2 px-3 bg-yellow-400 text-white rounded-full">
                    {index + 1}
                  </span>
                </td>
                <td className="p-2">{question.que_title}</td>
                <td className="p-2 text-center">
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value={question.choice_1}
                      onChange={() =>
                        handleAnswerSelect(
                          question.id,
                          question.choice_1,
                          question.score_choice_1
                        )
                      }
                      className="text-5xl h-4 w-4"
                    />
                    <span></span>
                  </label>
                </td>
                <td className="p-2 text-center">
                  <label>
                    <input
                      type="radio"
                      name={question.id}
                      value={question.choice_2}
                      className="text-5xl h-4 w-4"
                      onChange={() =>
                        handleAnswerSelect(
                          question.id,
                          question.choice_2,
                          question.score_choice_2
                        )
                      }
                    />
                    <span></span>
                  </label>
                </td>
              </tr>
            ))}
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
        heading={"You have selected more than 10 items as Yes, so would request you to select 6 out of all selected items."}
        secondText={"Ok"}
        callAPI={false}
        res={res}
      />
    </div>
  );
};

export default Questions;
