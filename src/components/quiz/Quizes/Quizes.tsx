// import { useEffect, useState, useCallback } from "react";
// import { QuizCard } from "../QuizCard/QuizCard";
// import { Button } from "@/components/ui/button";

// const Quizes = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [hasAnswered, setHasAnswered] = useState(false); // New state to track if an answer has been selected

//   useEffect(() => {
//     fetch("questions.json")
//       .then((res) => res.json())
//       .then((data) => setQuizzes(data));
//   }, []);

//   const handleNext = () => {
//     if (currentQuestionIndex < quizzes.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleAnswer = (isCorrect: boolean) => {
//     if (!hasAnswered) {
//       // Ensure score is updated only once per question
//       if (isCorrect) {
//         setScore(score + 1);
//       }
//       setHasAnswered(true);
//     }
//   };

//   const resetAnswered = useCallback(() => {
//     setHasAnswered(false); // Reset hasAnswered when moving to the next/previous question
//   }, []);

//   if (quizzes.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="my-12">
//       <h2 className="text-center text-3xl mb-8">
//         Question {currentQuestionIndex + 1}
//       </h2>
//       <div className="text-center mb-4 text-xl font-medium">Score : {score}</div>
//       <div className="flex justify-center">
//         <QuizCard
//           quiz={quizzes[currentQuestionIndex]}
//           onAnswer={handleAnswer}
//           resetAnswered={resetAnswered} // Pass the reset function to the child component
//         />
//       </div>
//       <div className="w-1/2 mx-auto flex justify-center space-x-5 mt-4">
//         <Button
//           variant="outline"
//           onClick={handlePrev}
//           disabled={currentQuestionIndex === 0}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           onClick={handleNext}
//           disabled={currentQuestionIndex === quizzes.length - 1}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Quizes;









import { useEffect, useState, useCallback } from "react";
import { QuizCard } from "../QuizCard/QuizCard";
import { Button } from "@/components/ui/button";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";

const Quizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);

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
    if (!hasAnswered) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setHasAnswered(true);
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const resetAnswered = useCallback(() => {
    setHasAnswered(false);
  }, []);

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  if (showScore) {
    return <ScoreDisplay score={score} onRestart={handleRestart} />;
  }

  return (
    <div className="my-12">
      <h2 className="text-center text-4xl mb-8">
        Question : #{currentQuestionIndex + 1}
      </h2>
      <div className="text-center mb-5 text-xl font-medium">Score : {score}</div>
      <div className="flex justify-center">
        <QuizCard
          quiz={quizzes[currentQuestionIndex]}
          onAnswer={handleAnswer}
          resetAnswered={resetAnswered}
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
