// src/RegisterPage.js
//import React from 'react';


const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <form className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input type="text" id="name" className="border rounded-lg w-full p-2" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input type="email" id="email" className="border rounded-lg w-full p-2" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input type="password" id="password" className="border rounded-lg w-full p-2" required />
        </div>
        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;


