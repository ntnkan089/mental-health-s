import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useUser } from '@/hook/user';
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user_0 } = useUser();
  const { logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isTokenExpired = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payloadBase64 = parts[1];
    try {
      const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      const payloadData = JSON.parse(decodedPayload);
      return payloadData.exp ? Date.now() > payloadData.exp * 1000 : false;
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const tokenExpired = isTokenExpired();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-600 text-2xl font-semibold hover:underline">
          Mental Health Support
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link to="/resources" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Resources</Link>
          </li>

          {!tokenExpired && (
            <>
              <li>
                <Link to="/forums" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Forums</Link>
              </li>
              <li>
                <Link to="/virtual-support" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Events</Link>
              </li>
            </>
          )}
          {tokenExpired ? (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-blue-500 transition-colors duration-300">Register</Link>
              </li>
            </>
          ) : (
            <>
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors duration-300 focus:outline-none"
                >
                  <User className="h-6 w-6" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="p-2">
                      <li>
                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                          Your Profile
                        </Link>
                      </li>
                      {user_0?.role !== 'admin' && user_0?.role !== 'facilitator' && (
                        <li>
                          <Link to="/facilitator-form" className="block px-4 py-2 text-gray-700 w-full hover:bg-gray-100 rounded-md">
                            Apply to be a facilitator
                          </Link>
                        </li>
                      )}
                      <li>
                        <Dialog>
                          <DialogTrigger>
                            <button className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                              Sign Out
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Sign Out Confirmation</DialogTitle>
                              <DialogDescription>Are you sure you want to sign out?</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex justify-between">
                              <button 
                                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
                                onClick={() => setIsDropdownOpen(false)}
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
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;














