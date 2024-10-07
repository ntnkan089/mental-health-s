// src/pages/CategoryDiscussion.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DiscussionItem from '../components/discussioIte';
import CreateDiscussionModal from '../components/discussio-moda';
import Pagination from '../components/pagina';

const discussions = [
  { title: 'Coping with Anxiety', author: 'User1', replies: 3 },
  { title: 'Mindfulness Techniques', author: 'User2', replies: 5 },
  { title: 'Overcoming Stress', author: 'User3', replies: 1 },
  { title: 'Managing Depression', author: 'User4', replies: 4 },
  { title: 'Healthy Coping Mechanisms', author: 'User5', replies: 2 },
  // More discussions can be added here
];

const CategoryDiscussion: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [discussionList, setDiscussionList] = useState(discussions);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of discussions per page

  // Filter discussions based on search term
  const filteredDiscussions = discussionList.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDiscussions = filteredDiscussions.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateDiscussion = (title: string) => {
    const newDiscussion = { title, author: 'You', replies: 0 }; // Assuming the current user is the author
    setDiscussionList([...discussionList, newDiscussion]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{category} Discussions</h1>
      <CreateDiscussionModal onCreateDiscussion={handleCreateDiscussion} />

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search discussions..."
          className="border rounded-md p-2 w-full"
        />
      </div>

      <h2 className="text-xl mb-2">Topics</h2>
      {currentDiscussions.map((discussion, index) => (
        <DiscussionItem key={index} {...discussion} />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryDiscussion;







