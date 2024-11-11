import React, { useEffect, useState } from 'react';

import a00 from '@/assets/exercis/3as0dasds.jpg'

interface Meeting {
    meetingId: number;
    topic: string;
    startTime: string;
    duration: number; 
    locationType: string;
    description: string;
    category: string;
    meetingUrl?: string;
    image?: string; 
}

// Props interface for CategoryMeetings component
interface CategoryMeetingsProps {
    category: string;
}

const CategoryMeetings: React.FC<CategoryMeetingsProps> = ({ category }) => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMeetingsByCategory = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/api/meetings/category/${category}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Meeting[] = await response.json();
                setMeetings(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchMeetingsByCategory();
        }
    }, [category]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading meetings.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{category} Meetings</h2>
            <div className="flex flex-col gap-4">
                {meetings.map((meeting) => (
                    <div 
                        key={meeting.meetingId} 
                        className="relative flex flex-col justify-center items-start bg-white bg-opacity-80 rounded-lg shadow-md p-4 transition-shadow duration-300"
                        style={{ backgroundImage: a00, backgroundSize: 'cover', backgroundPosition: 'right center' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-50 rounded-lg"></div>
                        <h4 className="text-lg font-semibold z-10">{meeting.topic}</h4>
                        <p className="text-gray-600 z-10">Location Type: {meeting.locationType}</p>
                        <p className="text-gray-600 z-10">Start Time: {new Date(meeting.startTime).toLocaleString()}</p>
                        <p className="text-gray-700 mb-2 z-10">{meeting.description}</p>
                        <a 
                            href={`/event/${meeting.meetingId}`} 
                            className="text-blue-600 hover:underline z-10"
                        >
                            View Event
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryMeetings;

