import { Link } from 'react-router-dom';

const QuizLinks = () => {
  const quizzes = [
    {
      name: "PHQ-9 Quiz",
      description: "The PHQ-9 is a depression self-assessment quiz that helps evaluate levels of depression.",
      link: "/phq9",
    },
    {
      name: "GAD-7 Quiz",
      description: "The GAD-7 is a generalized anxiety disorder self-assessment quiz.",
      link: "/gad7",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Mental Health Quizzes</h1>
      <div className="space-y-8 max-w-lg mx-auto">
        {quizzes.map((quiz, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">{quiz.name}</h2>
            <p className="mt-2 text-gray-700">{quiz.description}</p>
            <Link
              to={quiz.link}
              className="mt-4 inline-block text-blue-500 hover:text-blue-600"
            >
              Take the {quiz.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizLinks;











