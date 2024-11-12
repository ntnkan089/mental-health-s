// Applications.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Application {
  
    userId: string;
    name: string;
    email: string;
    description: string;
    applicationId: number;

  
  createdAt: string;
  status: string;
  supportingDocument?: string; // Optional field for the file URL

}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchApplications = async () => {
      try {
        const response = await fetch('https://health-s-deplo.onrender.com/api/applications', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }) // Adjust the API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Applications</h1>
      <ul className="space-y-4">
        {applications.map((application) => (
          <li key={application.applicationId} className="border rounded-lg p-4 shadow-lg bg-white">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{application.name}</h2>
                <p className="text-sm text-gray-500">user id: {application.userId}</p>
                <p className="text-sm text-gray-500">{new Date(application.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-yellow-600">Status: {application.status}</p>
              </div>
              <Link
                to={`/applications/${application.applicationId}`} // Adjust the path as necessary
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
            {application.supportingDocument && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Attached File:</p>
                <a
                  href={application.supportingDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {application.supportingDocument.split('/').pop()}
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;




