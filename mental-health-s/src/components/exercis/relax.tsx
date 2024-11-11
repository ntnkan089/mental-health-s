import the from "../../assets/exercis/meditation-amp-relax-238980.mp3";

import { useRef } from "react";

const RelaxationTechniques: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const techniques = [
    {
      name: 'Progressive Muscle Relaxation',
      description: 'Gradually tense and relax each muscle group to release tension and stress.',
      duration: 50,
      youtube: 'https://www.youtube.com/embed/_1h-zizAGsc',

    },
    {
      name: 'Autogenic Training',
      description: 'A self-relaxation technique where you focus on feelings of warmth and heaviness in different parts of your body.',
      duration: 45,
      youtube: 'https://www.youtube.com/embed/aKo8vQDa4wY',
      instructions: [
        'Find a quiet place and sit or lie down comfortably.',
        'Focus on your breath and gradually relax your body.',
        'Visualize warmth and heaviness spreading through each limb, starting from your arms and legs.',
        'Repeat calming phrases like "My arms are heavy" or "My heart is calm".',
      ],
    },
    {
      name: 'Guided Meditation',
      description: 'Follow a guided meditation session to help you focus, reduce stress, and promote mindfulness.',
      duration: 60,
      youtube: 'https://www.youtube.com/embed/ZToicYcHIOU', // YouTube link for meditation
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Relaxation Techniques</h2>
      <p className="text-center mb-8 text-gray-700">
        Discover various relaxation techniques to calm your mind and body. You can follow guided videos or practice using timers.
      </p>
      
      <audio ref={audioRef} src={the} />

      {techniques.map((technique, index) => (
        <div key={index} className="relative flex flex-col items-center bg-white rounded-lg mb-8 p-6 shadow-lg overflow-hidden w-full max-w-xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{technique.name}</h3>
            <p className="text-gray-600 text-center">{technique.description}</p>
          </div>

          {/* Conditional rendering for GIF or YouTube video */}
          {technique.youtube && (
            <iframe
              className="mb-4 w-full max-w-md h-64 rounded-lg"
              src={technique.youtube}
              title={technique.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Instructions for each technique */}
          {technique.instructions && (
            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-700">Instructions:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {technique.instructions.map((step, stepIndex) => (
                  <li key={stepIndex} className="mt-2">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RelaxationTechniques;




