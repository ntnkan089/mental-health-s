import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar'; 
import MoodHistoryChart from '@/components/mood'; 
import MoodTrackerModal from '@/components/mood_oda';

// Define the WellnessEntry interface
interface WellnessEntry {
  id: number;
  userId: string;
  entryType: string;
  value: string;
  note: string;
  entryDate: string; // Keep as string to match the API response
}

interface FormattedEntry {
  id: number;
  userId: string;
  entryType: string;
  value: string;
  note: string;
  entryDate: Date;
}

const ChartsPage: React.FC = () => {
  const hardcodedMoodHistory: FormattedEntry[] = [
    {
      id: 1,
      userId: "user123",
      entryType: "Mood",
      value: "0",
      note: "Feeling okay.",
      entryDate: new Date('2024-10-01'),
    },
    {
      id: 2,
      userId: "user123",
      entryType: "Anxiety",
      value: "0",
      note: "Low anxiety.",
      entryDate: new Date('2024-10-02'),
    },
    {
      id: 3,
      userId: "user123",
      entryType: "Exercise",
      value: "0",
      note: "Light exercise.",
      entryDate: new Date('2024-10-03'),
    },
    {
      id: 4,
      userId: "user123",
      entryType: "Sleep",
      value: "0",
      note: "Good sleep.",
      entryDate: new Date('2024-10-04'),
    },
  ];

  const [moodHistory, setMoodHistory] = useState<FormattedEntry[]>(hardcodedMoodHistory);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const response = await fetch(`https://health-s-deplo.onrender.com/api/wellness-tracking/${JSON.parse(localStorage.getItem('user_z')!).userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: WellnessEntry[] = await response.json();

        // Convert entryDate to Date object
        const moodHistoryWithDate = data.map(entry => ({
          ...entry,
          entryDate: new Date(entry.entryDate),
        }));

        console.log(moodHistoryWithDate);
        setMoodHistory(moodHistoryWithDate);
      } catch (error) {
        console.error('Failed to fetch mood history:', error);
      }
    };

    fetchMoodHistory();
  }, []);

  return (
    <div className="flex justify-center items-start p-6  min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 max-w-xl bg-white rounded-lg shadow-lg p-6 ml-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Wellness Charts</h1>

        <MoodHistoryChart moodHistory={moodHistory} />

        {/* Add additional charts here as needed */}
        
        <div className="mt-6">
          <MoodTrackerModal userId={JSON.parse(localStorage.getItem('user_z')!).userId} />
        </div>
      </div>
    </div>
  );
};


export default ChartsPage;












