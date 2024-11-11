import Timer from "../timer";
import bre0 from "../../assets/exercis/424-breathing.gif";
import bre1 from "../../assets/exercis/478-breathing.gif";
import bre3 from "../../assets/exercis/box-breathing.gif";
import the from "../../assets/exercis/meditation-amp-relax-238980.mp3";
import { useRef } from "react";

const MindfulnessExercises: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const exercises = [
    {
      name: '4-7-8 Breathing',
      description: 'A calming breathing technique to reduce stress and anxiety. Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds.',
      duration: 60,
      gif: bre1,
      instructions: [
        'Inhale quietly through your nose for 4 seconds.',
        'Hold your breath for a count of 7.',
        'Exhale completely through your mouth for 8 seconds, making a whoosh sound.',
        'Repeat the cycle for the duration of the exercise.',
      ],
    },
    {
      name: '4-2-4 Breathing',
      description: 'A simple rhythmic breathing exercise for calming the mind. Inhale for 4 seconds, hold for 2, and exhale for 4 seconds.',
      duration: 60,
      gif: bre0,
      instructions: [
        'Inhale through your nose for 4 seconds.',
        'Hold your breath for 2 seconds.',
        'Exhale through your mouth for 4 seconds.',
        'Continue the process until the timer runs out.',
      ],
    },
    {
      name: 'Box Breathing',
      description: 'A steady breathing technique to promote calmness. Inhale, hold, exhale, and pause for equal counts of 4 seconds.',
      duration: 60,
      gif: bre3,
      instructions: [
        'Inhale through your nose for 4 seconds.',
        'Hold your breath for 4 seconds.',
        'Exhale slowly through your mouth for 4 seconds.',
        'Pause for 4 seconds before the next inhale.',
      ],
    },
  ];

  const handleA = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleW = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Mindfulness Breathing Exercises</h2>
      <p className="text-center mb-8 text-gray-700">
        Practice these breathing techniques to calm your mind and body. Follow the instructions carefully for the best results.
      </p>
      
      <audio ref={audioRef} src={the} />
      
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center bg-white rounded-lg mb-8 p-6 shadow-lg overflow-hidden w-full max-w-xl mx-auto"
        >
          <div className="flex flex-col items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
            <p className="text-gray-600 text-center">{exercise.description}</p>
          </div>

          <img
            src={exercise.gif}
            alt={`${exercise.name} gif`}
            className="mb-4 w-64 max-w-md object-cover rounded-lg"
          />

          {/* Instructions for the exercise */}
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-700">Instructions:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {exercise.instructions.map((step, stepIndex) => (
                <li key={stepIndex} className="mt-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Timer UI */}
          <Timer duration={exercise.duration} handleA={handleA} handleW={handleW} />
        </div>
      ))}
    </div>
  );
};


export default MindfulnessExercises;









