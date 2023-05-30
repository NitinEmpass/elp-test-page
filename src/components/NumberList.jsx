import { useEffect, useMemo, useRef } from "react";
import CustomTour from "./CustomTour";

export function NumberList({
  current,
  setCurrent,
  questions,
  checked,
  tour,
  setTour,
  disabled,
  setDisabled,
}) {
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
  }, [current]);

  const numbers = useMemo(() => {
    return Array.from({ length: questions.length }, (_, i) => {
      const number = i + 1;
      const isCurrent = number === current + 1;
      const isChecked = checked.includes(number);
      // const isCheckedBox = checkboxArray.includes(number);
      const className = `question-number px-4 py-3 lg:px-3 lg:py-2 border rounded-full cursor-pointer hover:bg-gradient-to-r ${
        isChecked
          ? "bg-[#9fe59f] text-black"
          : // ? isCheckedBox
            //   ? "bg-[#737373] text-white"
            //   : "bg-[#9fe59f] text-black"
            "bg-white text-black"
      } ${
        isCurrent &&
        "bg-gradient-to-r from-gsl-light-red to-gsl-dark-red text-white"
      }`;
      return (
        <div
          className={className}
          key={number}
          onClick={() => {
            setCurrent(number - 1);
            if (disabled === true) {
              setDisabled(false);
            }
          }}
        >
          {number <= 9 ? `0${number}` : number}
        </div>
      );
    });
  }, [checked, current, disabled, questions.length, setCurrent, setDisabled]);

  return (
    <div
      className="flex items-center w-full overflow-x-auto pb-5"
      ref={containerRef}
    >
      <div className="flex justify-center items-center gap-4">{numbers}</div>
      <div
        className={`flex justify-center items-center gap-4 ${
          tour > 4 && tour < 8 ? "absolute" : "hidden"
        }`}
      >
        <div className="question-number px-4 py-3 lg:px-3 lg:py-2 border rounded-full cursor-pointer hover:bg-gradient-to-r bg-[#9fe59f] text-white">
          01
        </div>
        <div className="question-number px-4 py-3 lg:px-3 lg:py-2 border rounded-full cursor-pointer hover:bg-gradient-to-r bg-[#9fe59f] text-white">
          02
        </div>
        <div className="question-number px-4 py-3 lg:px-3 lg:py-2 border rounded-full cursor-pointer hover:bg-gradient-to-r bg-white text-black">
          03
        </div>
        <div className="question-number px-4 py-3 lg:px-3 lg:py-2 border rounded-full cursor-pointer hover:bg-gradient-to-r bg-white text-black">
          04
        </div>
      </div>
      {/* <CustomTour
          content="Item you chose 'I have never done this'"
          isTour={tour === 6 ? true : false}
          setTour={setTour}
          className="bottom-24 left-12 rounded-bl-none"
        /> */}
      <CustomTour
        content="Item attempted"
        isTour={tour === 5 ? true : false}
        setTour={setTour}
        className="bottom-24 left-24 rounded-bl-none"
      />
      <CustomTour
        content="Item unattempted"
        isTour={tour === 6 ? true : false}
        setTour={setTour}
        className="bottom-24 left-40 rounded-bl-none"
      />
    </div>
  );
}
