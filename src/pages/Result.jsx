import React, { useCallback, useContext, useEffect, useState } from "react";
// import { Radar } from "react-chartjs-2";
// import Chart from "chart.js/auto";
import axios from "axios";
// import DOMPurify from "dompurify";
import Modal from "../components/Modal";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Confetti from "react-confetti";
import logo from "../assets/images/SPI logo.jpg";

const Result = () => {
  const { player_id, name, email, age, gender, grade } =
    useContext(UserContext);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (!player_id) {
      navigate("/");
    }
  }, [navigate, player_id]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (showConfetti) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      body.style.overflow = ""; // Re-enable scrolling on component unmount
    };
  }, [showConfetti]);

  const [openModal, setOpenModal] = useState(false);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

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

    setShowConfetti(true);
    /* const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 9000); // Set the duration (in milliseconds) for the confetti effect
    return () => clearTimeout(timer); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /* const { chart_data } = result;
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
        label: "User Score",
        data,
        fill: false,
        backgroundColor: "rgba(255,49,49,0.4)",
        borderColor: "rgba(255,49,49,1.000)",
        pointBackgroundColor: "rgba(255,49,49,1.000)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,49,49,1.000)",
      },
      {
        label: "Class Score",
        data: [5, 3, 5, 6, 4, 4, 6, 5, 2, 3, 4, 6],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 8,
        pointLabels: {
          font: {
            weight: "bold", // Set the font weight to bold
            size: 14,
          },
        },
      },
    },
  };
  const smallScreenOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 8,
        pointLabels: {
          font: {
            size: 10,
          },
        },
      },
    },
  }; */

  // const details = DOMPurify.sanitize(result.detail_info);
  // const info = DOMPurify.sanitize(result.glossary);

  return (
    <div className="relative">
      <Navbar />
      {showConfetti && (
        <div className="z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={true}
            numberOfPieces={400}
            gravity={0.02} // Adjust the gravity value to control the speed
            className="animate-opacity"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#f9f9f9] z-[1]">
            <img
              src={logo}
              alt="SPI"
              className="absolute left-[30%] lg:left-[42%] top-0 w-[40%] lg:w-[15%]"
            />
            <span className="w-[90%] lg:w-[60%] mt-[10rem] flex flex-col justify-center items-center gap-5 lg:gap-10 text-2xl lg:text-4xl text-center z-10 bg-transparent text-black rounded-xl mx-auto py-5 my-7 animate-lazily ease-in-out duration-300">
              <h1 className="text-gsl-light-red text-center text-5xl lg:text-7xl p-5 text-stroke">
                The 12 Ways of Processing
              </h1>
              Congratulations! You have successfully completed the assessment.
            </span>
            <div className="w-full flex justify-center items-center">
              <button
                className="uppercase tracking-wide py-3 px-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red w-40 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold animate-lazily"
                onClick={() => setShowConfetti(false)}
              >
                View Result
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center gap-4 lg:py-0 py-2 lg:p-5">
        <div className="w-[90%] lg:w-[80%] m-5 p-5 shadow-2xl border-t-4 border-t-gsl-dark-red bg-white flex flex-col items-center justify-center rounded-md gap-5 mb-10 lg:mb-20">
          <div className="grid lg:grid-cols-2 gap-4 border-2 border-gsl-dark-red p-4 w-full lg:w-[80%] shadow-xl rounded-lg justify-center items-center text-lg lg:text-2xl">
            <div className="row-span-6 flex gap-5 lg:gap-10 items-center">
              <div className="col-span-3 flex flex-col gap-4">
                <span>Name</span>
                <span>Age</span>
                <span>Gender</span>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <span className="font-bold">{name}</span>
                <span className="font-bold">{age}</span>
                <span className="font-bold capitalize">{gender}</span>
              </div>
            </div>
            <div className="row-span-6 flex gap-5 lg:gap-10 items-center">
              <div className="col-span-3 flex flex-col gap-4">
                <span>Email</span>
                <span>Grade</span>
                <span>Section</span>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  className="font-bold"
                  title={email}
                  rel="noreferrer"
                >
                  {email.toString().length > 20
                    ? email.toString().slice(0, 20) + "..."
                    : email}
                </a>
                <span className="font-bold">{grade}</span>
                <span className="font-bold">NA</span>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col gap-2">
            <h1 className="bg-gradient-to-r from-gsl-light-red to-gsl-dark-red inline-block text-transparent bg-clip-text text-3xl lg:text-5xl text-center pb-3 border-b-[0.2rem] border-b-red-400">
              Student Processing Inventory (SPI) Result
            </h1>
            <span className="font-semibold text-base lg:text-2xl text-center">
              Embrace and Accommodate Neurodiversity
            </span>
            {error ? (
              <p className="bg-gsl-dark-red p-3 my-2 rounded-md text-white">
                {error}
              </p>
            ) : null}
          </div> */}
          {error ? (
            <p className="bg-gsl-dark-red p-3 my-2 rounded-md text-white">
              {error}
            </p>
          ) : null}
          <div className="lg:my-2 text-black text-lg lg:text-2xl mx-auto break-words text-left">
            Dear <span className="font-semibold">{name}</span>,<br />
            Congratulations! You have successfully completed the assessment.
            <br />
            <div className="py-5">
              Based on your test, your dominant style(s) & detailed results
              are as shown below.
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            {/*  <div className="max-w-48 max-h-60 border-4 border-red-400 rounded-md flex flex-col items-center justify-center">
              <div className="w-full flex-1 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-center p-2 text-white text-4xl flex items-center justify-center">
                <span>Test Score</span>
              </div>
              <div className="flex items-center justify-center w-full flex-1 border-t-4 border-t-red-400 text-4xl text-center p-2 bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-transparent bg-clip-text break-all whitespace-break-spaces">
                <span>{result.total_score}</span>
              </div>
            </div> */}
            <div className="max-w-xl max-h-60 border-4 border-black/50 rounded-md flex flex-col items-center justify-center">
              <div className="w-full flex-1 bg-[#87cb28] text-center p-2 text-black text-xl lg:text-4xl flex items-center justify-center">
                <span>Dominant Style(s)</span>
              </div>
              <div className="flex items-center justify-center w-full flex-1 border-t-4 border-t-black/50 text-xl lg:text-3xl text-center p-2 text-black break-all whitespace-break-spaces capitalize">
                <span>{result.dominant_style.toLowerCase()}</span>
              </div>
            </div>
          </div>

          {/* <div className="w-full lg:w-[90%] h-[40vh] lg:h-[90vh] shadow-lg rounded-xl overflow-auto mt-5 hidden lg:block">
            <Radar data={chartConfig} options={options} />
          </div>
          <div className="w-full lg:w-[90%] h-[40vh] lg:h-[90vh] shadow-lg rounded-xl overflow-auto mt-5 lg:hidden">
            <Radar data={chartConfig} options={smallScreenOptions} />
          </div> */}

          <div className="my-5 lg:my-10 relative w-full mx-auto h-full overflow-auto lg:w-[70%] shadow-2xl rounded-xl">
            <table className="w-full bg-white border-stone-50 border-2 overflow-hidden">
              <thead className="text-lg lg:text-2xl overflow-hidden">
                <tr className="border-2 bg-gsl-light-red text-white overflow-hidden">
                  <th className="lg:w-10"></th>
                  <th className="lg:w-20"></th>
                  <th className="p-1 lg:py-2 border-2 border-l-0 font-semibold text-left lg:px-6">
                    Ways of Processing
                  </th>
                  <th className="p-1 px-3 lg:py-2 lg:px-8 border-2 font-semibold">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.choice_count.map((item, index) => {
                  let color = item.group_score_color
                    ? item.group_score_color
                    : "white";
                  console.log(color);
                  return (
                    <tr
                      key={item.group_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100/80" : "bg-white/80"
                      } text-center text-lg lg:text-2xl text-black`}
                    >
                      <td className="lg:w-10"></td>
                      <td className="lg:w-20"></td>
                      <td className="p-1 lg:py-2 text-left lg:px-6 capitalize">
                        {item.group_name.toLowerCase()}
                      </td>
                      <td className="p-2 lg:py-2 lg:px-6 text-2xl">
                        <span
                          className="p-1 px-3 rounded-full border text-2xl font-semibold text-center min-w-5"
                          style={{
                            backgroundColor: `${item.group_score_color}`,
                          }}
                        >
                          {item.group_score}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="my-5 lg:my-10 relative w-full h-full overflow-auto lg:w-[90%] shadow-2xl rounded-xl">
            <table className="w-full bg-white border-stone-50 border-2">
              <thead className="text-base lg:text-xl">
                <tr className="border-2 bg-gsl-light-red text-white">
                  <th className="p-1 lg:py-2 border-2 font-semibold text-left lg:px-6">
                    Processing Styles
                  </th>
                  <th className="p-1 px-3 lg:py-2 border-2 font-semibold">
                    Yes <br /> (2 Points)
                  </th>
                  <th className="p-1 px-3 lg:py-2 border-2 font-semibold">
                    Sometimes <br /> (1 Points)
                  </th>
                  <th className="p-1 px-3 lg:py-2 border-2 font-semibold">
                    No <br />
                    (0 Points)
                  </th>
                  <th className="p-1 lg:py-2 border-2 font-semibold">
                    I have never done this <br /> (-)
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.choice_count.map((item, index) => {
                  return (
                    <tr
                      key={item.group_id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100/80" : "bg-white/80"
                      } text-center text-lg text-black`}
                    >
                      <td className="p-1 lg:py-2 text-left lg:px-4">
                        {item.group_name}
                      </td>
                      <td className="p-2 lg:px-2 lg:py-5 font-semibold text-xl">
                        {item.choice_1_count}
                      </td>
                      <td className="p-2 lg:px-2 lg:py-5 font-semibold text-xl">
                        {item.choice_2_count}
                      </td>
                      <td className="p-2 lg:px-2 lg:py-5 font-semibold text-xl">
                        {item.choice_3_count}
                      </td>
                      <td className="p-2 lg:py-2 min-w-40 font-semibold text-xl">
                        {item.choice_4_count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
          <div className="flex flex-col items-center gap-3 w-[90%]">
            <button
              className="uppercase bg-gradient-to-r from-gsl-light-red to-gsl-dark-red py-3 px-4 text-white rounded-md hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              onClick={() => {
                scrollToTop();
                setOpenModal(true);
              }}
            >
              Request Detailed Report
            </button>
          </div>
          {/* <div className="my-2 flex flex-col w-full lg:w-[85%] gap-3">
            <h1 className="text-lg text-gray-700 font-medium ">
              <span>{result.label_info}</span>
            </h1>
            <div className="border border-gray-600 px-2 lg:px-5 py-2 text-gray-500 rounded-md overflow-auto max-h-[600px]">
              <div dangerouslySetInnerHTML={{ __html: details }} />
            </div>
          </div> */}
        </div>
        {/* <div className="my-2 mb-10 lg:mb-28 flex flex-col mx-auto justify-center items-center lg:w-[80%] gap-3 p-2 lg:p-5 shadow-xl w-[90%] bg-white rounded-xl border-t-4 border-t-gsl-dark-red">
          <h2 className="text-xl font-bold">
            Brief definitions of the 12 Student Processing Styles
          </h2>
          <div
            className="text-gray-600 p-2 w-[90%] leading-8"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        </div> */}
      </div>
      <Footer />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        heading={
          "Thank you for taking this assessment! We will send you the report soon."
        }
        firstText={"Ok"}
      />
    </div>
  );
};

export default Result;
