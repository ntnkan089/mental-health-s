import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

import { categoryLabels, categoryImages } from '@/config/cateC';


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

const MeetingsList: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const {category}=useParams();
    useEffect(() => {
        const fetchMeetings = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://health-s-deplo.onrender.com/api/meetings/category/${category}`, {
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
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error loading meetings.</div>;
    }

    const groupedMeetings = meetings.reduce<Record<string, Meeting[]>>((acc, meeting) => {
        (acc[meeting.category] = acc[meeting.category] || []).push(meeting);
        return acc;
    }, {});

    return (
        <div className="p-4 lg:p-8  min-h-screen">
            <h2 className="text-3xl font-bold mt-8 mb-6 text-center">Upcoming Meetings</h2>

            {Object.entries(groupedMeetings).map(([category, meetings]) => (
                <div key={category} className="mb-12">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">{categoryLabels[category]}</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {meetings.map((meeting) => (
                            <div 
                                key={meeting.meetingId} 
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
                                style={{
                                    backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${categoryImages[category]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white opacity-90 rounded-lg"></div>
                                <div className="relative p-6 z-10">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{meeting.topic}</h4>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <MapPin className="w-5 h-5 mr-1" />
                                        <p>{meeting.locationType}</p>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <Calendar className="w-5 h-5 mr-1" />
                                        <p>{new Date(meeting.startTime).toLocaleString()}</p>
                                    </div>
                                    <p className="text-gray-700 mb-4">{meeting.description}</p>
                                    <Link 
                                        to={`/event/${meeting.meetingId}`} 
                                        className="text-indigo-600 font-medium hover:underline"
                                    >
                                        View Event
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default MeetingsList;

















