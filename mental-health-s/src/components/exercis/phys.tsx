import Timer from "../timer";

import jumpingJacksGif from "../../assets/exercis/72ce2672463ef0a7b7678226886466e1.gif"; 

import armCirclesGif from "../../assets/exercis/armcirc.gif"; 
import highKneesGif from "../../assets/exercis/High-knees-exericse.gif"; 

import burpeesGif from "../../assets/exercis/burpe.gif"; 
import taiChiBasicStanceGif from "../../assets/exercis/taichi.bmp"; 

import ountainPoseGif from "../../assets/exercis/yoga.bmp"; 
import pushUpsGif from "../../assets/exercis/push.gif"; 


import squatsGif from "../../assets/exercis/squat.gif"; 
import standingQuadricepsStretchGif from "../../assets/exercis/quad-stret.bmp"; 

import seatedHamstringStretchGif from "../../assets/exercis/seate.bmp"; 
import childPoseGif from "../../assets/exercis/child.bmp"; 
import catCowStretchGif from "../../assets/exercis/cc-stretc.bmp"; 


import { ChevronsUpDown } from 'lucide-react';




import { useState } from "react";

const PhysicalExercises: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>("Warm-up Exercises");


  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);

  };

  const warmUpExercises = [
    {
        name: 'Jumping Jacks',
        description: 'A quick cardio warm-up to get your heart rate going.',
        benefits: 'Improves cardiovascular health, burns calories, and increases endurance.',

        duration: 30,
        gif: jumpingJacksGif,
        instructions: [
            'Stand upright with your legs together, arms at your sides.',
            'Bend your knees slightly, and jump into the air.',
            'As you jump, spread your legs to be about shoulder-width apart. Stretch your arms out and over your head.',
            'Jump back to starting position.',
        ],
    },
    {
        name: 'Arm Circles',
        description: 'Warm up your shoulders and arms with this simple exercise.',
        benefits: 'Improves shoulder mobility and activates upper body muscles.',
        duration: 20,
        gif: armCirclesGif,
        instructions: [
            'Stand with feet shoulder-width apart.',
            'Stretch your arms out to the sides at shoulder height.',
            'Rotate your arms in small circles forward for 10 seconds, then reverse for 10 seconds.',
        ],
    },
];

const cardioExercises = [
    {
        name: 'High Knees',
        description: 'A high-intensity cardio exercise that gets your heart rate up.',
        benefits: 'Boosts cardiovascular fitness, strengthens legs and core.',
        duration: 30,
        gif: highKneesGif,
        instructions: [
            'Stand with your feet hip-width apart.',
            'Raise your right knee toward your chest, then quickly switch to the left knee.',
            'Keep switching knees as fast as possible, while pumping your arms.',
        ],
    },
    {
        name: 'Burpees',
        description: 'A full-body cardio exercise that improves strength and endurance.',
        benefits: 'Builds strength and burns calories.',
        duration: 30,
        gif: burpeesGif,
        instructions: [
            'Start in a standing position.',
            'Drop into a squat and place your hands on the floor in front of you.',
            'Jump your feet back to land in a plank position.',
            'Do a push-up, then jump your feet back toward your hands and jump up into the air.',
        ],
    },
];

const taiChiExercises = [
    {
        name: 'Tai Chi Exercises',
        description: 'Start by mastering the basic Tai Chi stances.',
        benefits: 'Improves balance, coordination, and relaxation.',
        duration: 40,
        gif: taiChiBasicStanceGif,
        instructions: [
            'Simply start by following the playlist.',
        ],
    },
];

const yogaExercises = [
    {
        name: 'Yoga Exercises',
        description: 'Foundational yoga poses that promotes stability and alignment.',
        benefits: 'Improves posture, strengthens thighs, knees, and ankles.',
        duration: 40,
        gif: ountainPoseGif,
        link: 'https://www.youtube.com/watch?v=AB3Y-4a3ZrU&list=PLui6Eyny-UzzWwB4h9y7jAzLbeuCUczAl',
        instructions: [
            'Simply start by following the playlist.',
        ],
    },
];

const strengthExercises = [
    {
        name: 'Push-ups',
        description: 'A bodyweight exercise that strengthens the chest, shoulders, and triceps.',
        benefits: 'Improves upper body strength and endurance.',
        duration: 30,
        gif: pushUpsGif,
        instructions: [
            'Start in a plank position with your hands shoulder-width apart.',
            'Lower your body until your chest nearly touches the floor.',
            'Push back up to the starting position.',
        ],
    },
    {
        name: 'Squats',
        description: 'A lower body exercise that targets the thighs, hips, and buttocks.',
        benefits: 'Builds strength and stability in the lower body.',
        duration: 30,
        gif: squatsGif,
        instructions: [
            'Stand with your feet shoulder-width apart.',
            'Lower your body as if you are sitting back into a chair.',
            'Keep your chest up and knees behind your toes, then rise back to standing.',
        ],
    },
];

const flexibilityExercises = [
    {
        name: 'Standing Quadriceps Stretch',
        description: 'A stretch to improve flexibility in the front thigh.',
        benefits: 'Increases flexibility and reduces muscle tightness.',
        duration: 30,
        gif: standingQuadricepsStretchGif,
        instructions: [
            'Stand on one leg, holding onto a wall for balance if needed.',
            'Bend the opposite knee and grab your ankle, pulling your heel toward your buttock.',
            'Keep your knees together and hold the stretch for 15 seconds before switching legs.',
        ],
    },
    {
        name: 'Seated Hamstring Stretch',
        description: 'A stretch to improve flexibility in the hamstrings.',
        benefits: 'Increases flexibility and helps prevent injury.',
        duration: 30,
        gif: seatedHamstringStretchGif,
        instructions: [
            'Sit on the floor with your legs extended in front of you.',
            'Bend at your hips and reach for your toes, keeping your back straight.',
            'Hold the stretch for 15 seconds.',
        ],
    },
];

const cooldownExercises = [
    {
        name: 'Child’s Pose',
        description: 'A resting pose to stretch the back and hips.',
        benefits: 'Promotes relaxation and flexibility in the spine.',
        duration: 30,
        gif: childPoseGif,
        instructions: [
            'Kneel on the floor with your big toes touching and knees apart.',
            'Sit back on your heels and extend your arms forward on the ground.',
            'Hold the pose for several breaths, focusing on relaxing your back.',
        ],
    },
    {
        name: 'Cat-Cow Stretch',
        description: 'A gentle stretch to warm up the spine and relieve tension.',
        benefits: 'Increases spinal flexibility and stretches the back and neck.',
        duration: 30,
        gif: catCowStretchGif,
        instructions: [
            'Start on your hands and knees in a tabletop position.',
            'Inhale and arch your back, dropping your belly (Cow Pose).',
            'Exhale and round your back, tucking your chin to your chest (Cat Pose).',
            'Repeat for several cycles.',
        ],
    },
];
  
  const sections = [
    { name: 'Warm-up Exercises', exercises: warmUpExercises },
    { name: 'Cardio Exercises', exercises: cardioExercises },
    { name: 'Strength Training Exercises', exercises: strengthExercises },
    { name: 'Flexibility Exercises', exercises: flexibilityExercises },
    
    
    { name: 'Cooldown Exercises', exercises: cooldownExercises },

    


    { name: 'Tai Chi Exercises', exercises: taiChiExercises },
    { name: 'Yoga Exercises', exercises: yogaExercises },
  ];
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Physical Exercises</h2>
      <p className="text-center mb-8 text-gray-700">
      These exercises will help you build strength, burn calories, and improve overall health. Research shows that regular physical activity can significantly enhance cardiovascular health, strengthen muscles, and improve mental well-being. Follow the instructions carefully to maintain proper form and prevent injury.
      </p>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <button
            className="w-full bg-slate-100 text-slate-950 py-3 px-4 rounded-lg text-left flex justify-between"
            onClick={() => toggleSection(section.name)}
            
          >
            <p>{section.name}</p> <ChevronsUpDown className="hover:bg-slate-300 rounded-md"/>
          </button>
          
          {openSection === section.name && (
            <div className="mt-4">
              {section.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center bg-white rounded-lg mb-8 p-6 shadow-lg overflow-hidden w-full max-w-xl mx-auto"
                >
                  <div className="flex flex-col items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
                    <p className="text-gray-600 text-center">{exercise.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Benefits: {exercise.benefits}</p>
                  </div>

                  {/* GIF or image to visually represent the exercise */}
                  <img
                src={exercise.gif}
                alt={`${exercise.name} gif`}
                className="mb-4 w-64 max-w-md object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />

              {/* Link to YouTube playlist based on the section */}
              {(section.name === 'Yoga Exercises' || section.name === 'Tai Chi Exercises') && (
                
                <a
                  href={section.name === 'Yoga Exercises'?"https://www.youtube.com/watch?v=AB3Y-4a3ZrU&list=PLui6Eyny-UzzWwB4h9y7jAzLbeuCUczAl":"https://www.youtube.com/watch?v=wcFqdJmJuJA&list=PLxwECgT4EqeY-O7dMoyREMzeGTXxDIv4Q"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mb-4"
                >
                  Go to Playlist
                </a>
              )}

                  {/* Instructions for the exercise */}
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-700">How to Perform:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {exercise.instructions.map((step, stepIndex) => (
                        <li key={stepIndex} className="mt-2">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timer UI */}
                  {section.name !== 'Yoga Exercises' && section.name !== 'Tai Chi Exercises' && <Timer duration={exercise.duration} />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      

    </div>
  );
};

export default PhysicalExercises;










