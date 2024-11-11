// YouTubePlaylist.tsx
import React from 'react';

interface YouTubePlaylistProps {
  title: string;
  playlistId: string;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({ title, playlistId }) => {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${playlistId}/0.jpg`; // Thumbnail URL

  return (
    <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
      <img src={thumbnailUrl} alt={`${title} Thumbnail`} className="w-32 h-18 rounded-lg mr-4" />
      <span className="text-lg font-semibold text-gray-800">{title}</span>
    </a>
  );
};

export default YouTubePlaylist;
