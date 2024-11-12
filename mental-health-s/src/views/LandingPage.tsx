// src/LandingPage.js
//import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen ">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Mental Health Support Platform</h1>
        <p className="mt-4 text-lg">Your journey to mental well-being starts here.</p>
      </header>
      <main className="flex flex-col items-center space-y-6">

         <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full flex items-center">
        <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">
                <Link 
                    to="/resources" 
                    className="text-amber-500 underline hover:no-underline"
                >
                    Discover Resources →
                </Link>
            </h2>
            <p className="mb-2">Explore a curated collection of articles, videos, and tools.</p>
        </div>
    </div>

    {/* Join the Community */}
    <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full flex items-center">
        <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4"><Link 
                    to="/forums" 
                    className="text-amber-500 underline hover:no-underline"
                >
                    Join the Community →
                </Link>
            </h2>
            <p className="mb-2">Connect with others in our supportive forums and groups.</p>
        </div>
    </div>

    {/* Get Professional Help */}
    <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full flex items-center">
        <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4"><Link 
                    to="/resources" 
                    className="text-amber-500 underline hover:no-underline"
                >
                   Get Professional Help →
                </Link>
                
                </h2>
            <p className="mb-2">Find a mental health professional that suits your needs.</p>
        </div>
    </div>
        <button className="mt-6 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300">
          <Link to = '/profile'>
          Get Started
          </Link>
        </button>
      </main>
    </div>
  );

};


export default LandingPage;











