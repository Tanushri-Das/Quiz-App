import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizCardProps = {
  quiz: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
  resetAnswered: () => void; // New prop to reset answered state
};

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onAnswer, resetAnswered }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false); // New state to track if an answer has been selected

  useEffect(() => {
    setSelectedOption(null); // Reset selected option when quiz prop changes
    setHasAnswered(false); // Reset hasAnswered when quiz prop changes
    resetAnswered(); // Reset the parent's answered state
  }, [quiz, resetAnswered]);

  const handleOptionClick = (option: string) => {
    if (!hasAnswered) { // Ensure answer is only recorded once per question
      setSelectedOption(option);
      const isCorrect = option === quiz.correctAnswer;
      onAnswer(isCorrect);
      setHasAnswered(true);
    }
  };

  return (
    <Card className="w-1/2">
      <CardContent>
        <form className="pt-6">
          <div className="flex flex-col">
            <Label className="mb-4 text-xl font-semibold">{quiz.question}</Label>
            <div className="grid grid-cols-2 gap-4">
              {quiz.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 border p-2 ${
                    selectedOption !== null
                      ? option === quiz.correctAnswer
                        ? "bg-green-500 text-white"
                        : option === selectedOption
                        ? "bg-red-500 text-white"
                        : "bg-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="quiz-option"
                    value={option}
                    className="hidden"
                  />
                  <Label htmlFor={`option-${index}`} className="text-[16px] cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
