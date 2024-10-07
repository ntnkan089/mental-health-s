import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const isTokenExpired = (): boolean => {
    const token = localStorage.getItem('token');

    if (!token) {
      return true; // No token, consider it expired
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token format:', token);
      return true; // Invalid token format
    }

    const payloadBase64 = parts[1];

    // Decode and attempt to parse the payload
    try {
      // Decode Base64 URL-encoded string
      const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));

      // Check if it's a valid JSON
      const payloadData = JSON.parse(decodedPayload); // Attempt to parse as JSON

      // Now check the expiry if it has 'exp' field
      if (payloadData.exp) {
        const expiry = payloadData.exp * 1000; // Convert to milliseconds
        return Date.now() > expiry; // Check if expired
      }
      return false; // No expiry found, consider valid
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If there's an error, consider the token expired
    }
  };

  const tokenExpired = isTokenExpired();

  // Sign Out function
  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-600 text-2xl font-bold hover:underline">
          Mental Health Support
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300">Home</Link>
          </li>
          {tokenExpired ? (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 transition duration-300">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition duration-300">Your Profile</Link>
              </li><li>
                <Link to="/forums" className="text-gray-700 hover:text-blue-600 transition duration-300">Forums</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-700 hover:text-blue-600 transition duration-300">Resources</Link>
              </li>
              <li>
                <Link to="/facilitator-form" className="text-gray-700 hover:text-blue-600 transition duration-300">Apply to be a facilitator</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-700 hover:text-blue-600 transition duration-300">Virtual Support</Link>
              </li>
              <li>
              <Dialog>
                  <DialogTrigger>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-700 hover:text-blue-600 transition duration-300"
                    >
                      Sign Out
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sign Out Confirmation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to sign out?
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex justify-between">
                      <button 
                        className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                      >
                        Cancel
                      </button>
                      <button 
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
                        onClick={handleSignOut}
                      >
                        Confirm
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;












