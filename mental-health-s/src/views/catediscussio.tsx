// src/pages/CategoryDiscussion.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import DiscussionItem from '../components/discussioIte';
import CreateDiscussionModal from '../components/discussio-moda';
import Pagination from '../components/pagina';

export interface Discussion {
  discussionId: number;
  title: string;
  author: string;
  content: string;
  category: string;
  date: Date;
}

const CategoryDiscussion: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [discussionList, setDiscussionList] = useState<Discussion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchDiscussions = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://health-s-deplo.onrender.com/api/discussions/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDiscussionList(data);
      } else {
        console.error('Failed to fetch discussions:', response.status);
      }
    };

    fetchDiscussions();
  }, [category]);

  const filteredDiscussions = discussionList.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDiscussions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDiscussions = filteredDiscussions.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateDiscussion = async (title: string, content: string) => {
    const token = localStorage.getItem('token');
    const newDiscussion = {
      title,
      author: JSON.parse(localStorage.getItem('user_z')!).username,
      category,
      content,
      userId: JSON.parse(localStorage.getItem('user_z')!).userId,
      date: new Date().toISOString(),
    };

    const response = await fetch('https://health-s-deplo.onrender.com/api/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newDiscussion),
    });

    if (response.ok) {
      const createdDiscussion = await response.json();
      setDiscussionList([...discussionList, createdDiscussion]);
    } else {
      console.error('Failed to create discussion:', response.status);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-6 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 flex items-center justify-center gap-2">
        <MessageSquare className="w-6 h-6 text-blue-500" />
        {category} Discussions
      </h1>
      <CreateDiscussionModal onCreateDiscussion={handleCreateDiscussion} />

      <div className="mt-5 mb-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search discussions..."
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <Search className="absolute top-2 right-3 w-5 h-5 text-gray-500" />
      </div>

      <h2 className="text-2xl mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-500" />
        Featured Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDiscussions.map((discussion) => (
          <DiscussionItem key={discussion.discussionId} {...discussion} />
        ))}
      </div>

      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-blue-500 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="text-gray-500 hover:text-blue-500 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};


export default CategoryDiscussion;







