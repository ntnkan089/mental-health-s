import React, { useEffect, useState } from 'react';

type Video = {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
  };


const MentalHealthVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("mental health");


  useEffect(() => {
    fetchVideos(searchTerm);
  }, [searchTerm]);

  const fetchVideos = async (query: string) => {
    const API_KEY = "AIzaSyBbS4220FkIivROGM72TI6s41YUOI3MWeI";
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=10&key=${API_KEY}`
    );
    const data = await response.json();
    setVideos(data.items);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <label htmlFor="topics" className="block text-lg font-medium text-gray-700">
          Search by Topic:
        </label>
        <select
          id="topics"
          onChange={handleSearchChange}
          className="mt-2 block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
        >
          <option value="mental health">Mental Health</option>
          <option value="adhd">ADHD</option>
          <option value="anxiety">Anxiety</option>
          <option value="depression">Depression</option>
          <option value="mindfulness">Mindfulness</option>
          <option value="stress management">Stress Management</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos?.map((video: Video) => (
          <div key={video.id.videoId} className="bg-white rounded-lg shadow-lg overflow-hidden">
            
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
              <p className="text-gray-600">{video.snippet.description}</p>
              <iframe
                className="w-full h-48 mt-4"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthVideos;
