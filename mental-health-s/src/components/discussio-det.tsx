import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessageCircle, AlertTriangle, Send, User } from 'lucide-react'; // Importing icons

// Define types for discussion post and replies
interface DiscussionPost {
  
  author: string;
  date: string;
  totalPosts: number;
  joined: string;
  content: string;
  title: string; 

}


interface Reply {
  username: string;
  date: string;
  content: string;
}

const DiscussionDetail: React.FC = () => {
  const { discussionId } = useParams<{ discussionId: string | undefined }>();
  const discussionIdNumber = discussionId ? parseInt(discussionId, 10) : NaN; 

  const [discussionPost, setDiscussionPost] = useState<DiscussionPost | null>(null);
  const [discussionReplies, setDiscussionReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchDiscussionPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/discussions/${discussionIdNumber}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDiscussionPost(data);
        } else {
          console.error('Failed to fetch discussion post');
        }
      } catch (error) {
        console.error('Error fetching discussion post:', error);
      }
    };

    const fetchReplies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/replies/discussion/${discussionIdNumber}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDiscussionReplies(data);
        } else {
          console.error('Failed to fetch replies');
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    if (!isNaN(discussionIdNumber)) {
      fetchDiscussionPost();
      fetchReplies();
    }
  }, []);

  // Handle reply submission
  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!replyContent.trim()) return; 

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ discussionId: discussionIdNumber, content: replyContent, userId: JSON.parse(localStorage.getItem('user_z')!).userId, username: JSON.parse(localStorage.getItem('user_z')!).username, date: new Date().toISOString() }),
      });

      if (response.ok) {
        const newReply = await response.json(); 
        setDiscussionReplies((prevReplies) => [...prevReplies, newReply]);
        setReplyContent(''); 
      } else {
        console.error('Failed to submit reply');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  if (!discussionPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      {/* Discussion Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
          <MessageCircle className="text-blue-500" /> {discussionPost.title}
        </h1>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="text-gray-400" />
            <span className="font-semibold">{discussionPost.author}</span> ·{" "}
            {new Date(discussionPost.date).toLocaleDateString()}
          </div>
          <div className="text-sm text-red-600 cursor-pointer hover:text-red-500 flex items-center gap-1">
            <AlertTriangle className="text-red-500" /> Report Post
          </div>
        </div>
        <p className="mt-4 text-gray-700">{discussionPost.content}</p>
      </div>

      {/* Replies Section */}
      <h2 className="text-xl font-bold mb-4">Replies</h2>
      <div className="space-y-4">
        {discussionReplies.length === 0 ? (
          <p className="text-gray-500 italic">No replies yet. Be the first to join the conversation!</p>
        ) : (
          discussionReplies.map((reply, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm flex items-center gap-2">
                  <User className="text-gray-400" />
                  <span className="font-semibold">{reply.username}</span> ·{" "}
                  {new Date(reply.date).toLocaleDateString()}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{reply.content}</p>
            </div>
          ))
        )}
      </div>


      {/* Reply Input Form */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add a Reply</h2>
        <form onSubmit={handleReplySubmit} className="space-y-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-300 transition duration-200"
            placeholder="Share your thoughts..."
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex justify-center items-center gap-2"
          >
            <Send className="text-white" /> Post Reply
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscussionDetail;






