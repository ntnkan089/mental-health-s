import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Mail, Calendar, Users, UserRoundPen } from 'lucide-react';
import { categoryImages } from '@/config/cateC';

interface Meeting {
    meetingId: number;
    topic: string;
    startTime: string;
    duration: number;
    locationType: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    description: string;
    contactName: string;
    contactEmail: string;
    meetingUrl?: string;
    image?: string;
    createdAt: string;
    category: string;
}

const MeetingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
    const [registrationError, setRegistrationError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeeting = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://health-s-deplo.onrender.com/api/meetings/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Meeting = await response.json();
                setMeeting(data);
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeeting();
    }, [id]);

    const daysAway = (date: string) => {
        const eventDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(eventDate.getTime() - today.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const handleRegister = async () => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('user_z')!).userId;
        if (!userId) {
            setRegistrationError("User not authenticated");
            return;
        }
        try {
            const response = await fetch('https://health-s-deplo.onrender.com/api/event-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    meetingId: meeting?.meetingId,
                    userId: userId,
                    eventTopic: meeting?.topic,
                    eventDescription: meeting?.description,
                    eventDate: meeting?.startTime,
                    locationType: meeting?.locationType,
                    registeredAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setRegistrationSuccess(true);
            setRegistrationError(null);
        } catch (err: unknown) {
            setError(err);
            setRegistrationSuccess(false);
            setRegistrationError("Failed to register for the event.");
        }
    };

    if (loading) {
        return <div className="text-center text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center text-lg">Error loading meeting details.</div>;
    }

    if (!meeting) {
        return <div className="text-center text-lg">No meeting found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 flex flex-col">
            <div className="flex-1 space-y-4">
                <div
                    className="p-4 border rounded-lg shadow-lg"
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${categoryImages[meeting.category]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{meeting.topic}</h2>
                            <p className="text-gray-500 flex items-center"><Calendar className="mr-2" />{new Date(meeting.startTime).toLocaleDateString()}</p>
                            {meeting.locationType !== "online" && (
                                <p className="text-gray-500 flex items-center"><MapPin className="mr-2" />{meeting.city}, {meeting.state}</p>
                            )}
                            <p className="text-gray-600 text-sm mt-1">{daysAway(meeting.startTime)} days away</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex-1 p-4 border rounded-lg shadow-lg bg-gradient-to-r from-amber-100 to-white">
                    <h3 className="text-lg font-semibold text-gray-700">Event Description</h3>
                    <p className="text-gray-700 mt-2">{meeting.description}</p>
                </div>
                <div className="flex flex-col flex-1 space-y-4 ml-6">
                    <div className="p-4 border rounded-lg shadow-lg bg-gradient-to-r from-pink-100 to-white">
                        <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
                        <p className="text-gray-700 mt-2 flex items-center"><UserRoundPen className="mr-2" /> {meeting.contactName}</p>
                        <p className="text-gray-700 flex items-center"><Mail className="mr-2" /> {meeting.contactEmail}</p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-lg bg-gradient-to-r from-yellow-100 to-white">
                        <h3 className="text-lg font-semibold text-gray-700">Location Details</h3>
                        <p className="text-gray-700 mt-2 flex items-center"> <Users className="mr-2" />{meeting.locationType.toUpperCase()}</p>
                        {meeting.meetingUrl && (
                            <p className="text-gray-700 flex items-center"><a href={meeting.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:no-underline">{meeting.meetingUrl}</a></p>
                        )}
                        {meeting.street && (
                            <p className="text-gray-700"><strong>Address:</strong> {meeting.street}, {meeting.city}, {meeting.state}, {meeting.zipCode}</p>
                        )}
                    </div>
                    <div className="p-4 border rounded-lg shadow-lg bg-gradient-to-r from-indigo-100 to-white text-center">
                        <button
                            onClick={handleRegister}
                            className="px-6 py-3 bg-amber-400 text-white font-semibold rounded-lg hover:bg-amber-500 transition duration-300"
                        >
                            Register for Event
                        </button>
                        {registrationSuccess && <p className="text-green-500 mt-4">Registration successful!</p>}
                        {registrationError && <p className="text-red-500 mt-4">{registrationError}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingDetail;





