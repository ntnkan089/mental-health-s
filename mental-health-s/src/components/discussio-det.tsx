import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Example data (this would typically come from your backend)
const discussionPosts = [
  {
    username: 'Angelwngs26',
    date: 'July 2, 2015 - 10:03 pm',
    totalPosts: 2,
    joined: '07-02-2015',
    content: "I just looked in the mirror because something was on my lip piercing and it caught my eye. I looked at it and there's puss coming out of it. I'm afraid the infection is not going to go away. I used an alcohol pad immediately after I noticed it. Does anyone know if you can get lip piercing infections to go away? It wasn't infected for the longest time and now all of a sudden it's infected. I'm having severe anxiety about this because I don't want to have to lose my piercing.",
  },
  {
    username: 'Glaciel',
    date: 'July 4, 2015 - 8:03 am',
    totalPosts: 12,
    joined: '10-03-2024',
    content: "i have only bad to add. I had a nipple piercing that got sort-of-infected. It started to reject. I had to get it redone months later. But yours might be better ending?",
  },
  {
    username: 'artista',
    date: 'July 5, 2015 - 5:46 pm',
    totalPosts: 868,
    joined: '06-12-2011',
    content: "I would go to your doc asap.",
  },
  // Add more example posts as needed
];

const DiscussionDetail: React.FC = () => {
  const { discussionTitle } = useParams<{ discussionTitle: string }>(); // Get discussion title from URL

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 2; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(discussionPosts.length / itemsPerPage);

  // Calculate posts to display on the current page
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = discussionPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{discussionTitle}</h1>

      {currentPosts.map((post, index) => (
        <div key={index} className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{post.username}</p>
              <p className="text-gray-600 text-sm">{post.date}</p>
            </div>
            <div className="text-gray-600">
              <p>Spam? Offensive?</p>
            </div>
          </div>

          <div className="text-gray-600">
            <p className="font-semibold">Total Posts: {post.totalPosts}</p>
            <p className="text-sm">Joined: {post.joined}</p>
          </div>

          <p className="mt-2">{post.content}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Discussion Thread</h2>
        <p>This being human is a guest house. A joy, a depression, a meanness, some momentary awareness comes as an unexpected visitor. Welcome and entertain them all. Treat each guest honorably.</p>
      </div>
    </div>
  );
};

export default DiscussionDetail;
