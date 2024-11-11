// src/PHQ9Quiz.tsx

import { useState } from 'react';

import {
  Dialog,

  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from './ui/button';

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const phq9Questions: Question[] = [
  {
    id: 1,
    question: "Little interest or pleasure in doing things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Feeling down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Trouble falling or staying asleep, or sleeping too much?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Feeling tired or having little energy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Poor appetite or overeating?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Trouble concentrating on things, such as reading the newspaper or watching television?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 9,
    question: "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
];

const getPHQ9Feedback = (score: number): string => {
  if (score <= 4) return "Minimal Depression. Maintain healthy habits.";
  if (score <= 9) return "Mild Depression. Consider mindfulness resources.";
  if (score <= 14) return "Moderate Depression. Explore counseling options.";
  if (score <= 19) return "Moderately Severe Depression. Professional help suggested.";
  return "Severe Depression. Immediate professional help is needed.";
};


const PHQ9Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(phq9Questions.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleOptionChange = (questionId: number, selectedScore: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = selectedScore;
    setAnswers(newAnswers);
  };

  
  const handleSubmit = () => {
    if (answers.some((answer) => answer === null)) {
      return;
    }
    const score = answers.reduce((acc: number, score) => acc + (score || 0), 0);
    setTotalScore(score);
    setSubmitted(true);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg max-w-lg mx-auto mt-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">PHQ-9 Quiz</h2>
      {phq9Questions.map((question) => (
        <div key={question.id} className="mb-6 p-5 border border-gray-300 rounded-lg bg-white shadow-lg transition-transform transform ">
        <p className="font-semibold text-lg text-gray-800">{question.question}</p>
        <div className="flex flex-col space-y-4 mt-3">
          {question.options.map((option) => (
            <label key={option.text} className="flex items-center text-gray-700 hover:text-blue-600 transition">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.score}
                onChange={() => handleOptionChange(question.id, option.score)}
                className="mr-4 text-blue-500 focus:ring-blue-500 cursor-pointer"
              />
              <span className="p-2">{option.text}</span>
            </label>
          ))}
        </div>
      </div>
      ))}

      <Dialog>
        <DialogTrigger>
        <Button type="button" variant="secondary" onClick={handleSubmit} className='bg-blue-600 hover:bg-blue-800 w-full text-white font-semibold'>
              Submit
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Total Score</DialogTitle>
          </DialogHeader>
          {submitted && (
            <div className="mt-8 bg-blue-50 p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold">Total Score: {totalScore}</h3>
              <p className="text-md mt-2 text-gray-800">{getPHQ9Feedback(totalScore ?? 0)}</p>
            </div>
          )}
          {
            !submitted && (<div className="mt-8 bg-blue-50 p-4 rounded-md shadow-md">
              <p className="text-md mt-2 text-gray-800">Answer all questions to get an accurate score.</p>
            </div>
          )
          }
          
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className='hover:bg-blue-300 w-full'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};



export default PHQ9Quiz;





