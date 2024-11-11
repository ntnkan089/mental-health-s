// src/context/UserContext.tsx
import { createContext, useState, ReactNode } from 'react';

// Define the shape of the user data
interface User {
  userId: string;
  
  username: string;
  email: string;
  role: string;
}

// Define the shape of the context state and methods

interface UserContextType {
  
    user_0: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user_0, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user_0, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;









