import React, { useState } from 'react';

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
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Not being able to stop or control worrying?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Worrying too much about different things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Trouble relaxing?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Being so restless that it's hard to sit still?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Becoming easily annoyed or irritable?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Feeling afraid as if something awful might happen?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
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
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (questionId: number, selectedScore: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = selectedScore;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.some((answer) => answer === null)) {
      alert('Please answer all questions.');
      return;
    }
    setSubmitted(true);
  };

  const totalScore = answers.reduce((acc: number, score) => acc + (score || 0), 0); // Default to 0 for null scores


  return (
  
  <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">GAD-7 Quiz</h2>
      {gad7Questions.map((question) => (
        <div key={question.id} className="mb-4">
          <p className="font-medium">{question.question}</p>
          <div className="flex flex-col space-y-2">
            {question.options.map((option) => (
              <label key={option.text} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.score}
                  onChange={() => handleOptionChange(question.id, option.score)}
                  className="mr-2"
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>

      {submitted && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Total Score: {totalScore}</h3>
          <p className="text-md mt-2">{getGAD7Feedback(totalScore??0)}</p>
        </div>
      )}
    </div>
  );
};


export default GAD7Quiz;





