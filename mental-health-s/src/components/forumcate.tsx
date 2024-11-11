// ForumCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ForumCategoryProps {
  category: string;
  
  icon: React.ReactNode;
}

const ForumCategory: React.FC<ForumCategoryProps> = ({ category, icon }) => {
  return (
    <Link to={`/forums/${category}`}>
      <div className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 group overflow-hidden">
        <div className="absolute inset-0 bg-cover opacity-10  transition-opacity duration-300" style={{ backgroundImage: `url('/images/${category.toLowerCase()}.jpg')` }}></div>
        <div className="relative flex items-center gap-3 text-indigo-700">
          <span className="text-indigo-500">{icon}</span>
          <h2 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">{category}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ForumCategory;



