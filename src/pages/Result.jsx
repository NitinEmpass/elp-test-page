/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import DOMPurify from "dompurify";
import Modal from "../components/Modal";
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
    window.history.replaceState(null, "/", window.location.href);
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
              task: process.env.REACT_APP_WEBSITE_RESULT,
              token: process.env.REACT_APP_WEBSITE_TOKEN,
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
        <span className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text text-xl text-center">
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
        suggestedMax: 8,
      },
    },
  };

  const details = DOMPurify.sanitize(result.detail_info);
  const info = DOMPurify.sanitize(result.glossary);

  return (
    <div className="w-full overflow-hidden flex flex-col justify-center items-center bg-[url(./assets/images/bg-logo.png)] bg-cover bg-no-repeat h-full gap-4 lg:py-0 py-2 lg:p-5">
      <div className="w-[90%] lg:w-[80%] m-5 p-5 shadow-2xl border-t-4 border-t-red-500 bg-white flex flex-col gap-5 items-center justify-center rounded-md">
        <h1 className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text text-5xl text-center pb-2 border-b-[0.2rem] border-b-red-400">
          SPI Result
        </h1>
        {error ? (
          <p className="bg-red-500 p-3 my-2 rounded-md text-white">{error}</p>
        ) : null}

        <span className="my-2 text-gray-400 text-2xl">
          Thank you for taking this test!
        </span>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="max-w-48 max-h-60 border-4 border-red-400 rounded-md flex flex-col items-center justify-center">
            <div className="w-full flex-1 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-center p-2 text-white text-4xl flex items-center justify-center">
              <span>Test Score</span>
            </div>
            <div className="flex items-center justify-center w-full flex-1 border-t-4 border-t-red-400 text-4xl text-center p-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-transparent bg-clip-text break-all whitespace-break-spaces">
              <span>{result.total_score}</span>
            </div>
          </div>
          <div className="max-w-xl max-h-60 border-4 border-red-400 rounded-md flex flex-col items-center justify-center">
            <div className="w-full flex-1 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-center p-2 text-white text-4xl flex items-center justify-center">
              <span>Dominant Style</span>
            </div>
            <div className="flex items-center justify-center w-full flex-1 border-t-4 border-t-red-400 text-4xl text-center p-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-transparent bg-clip-text break-all whitespace-break-spaces">
              <span>{result.dominant_style}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[50vh] lg:w-[60%] shadow-lg rounded-xl overflow-auto">
          <Radar
            data={chartConfig}
            options={{ ...options, maintainAspectRatio: false }}
          />
        </div>

        <div className="flex flex-col items-center gap-3 w-[90%]">
          <span className="text-xl">
            For more results & reports, click below!
          </span>
          <button
            className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red py-3 px-4 text-white rounded-md hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
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
            firstText={"Ok"}
          />
        </div>
        <div className="my-2 flex flex-col w-full lg:w-[85%] gap-3">
          <h1 className="text-lg text-gray-700 font-medium ">
            <span>{result.label_info}</span>
          </h1>
          <div className="border border-gray-600 px-2 lg:px-5 py-2 text-gray-500 rounded-md overflow-auto max-h-[600px]">
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </div>
        </div>
      </div>
      <hr className="border-2 border-gray-400 w-[90%] lg:w-[80%] mx-auto" />
      <div className="my-2 flex flex-col mx-auto justify-center items-center lg:w-[80%] gap-3 p-2 lg:p-5 shadow-xl w-[90%] bg-white rounded-xl">
        <h2 className="text-xl">Details about Learning Styles</h2>
        <div
          className="text-gray-600 p-2 w-[90%] leading-8"
          dangerouslySetInnerHTML={{ __html: info }}
        />
      </div>
    </div>
  );
};

export default Result;
