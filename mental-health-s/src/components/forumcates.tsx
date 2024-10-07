import React from 'react';
import ForumCategory from './forumcate';

const categories = [
  'Anxiety',
  'Depression',
  'Stress Management',
  'Support and Help',
  'Mindfulness and Meditation',
  'Self-Care',
  'Grief and Loss',
  'Coping Strategies',
  'Relationships',
  'General Mental Health',
  'Therapy and Counseling',
  'Nutrition and Mental Health',
  'Mental Health in the Workplace',
];

const ForumCategories: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Community Forums</h1>
      <h2 className="text-xl mb-2">Categories</h2>
      {categories.map((category) => (
        <ForumCategory key={category} category={category} />
      ))}
    </div>
  );
};

export default ForumCategories;





