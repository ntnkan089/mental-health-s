// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

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

  if (!token || isTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;



