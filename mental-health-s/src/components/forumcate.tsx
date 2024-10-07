// src/components/ForumCategory.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ForumCategoryProps {
  category: string;
}

const ForumCategory: React.FC<ForumCategoryProps> = ({ category }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md mb-4">
      <Link to={`/forums/${category}`} className="text-blue-600 font-semibold">
        {category}
      </Link>
    </div>
  );
};

export default ForumCategory;


