import React, { useContext, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import DOMPurify from "dompurify";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { player_id } = useContext(UserContext);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!player_id) {
      navigate("/");
    }
  }, [navigate, player_id]);

  const [openModal, setOpenModal] = useState(false);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function disableBackButton() {
    window.history.pushState(null, "/", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.replaceState(null, "", window.location.href);
  }

  console.log(player_id);
  const requestData = {
    crt_id: "9",
    quiz_id: "9",
    player_id: player_id,
  };

  useEffect(() => {
    disableBackButton();
    async function fetchData() {
      setLoading(true);
      await axios
        .post(
          "/UserProfile",
          { data: requestData },
          {
            headers: {
              task: "getelptestresult",
              token: "amazeqyjtstedf8ie04osghaqw",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setResult(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again later.");
        });
    }

    fetchData();
    console.log(result);
  }, []);

  if (loading || result === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-xl text-center">
          Getting your result...
        </span>
      </div>
    );

  const { chart_data } = result;
  const labels = [];
  const data = [];

  for (let i = 0; i < chart_data.group_name.length; i++) {
    labels.push(chart_data.group_name[i]);
    data.push(chart_data.group_score[i]);
  }
  const chartConfig = {
    labels,
    datasets: [
      {
        label: "Score",
        data,
        fill: true,
        backgroundColor: "rgba(249,115,22,0.4)",
        borderColor: "rgba(249,115,22,1.000)",
        pointBackgroundColor: "rgba(249,115,22,1.000)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(249,115,22,1.000)",
      },
    ],
  };
  const options = {
    responsive: true,
    layout: {
      padding: 10,
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  const details = DOMPurify.sanitize(result.detail_info);
  const info = DOMPurify.sanitize(result.glossary);

  return (
    <div className="w-full overflow-hidden flex justify-center bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat h-full">
      <div className="w-[90%] lg:w-[80%] m-5 p-5 shadow-2xl border-t-4 border-t-orange-500 bg-white flex flex-col gap-5 items-center justify-center rounded-md">
        <h1 className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl text-center pb-2 border-b-[0.2rem] border-b-orange-400">
          ELP Result
        </h1>
        {error ? (
          <p className="bg-red-500 p-3 my-2 rounded-md text-white">{error}</p>
        ) : null}

        <span className="my-2 text-gray-400 text-2xl">
          Thank you for taking this test!
        </span>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 w-[90%]">
          <div className="flex flex-row gap-4 lg:gap-16 flex-wrap items-center justify-center">
            <div className="border-4 border-orange-400 flex flex-col items-center justify-center rounded-md max-w-[300px] h-48 flex-grow">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-center p-8 text-white font-semibold text-4xl border-b-4 border-b-orange-400 w-full h-full">
                Test Score
              </div>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl text-center py-3">
                {result.total_score}
              </span>
            </div>
            <div className="border-4 border-orange-400 flex flex-col items-center justify-center rounded-md max-w-[300px] h-48 flex-grow">
              <div className="p-4 border-b-4 border-b-orange-400 bg-gradient-to-r from-orange-500 to-yellow-500 text-center text-4xl font-semibold text-white w-full h-full">
                Dominant Style
              </div>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-4xl text-center py-3 w-[100%] break-words whitespace-break-spaces">
                {result.dominant_style}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[90%] lg:w-[60%] shadow-lg rounded-xl">
          <Radar data={chartConfig} options={options} />
        </div>

        <div className="flex flex-col items-center gap-3 w-[90%]">
          <span className="text-xl">
            For more results & reports, click below!
          </span>
          <button
            className="bg-gradient-to-r from-orange-500 to-yellow-500 py-3 px-4 text-white rounded-md hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
            onClick={() => {
              scrollToTop();
              setOpenModal(true);
            }}
          >
            Request your Report
          </button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            heading={
              "Thank you for taking this test! We will send you the report soon."
            }
            firstText={"Close"}
          />
        </div>
        <div className="my-2 flex flex-col w-full lg:w-[85%] gap-3">
          <h1 className="text-lg text-gray-700 font-medium ">
            {result.label_info === "" ? (
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate natus nemo ipsa ab dicta eligendi iusto sit quidem
                quam ullam, ad nihil in laborum magnam totam, corporis officiis
                reprehenderit facere.
              </span>
            ) : (
              <span>{result.label_info}</span>
            )}
          </h1>
          <div className="border border-gray-600 shadow-2xl px-5 py-2 text-gray-500 rounded-md overflow-auto max-h-[600px]">
            {result.detail_info === "" ? (
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
                exercitationem! Provident similique aliquid explicabo vel harum
                fuga architecto, laudantium in perferendis est suscipit quam
                doloribus tempore officiis accusamus quisquam non laboriosam
                rem? Dolorem cupiditate doloremque sed a consequatur, unde sit
                voluptatibus tenetur voluptates perspiciatis ut. Amet quo,
                sapiente quod nobis facilis quas iste obcaecati commodi sequi?
                Molestiae perspiciatis suscipit natus corrupti ad, ipsa facere
                nulla consectetur quasi exercitationem, aliquid doloremque
                perferendis eius, id rerum. Nobis dignissimos nam ex
                voluptatibus dolores?
              </span>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: details }} />
            )}
          </div>
        </div>
        <hr className="border-2 w-full border-gray-400" />
        <div className="my-2 flex flex-col w-full lg:w-[85%] gap-3">
          <h2 className="text-3xl">Strategies Details</h2>
          <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: info }} />
        </div>
      </div>
    </div>
  );
};

export default Result;
