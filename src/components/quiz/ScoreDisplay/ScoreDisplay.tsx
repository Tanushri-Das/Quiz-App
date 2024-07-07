import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

type ScoreDisplayProps = {
  score: number;
  onRestart: () => void;
};

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Player
        src="https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
        className="player"
        loop
        autoplay
        style={{ height: "400px", width: "400px" }}
      />
      <h1 className="text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Your Score :{" "}
        <span className="font-extrabold text-transparent text-10xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {score}
        </span>
      </h1>
      <button
        onClick={onRestart}
        className="bg-white hover:bg-gray-100 my-10 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
      >
        Start Over
      </button>
    </div>
  );
};

export default ScoreDisplay;
