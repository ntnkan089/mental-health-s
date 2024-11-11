import React, { useState } from 'react';

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

// Define types for the GAD-7 question and options
type Option = {
  text: string;
  score: number;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
};

const gad7Questions: Question[] = [
  {
    id: 1,
    question: "Feeling nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Not being able to stop or control worrying?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Worrying too much about different things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Trouble relaxing?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Being so restless that it's hard to sit still?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Becoming easily annoyed or irritable?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Feeling afraid as if something awful might happen?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Almost every day", score: 3 },
    ],
  },
];

const getGAD7Feedback = (score: number): string => {
  if (score <= 4) return "Minimal Anxiety. Practice relaxation techniques.";
  if (score <= 9) return "Mild Anxiety. Try anxiety management exercises.";
  if (score <= 14) return "Moderate Anxiety. Seek counseling support.";
  return "Severe Anxiety. Consult a mental health professional.";
};

const GAD7Quiz: React.FC = () => {


  const [answers, setAnswers] = useState<(number | null)[]>(Array(gad7Questions.length).fill(null));
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
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">GAD-7 Quiz</h2>
      {gad7Questions.map((question) => (
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
              <p className="text-md mt-2 text-gray-800">{getGAD7Feedback(totalScore ?? 0)}</p>
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


export default GAD7Quiz;






