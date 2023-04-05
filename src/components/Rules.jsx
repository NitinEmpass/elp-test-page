import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Rules = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const player_id = location.state.player_id;
  console.log(player_id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const func = async () => {
      setLoading(true);

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
              task: "getcrtestque",
              token: "amazeqyjtstedf8ie04osghaqw",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log(res.data.data.crt_que);
          setQuestions(res.data.data.crt_que);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again later.");
        });
    };
    func();
  }, [player_id]);

  if (location.state === null) {
    return navigate("/");
  }
  return (
    <div className="bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat h-screen w-full">
      <div className="flex flex-col items-center w-[90%] lg:w-[50%] mx-auto gap-4 p-10 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl rounded-md bg-orange-50">
        {error ? (
          <p className="bg-red-500 p-3 my-2 rounded-md text-white">{error}</p>
        ) : null}
        <h1 className="text-4xl font-semibold text-center">
          ELP Self Assessment
        </h1>
        <div className="border-2 border-orange-500 w-full"></div>
        <span className="font-medium">
          Read all Instructions below before you start the Self Assessment.
        </span>
        <ol className="list-decimal w-[90%]">
          <li>There is 1 section in the ELP self-assessment.</li>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Executive Functions</span> traits
              that you possess based on your behavior in everyday life
            </li>
          </ul>
          <li>
            The self-assessment should be taken in a single sitting. It takes
            around 30 minutes to complete.
          </li>
          <li>Do not overthink any responses.</li>
          <li>
            Avoid trying to select the 'appropriate or best response' as there
            are no right or wrong answers.
          </li>
          <li>
            Attempt all items. Skipping any item will invalidate or affect the
            result accuracy.
          </li>
        </ol>

        <button
          type="submit"
          className="uppercase py-3 px-2 bg-yellow-400 w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold hover:shadow-xl"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <Link
              to="/ques"
              state={{ player_id: player_id, questions: questions }}
            >
              continue
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default Rules;
