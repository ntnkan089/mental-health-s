import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MoveRight } from 'lucide-react';

interface CreateDiscussionModalProps {
  onCreateDiscussion: (title: string, content: string) => void;
}

const CreateDiscussionModal: React.FC<CreateDiscussionModalProps> = ({ onCreateDiscussion }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // New state for content

  const handleSubmit = () => {
    if (title.trim() && content.trim()) { // Check both title and content
      onCreateDiscussion(title, content);
      setTitle('');
      setContent(''); // Reset content field
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="mt-4 bg-amber-500 text-white rounded-lg px-4 py-2 hover:bg-amber-600 transition duration-300 flex gap-3">
          Start A Discussion <MoveRight />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Discussion Title"
          className="border rounded-md p-2 w-full mb-2" // Added margin-bottom for spacing
        />
        <textarea // Added textarea for content
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Discussion Content"
          className="border rounded-md p-2 w-full mb-4" // Added margin-bottom for spacing
          rows={4} // Adjusted rows for better display
        />
        <DialogFooter>
          <button
            className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
            onClick={() => {
              setTitle('');
              setContent(''); // Reset content field
            }}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
            onClick={handleSubmit}
          >
            Create Discussion
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscussionModal;












