import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizCardProps = {
  quiz: QuizQuestion;
};

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <Card className="w-1/2">
      <CardContent>
        <form>
          <div className="flex flex-col space-y-1.5">
            <Label>{quiz.question}</Label>
            {quiz.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Next</Button>
      </CardFooter>
    </Card>
  );
};
