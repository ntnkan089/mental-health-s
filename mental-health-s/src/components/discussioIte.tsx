import React from 'react';
import { Link } from 'react-router-dom';

interface DiscussionItemProps {
  title: string;
  author: string;
  replies: number;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ title, author, replies }) => {
  return (
    <div className="p-4 border-b">
      <Link to={`/forums/discussion/${title}`} className="text-blue-600 font-semibold">
        {title}
      </Link>
      <p className="text-gray-600">by {author}</p>
      <p className="text-gray-500">Replies: {replies}</p>
    </div>
  );
};


export default DiscussionItem;