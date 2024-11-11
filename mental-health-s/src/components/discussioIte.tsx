import React from 'react';
import { Link } from 'react-router-dom';

interface DiscussionItemProps {
  title: string;
  author: string;
  date: Date; // Add date prop
  content: string; // New content prop
  discussionId: number; //
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ title, author, date, content, discussionId }) => {
  // Limit the displayed content to the first 100 characters
  const previewContent = content.length > 100 ? `${content.slice(0, 100)}...` : content;

  return (
    <div className="p-4 border-b hover:bg-gray-100 transition mt-duration-300 ease-in-out ">
      <Link to={`/forums/discussion/${discussionId}`} className="text-blue-600 font-semibold text-lg hover:underline">
        {title}
      </Link>
      <p className="text-gray-600 text-sm">by {author}</p>
      <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p> {/* Format date */}
      <p className="text-gray-500 text-sm mt-2">{previewContent}</p> {/* Preview content */}
    </div>
  );
};

export default DiscussionItem;


