import { useState, useEffect } from 'react';
import { Play, Pause  } from 'lucide-react'; // Importing icons from Lucide React
interface TimerProps {

    duration: number; 
    handleA?: () => void; // Optional function

    handleW?: () => void; // Optional function
  }
  const Timer: React.FC<TimerProps> = ({ duration, handleA, handleW }) => {  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      
    }, 1000);
    } else if (timeLeft === 0) {
      setTimeLeft(duration)
      setIsRunning(false); // Stop the timer when it reaches zero
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    if(handleA){
        handleA();
    }
    
  };

  const handleStop = () => {
    setIsRunning(false);
    if(handleW){
        handleW();

    }
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Timer Circle */}
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-purple-300"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="text-xl font-semibold fill-gray-800"
          >
            {timeLeft}s
          </text>
        </svg>
      </div>

      {/* Start/Stop Button */}
      <div className="flex justify-center space-x-4">
        {!isRunning && timeLeft > 0 && (
          <button
          onClick={handleStart}
          className="flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-md hover:bg-slate-300 border-gray-400 border-solid border-2 transition"
        >
          <Play className="w-6 h-6" />
        </button>
        
        )}
        {isRunning && (
          <button
            onClick={handleStop}
            className="flex items-center justify-center px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-md hover:bg-slate-300 border-gray-400 border-solid border-2 transition"
          >
            <Pause  className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};


export default Timer;


