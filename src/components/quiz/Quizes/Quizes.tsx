import { useEffect, useState, useCallback } from "react";
import { QuizCard } from "../QuizCard/QuizCard";
import { Button } from "@/components/ui/button";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false); // New state to track if an answer has been selected

  useEffect(() => {
    fetch("questions.json")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
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

  const handleAnswer = (isCorrect: boolean) => {
    if (!hasAnswered) { // Ensure score is updated only once per question
      if (isCorrect) {
        setScore(score + 1);
      }
      setHasAnswered(true);
    }
  };

  const resetAnswered = useCallback(() => {
    setHasAnswered(false); // Reset hasAnswered when moving to the next/previous question
  }, []);

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-12">
      <h2 className="text-center text-3xl mb-8">Quiz Question</h2>
      <div className="text-center mb-4 text-xl">Score: {score}</div>
      <div className="flex justify-center">
        <QuizCard
          quiz={quizzes[currentQuestionIndex]}
          onAnswer={handleAnswer}
          resetAnswered={resetAnswered} // Pass the reset function to the child component
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
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentQuestionIndex === quizzes.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Quizes;
