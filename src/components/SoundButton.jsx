import React, { useEffect, useState } from "react";

const SoundButton = ({ src }) => {
  const [audio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    const handleAudioEnd = () => {
      setPlaying(false);
    };

    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, [audio]);

  const handlePlay = () => {
    console.log(src);
    audio.src = src; // Use require instead of import
    if (currentSrc !== src) {
      stopCurrentAudio();
      setCurrentSrc(src);
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handlePause = () => {
    console.log(src);
    audio.pause();
    setPlaying(false);
  };

  const stopCurrentAudio = () => {
    if (currentSrc !== null) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  };
  return (
    <button
      onClick={playing ? handlePause : handlePlay}
      className="border rounded-full p-2 bg-slate-50 hover:bg-slate-100 hover:scale-105 duration-300 ease-in-out"
    >
      {playing ? (
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          />
        </svg>
      ) : (
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
      )}
    </button>
  );
};

export default SoundButton;
