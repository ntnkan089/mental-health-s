import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ApplicationDetails {
  userId: string;
  name: string;
  email: string;
  description: string;
  applicationId: number;
  createdAt: string;
  status: string;
  supportingDocument?: string; // Optional field for the file URL
}

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/api/applications/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch application details');
        }
        const data = await response.json();
        if (data.supportingDocument) {
          setType(data.supportingDocument.split('/').pop()?.split('.').pop());
        }
        setApplication(data);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  const handleAccept = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...application, status: 'Accepted' }),
      });
      if (!response.ok) {
        throw new Error('Failed to accept application');
      }

      // Update user role to facilitator
      const userResponse = await fetch(`http://localhost:8080/user/role?userId=${application!.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: 'facilitator' }),
      });
      if (!userResponse.ok) {
        throw new Error('Failed to update user role');
      }
    } catch (err: unknown) {
      setError(err);
    }
  };

  const handleReject = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...application, status: 'Rejected' }),
      });
      if (!response.ok) {
        throw new Error('Failed to reject application');
      }
    } catch (err: unknown) {
      setError(err);
    }
  };

  if (loading) return <div className="text-center">Loading application details...</div>;
  if (error) return <div className="text-red-500 text-center">Error</div>;
  if (!application) return <div className="text-center">No application found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-2">Application Details</h1>
      <h2 className="text-xl font-semibold text-blue-600">{application.name}</h2>
      <p className="text-sm text-gray-500">{new Date(application.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-yellow-600">Status: {application.status}</p>
      
      <div className="mt-4">
        <h4 className="text-md font-semibold">Description:</h4>
        <p className="mt-2 text-gray-700">{application.description}</p>
      </div>

      {type && <p className="mt-2 text-sm text-gray-500">File Type: {type}</p>}

      {application.supportingDocument && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Attached File:</p>
          <a
            href={application.supportingDocument}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {application.supportingDocument.split('/').pop()}
          </a>
          {application.supportingDocument.match(/\.(pdf)$/i) ? (
            <div className="mt-2 flex flex-col items-center">
              <p className="text-sm text-gray-500">File Preview:</p>
              <object data={application.supportingDocument} type="application/pdf" width="80%" className="h-128 mt-2">
                <p>Alternative text - include a link <a href={application.supportingDocument} className="text-blue-500 hover:underline">here</a>.</p>
              </object>
            </div>
          ) : application.supportingDocument.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img
                src={application.supportingDocument}
                alt="Attached Document"
                className="w-full h-auto max-h-96 object-contain border rounded"
              />
            </div>
          ) : (
            <p className="text-red-500">Unsupported file type.</p>
          )}
        </div>
      )}
      
      <div className="mt-6 flex space-x-4 justify-center">
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition duration-200"
        >
          Reject
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-amber-500 text-white rounded shadow hover:bg-amber-600 transition duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;









