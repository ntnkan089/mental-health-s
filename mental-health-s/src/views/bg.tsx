import React from 'react';

import bg from '@/assets/event-a/bg.bmp'

interface BackgroundImageWrapperProps {

  children: React.ReactNode;


}

const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({ children }) => {
  return (
    <div

      className="bg-cover bg-center min-h-screen flex flex-col "
     
      style={{
        backgroundImage: `url(${bg})`, // Replace with the path to your image
        backgroundAttachment: 'fixed'
      }}

    >

      {children}
    
    
    </div>
  );
};





export default BackgroundImageWrapper;
















