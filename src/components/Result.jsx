import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestData = {
    crt_id: "9",
    quiz_id: "9",
    player_id: location.state.player_id,
  };

  useEffect(() => {
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
          <div className="flex flex-row gap-4 flex-wrap items-center justify-center">
            <div className="border-4 border-orange-400 flex flex-col items-center justify-center rounded-md max-w-[300px]">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-center py-2 px-8 text-white font-semibold text-4xl border-b-4 border-b-orange-400">
                Test Score
              </div>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl text-center py-3">
                {result.total_score}
              </span>
            </div>
            <div className="border-4 border-orange-400 flex flex-col items-center justify-center rounded-md lg:hidden max-w-[300px]">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-center py-2 px-8 text-white font-semibold text-4xl border-b-4 border-b-orange-400">
                Dominant Style
              </div>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl text-center py-3">
                {result.dominant_style}
              </span>
            </div>
          </div>
          <div className="w-[90%] lg:w-[60%] shadow-lg rounded-xl">
            <Radar data={chartConfig} options={options} />
          </div>
          <div className="border-4 border-orange-400 hidden lg:flex flex-col items-center justify-center rounded-md max-w-[300px]">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-center py-2 px-1 text-white font-semibold text-4xl border-b-4 border-b-orange-400">
              Dominant Style
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text text-5xl text-center py-3">
              {result.dominant_style}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-[90%]">
          <span className="text-xl">
            For more results & reports, click below!
          </span>
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 py-3 px-4 text-white rounded-md hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
            Request your Report
          </button>
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
              <span>{result.detail_info}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
