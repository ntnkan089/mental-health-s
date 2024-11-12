import React, { useState } from 'react';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type WellnessEntry = {
  userId: string; // Assuming you have the user ID available

  entryType: string; // Type of tracking (mood, anxiety, sleep, exercise)
  value: string | number; // Value associated with the tracking
  note?: string; // Optional note
  entryDate: Date; // Date as a Date object
};


const MoodTrackerModal: React.FC<{ userId: string }> = ({ userId }) => {
  // State for mood tracking
  const [mood, setMood] = useState<string>('');
  const [moodNote, setMoodNote] = useState<string>('');

  // State for anxiety tracking
  const [anxietyLevel, setAnxietyLevel] = useState<string>('');
  const [anxietyNote, setAnxietyNote] = useState<string>('');

  // State for sleep tracking
  const [sleepHours, setSleepHours] = useState<number>(0);

  // State for exercise tracking
  const [exerciseQuality, setExerciseQuality] = useState<string>('');
  const [exerciseNote, setExerciseNote] = useState<string>('');

  // Handle save for all categories
  const handleSaveAll = async () => {
    const entries: WellnessEntry[] = [];
    const currentDate = new Date(); // Get the current date
  
    // Collect entries for mood
    if (mood) {
      entries.push({
        userId,
        entryType: 'Mood',
        value: mood,
        note: moodNote,
        entryDate: currentDate, // Add the current date
      });
    }
  
    // Collect entries for anxiety
    if (anxietyLevel) {
      entries.push({
        userId,
        entryType: 'Anxiety',
        value: anxietyLevel,
        note: anxietyNote,
        entryDate: currentDate, // Add the current date
      });
    }
  
    // Collect entry for sleep
    if (sleepHours > 0) {
      entries.push({
        userId,
        entryType: 'Sleep',
        value: sleepHours,
        entryDate: currentDate, // Add the current date
      });
    }
  
    // Collect entry for exercise
    if (exerciseQuality) {
      entries.push({
        userId,
        entryType: 'Exercise',
        value: exerciseQuality,
        note: exerciseNote,
        entryDate: currentDate, // Add the current date
      });
    }
  
    console.log(entries);
    
    // Post each entry to the wellness_tracking API
    for (const entry of entries) {
      await postToWellnessTracking(entry);
    }
  
    // Reset all states after saving
    resetStates();
    location.href = '/profile/charts' 
  };
  

  // Function to post data to the wellness_tracking API
  const postToWellnessTracking = async (entry: WellnessEntry) => {
    try {
      const response = await fetch('https://health-s-deplo.onrender.com/api/wellness-tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }
      /* location.href = '/profile/charts' */
      const data = await response.json();
      console.log('Entry saved:', data);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  // Function to reset all state variables
  const resetStates = () => {
    setMood('');
    setMoodNote('');
    setAnxietyLevel('');
    setAnxietyNote('');
    setSleepHours(0);
    setExerciseQuality('');
    setExerciseNote('');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300">
          Log Your Wellness
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Log Your Wellness</DialogTitle>
          <DialogDescription>
            Fill out the following categories to track your daily mood, anxiety, sleep, and exercise.
          </DialogDescription>
        </DialogHeader>

        {/* Mood Tracking */}
        <div className="mb-4">
          <label className="block text-gray-700">Select your mood:</label>
          <select
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">-- Select Mood --</option>
            <option value="Happy">Happy</option>
            <option value="Calm">Calm</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Excited">Excited</option>
          </select>
        </div>

        {/* Mood Note */}
        <div className="mb-4">
          <label className="block text-gray-700">Add a note (optional):</label>
          <textarea
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
          />
        </div>

        {/* Anxiety Tracking */}
        <div className="mb-4">
          <label className="block text-gray-700">Anxiety level:</label>
          <select
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={anxietyLevel}
            onChange={(e) => setAnxietyLevel(e.target.value)}
          >
            <option value="">-- Select Anxiety Level --</option>
            <option value="None">None</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        {/* Anxiety Note */}
        <div className="mb-4">
          <label className="block text-gray-700">Anxiety note (optional):</label>
          <textarea
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={anxietyNote}
            onChange={(e) => setAnxietyNote(e.target.value)}
          />
        </div>

        {/* Sleep Tracking */}
        <div className="mb-4">
          <label className="block text-gray-700">Sleep hours:</label>
          <input
            type="number"
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
          />
        </div>

        {/* Exercise Tracking */}
        <div className="mb-4">
          <label className="block text-gray-700">Exercise quality:</label>
          <select
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={exerciseQuality}
            onChange={(e) => setExerciseQuality(e.target.value)}
          >
            <option value="">-- Select Exercise Quality --</option>
            <option value="None">None</option>
            <option value="Light">Light</option>
            <option value="Mild">Mild</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>

        {/* Exercise Note */}
        <div className="mb-4">
          <label className="block text-gray-700">Exercise note (optional):</label>
          <textarea
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={exerciseNote}
            onChange={(e) => setExerciseNote(e.target.value)}
          />
        </div>

        <DialogFooter className="flex justify-between">
          <button className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2" onClick={() => { /* Close the modal */ }}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
            onClick={handleSaveAll}
          >
            Save All
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodTrackerModal;






