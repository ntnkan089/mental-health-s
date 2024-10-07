// src/LandingPage.js
//import React from 'react';


const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Mental Health Support Platform</h1>
        <p className="mt-4 text-lg">Your journey to mental well-being starts here.</p>
      </header>
      <main className="flex flex-col items-center space-y-6">
        <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Discover Resources</h2>
          <p className="mb-2">Explore a curated collection of articles, videos, and tools.</p>
        </div>
        <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Join the Community</h2>
          <p className="mb-2">Connect with others in our supportive forums and groups.</p>
        </div>
        <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Get Professional Help</h2>
          <p className="mb-2">Find a mental health professional that suits your needs.</p>
        </div>
        <button className="mt-6 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default LandingPage;




