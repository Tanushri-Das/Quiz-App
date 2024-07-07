import { useState, useEffect } from "react";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";
import QuizCard from "../QuizCard/QuizCard";
import { Button } from "@/components/ui/button";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Array<string | null>>(
    []
  );

  useEffect(() => {
    fetch("questions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setSelectedOptions(Array(data.length).fill(null));
      });
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (isCorrect: boolean, option: string) => {
    if (!selectedOptions[currentQuestionIndex]) {
      // Ensure answer is given only once
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[currentQuestionIndex] = option;
      setSelectedOptions(updatedSelectedOptions);

      if (isCorrect) {
        setScore(score + 1); // Increment score only if correct
      }
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  if (showScore) {
    return <ScoreDisplay score={score} onRestart={handleRestart} />;
  }

  return (
    <div className="my-12">
      <h2 className="text-center text-4xl mb-8">
        Question #{currentQuestionIndex + 1}
      </h2>
      <div className="text-center mb-5 text-xl font-medium">Score: {score}</div>
      <div className="flex justify-center">
        <QuizCard
          quiz={quizzes[currentQuestionIndex]}
          onAnswer={handleAnswer}
          selectedOption={selectedOptions[currentQuestionIndex]}
        />
      </div>
      <div className="w-1/2 mx-auto flex justify-center space-x-5 mt-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        {currentQuestionIndex < quizzes.length - 1 ? (
          <Button variant="outline" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="outline" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quizes;
