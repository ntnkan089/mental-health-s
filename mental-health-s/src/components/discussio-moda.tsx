import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface CreateDiscussionModalProps {
  onCreateDiscussion: (title: string) => void;
}

const CreateDiscussionModal: React.FC<CreateDiscussionModalProps> = ({ onCreateDiscussion }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onCreateDiscussion(title);
      setTitle('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition duration-300">
          Create New Discussion
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
          className="border rounded-md p-2 w-full"
        />
        <DialogFooter>
          <button className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2" onClick={() => setTitle('')}>
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




