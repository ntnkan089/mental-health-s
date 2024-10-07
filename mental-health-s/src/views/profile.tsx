// src/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizLinks from '../components/quizlink'; // Import the QuizLinks component
import MoodTrackerModal from '../components/mood_oda'; // Optional: Import MoodTrackerModal if needed
import MoodHistoryChart from '@/components/mood';

interface MoodEntry {
  date: Date;
  mood: number;
}

interface UserProfile {
  username: string;
  email: string;
  // Add more user profile fields if needed
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Sample mood history data
  const moodHistory: MoodEntry[] = [
    { date: new Date('2024-09-27'), mood: 3 }, // Scale from 1 (sad) to 5 (happy)
    { date: new Date('2024-09-28'), mood: 4 },
    { date: new Date('2024-09-29'), mood: 5 },
    { date: new Date('2024-09-30'), mood: 2 },
    { date: new Date('2024-10-01'), mood: 3 },
    { date: new Date('2024-10-02'), mood: 4 },
    { date: new Date('2024-10-03'), mood: 5 },
  ];

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in the headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data: UserProfile = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Manage loading and error states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700">Username:</label>
        <p className="text-gray-900">{user?.username}</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <p className="text-gray-900">{user?.email}</p>
      </div>
      
      {/* Add more user details here if needed */}
      
      <button
        className="mt-6 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
        onClick={() => navigate('/')}
      >
        Go Home
      </button>

      {/* Add QuizLinks component */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Mental Health Quizzes</h2>
        <QuizLinks /> {/* Render Quiz Links here */}
      </div>

      {/* Render the MoodHistoryChart with sample data */}
      <MoodHistoryChart moodHistory={moodHistory} />

      {/* Optional: Render the MoodTrackerModal */}
      <MoodTrackerModal
        //isOpen={isMoodModalOpen}
        //onClose={() => setMoodModalOpen(false)} // Close modal when done
      />
    </div>
  );
};

export default ProfilePage;






