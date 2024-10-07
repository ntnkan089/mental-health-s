// src/LoginPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // Assuming you're using email as username
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.text(); // Change to json() if response is JSON
      // Assuming the token is in data.token
      localStorage.setItem('token', data); // Adjust according to your API response

      navigate('/'); // Redirect to the home page after successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred'); // Set the error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white text-black rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg w-full p-2"
            required
          />
        </div>
        <button
          type="submit" // Ensure the button submits the form
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;



