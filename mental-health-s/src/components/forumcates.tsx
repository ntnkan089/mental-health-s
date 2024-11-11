// ForumCategories.tsx
import React from 'react';
import ForumCategory from './forumcate';
import { User, Heart, MessageSquare, Star, Sun, Smile, Activity , Search, Users, Globe } from 'lucide-react';

const categories = [
  { name: 'Anxiety', icon: <Activity /> },
  { name: 'Depression', icon: <Heart /> },
  { name: 'Stress Management', icon: <Sun /> },
  { name: 'Support and Help', icon: <Users /> },
  { name: 'Mindfulness and Meditation', icon: <Smile /> },
  { name: 'Self-Care', icon: <Heart /> },
  { name: 'Grief and Loss', icon: <MessageSquare /> },
  { name: 'Coping Strategies', icon: <Search /> },
  { name: 'Relationships', icon: <User /> },
  { name: 'General Mental Health', icon: <Globe /> },
  { name: 'Therapy and Counseling', icon: <Star /> },
  { name: 'Nutrition and Mental Health', icon: <Heart /> },
  { name: 'Mental Health in the Workplace', icon: <User /> },
];

const ForumCategories: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-xl mt-8">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Community Forums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => (
          <ForumCategory key={category.name} category={category.name} icon={category.icon} />
        ))}
      </div>
    </div>
  );
};

export default ForumCategories;


