import React, { useState } from 'react';

import { MessageCircle } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Button */}
      <button
        onClick={toggleChat}
        className="p-3 bg-amber-300 text-white rounded-full shadow-lg hover:bg-amber-500 transition-all"
      >
        {/* Chat icon */}
        <MessageCircle />
      </button>

      {/* Chat Area */}
      {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-96">
          <div className="p-2 h-128 overflow-y-auto">
            {/* Iframe for chatbot */}
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/Mi64SO5aqTPIskF_iaJVX"
              width="100%"
              style={{ height: '100%' }}
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};



export default Chatbot;









