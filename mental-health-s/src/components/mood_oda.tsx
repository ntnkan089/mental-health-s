import React, { useState } from 'react';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"

//import MoodHistoryChart from './mood';
// Define the type for the Mood History entry

type MoodEntry = {
  mood: string;
  note: string;
  date: Date;
};


const MoodTrackerModal: React.FC = () => {
  const [mood, setMood] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const handleSaveMood = () => {
    const newEntry: MoodEntry = { mood, note, date: new Date() };
    setMoodHistory([...moodHistory, newEntry]);
    setMood('');
    setNote('');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300">
          Log Your Mood
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Your Mood</DialogTitle>
          <DialogDescription>
            Select your mood and add an optional note for today.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <label className="block text-gray-700">Select your mood:</label>
          <select
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">-- Select Mood --</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Excited">Excited</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Add a note (optional):</label>
          <textarea
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter className="flex justify-between">
          <button className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2" onClick={() => setMood('')}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300" onClick={handleSaveMood}>
            Save Mood
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodTrackerModal;


