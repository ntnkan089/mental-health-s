import React, { useEffect, useState } from 'react';
import { ChartLine, Dumbbell, Book, Calendar, List, AppWindow } from 'lucide-react';

import Sidebar from '@/components/sidebar';
import { useUser } from '@/hook/user';

interface UserProfile {
  username: string;
  email: string;
}

interface User {
  userId: string;  
  username: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useUser();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data: User = await response.json();
        localStorage.setItem('user_z', JSON.stringify(data));
        login(data);
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-start bg-gray-100 min-h-screen p-4">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 max-w-md bg-white rounded-lg shadow-lg p-6 ml-4">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        
        {/* User Information */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold">Username:</label>
          <p className="text-gray-900 text-lg">{user?.username}</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold">Email:</label>
          <p className="text-gray-900 text-lg">{user?.email}</p>
        </div>

        {/* Charts Section */}
        <div className="mt-8 p-4 border rounded-lg bg-blue-50">
          <div className="flex items-center mb-2">
            <ChartLine className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold">Charts</h2>
          </div>
          <p className="text-gray-700">
            Visualize your health metrics over time. Adjust date ranges to reveal patterns in mood, sleep, and other wellness indicators.
          </p>
        </div>

        {/* Exercises Section */}
        <div className="mt-8 p-4 border rounded-lg bg-pink-50">
          <div className="flex items-center mb-2">
            <Dumbbell className="w-6 h-6 text-pink-500 mr-2" />
            <h2 className="text-xl font-semibold">Exercises</h2>
          </div>
          <p className="text-gray-700">
            Track your physical activity and see how it impacts your overall health and mood.
          </p>
        </div>

        {/* Resources Section */}
        <div className="mt-8 p-4 border rounded-lg bg-yellow-50">
          <div className="flex items-center mb-2">
            <Book className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Resources</h2>
          </div>
          <p className="text-gray-700">
            Access curated mental health resources and tools to support your well-being.
          </p>
        </div>

        {/* Your Events Section */}
        <div className="mt-8 p-4 border rounded-lg bg-purple-50">
          <div className="flex items-center mb-2">
            <Calendar className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold">Your Events</h2>
          </div>
          <p className="text-gray-700">
            View and manage your scheduled events, including virtual support group meetings and other wellness sessions.
          </p>
        </div>

        {/* Quizzes Section */}
        <div className="mt-8 p-4 border rounded-lg bg-indigo-50">
          <div className="flex items-center mb-2">
            <List className="w-6 h-6 text-indigo-500 mr-2" />
            <h2 className="text-xl font-semibold">Quizzes</h2>
          </div>
          <p className="text-gray-700">
            Take self-assessment quizzes to better understand your mental health.
          </p>
        </div>

        {/* Applications Section */}
        <div className="mt-8 p-4 border rounded-lg bg-amber-50">
          <div className="flex items-center mb-2">
            <AppWindow className="w-6 h-6 text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold">Applications</h2>
          </div>
          <p className="text-gray-700">
              Apply to become a facilitator! As a facilitator, you can host events, create support groups, and assist others on their wellness journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;






