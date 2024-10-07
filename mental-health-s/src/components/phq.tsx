// src/PHQ9Quiz.tsx
import { useState } from 'react';

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
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Feeling down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 3,
    question: "Trouble falling or staying asleep, or sleeping too much?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Feeling tired or having little energy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Poor appetite or overeating?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 6,
    question: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 7,
    question: "Trouble concentrating on things, such as reading the newspaper or watching television?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 8,
    question: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
    ],
  },
  {
    id: 9,
    question: "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 },
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
      <h2 className="text-2xl font-semibold text-center mb-6">PHQ-9 Quiz</h2>
      {phq9Questions.map((question) => (
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
          <p className="text-md mt-2">{getPHQ9Feedback(totalScore??0)}</p>
        </div>
      )}
    </div>
  );
};

export default PHQ9Quiz;





