import React, { useEffect, useState } from 'react';

// Define the structure of an EventRegistration
interface EventRegistration {
    regisId: number;
    meetingId: number;
    eventTopic: string;
    eventDescription?: string;
    eventDate: string;
    locationType: string;
    registeredAt: string;
    image?: string; // Optional field for images
}

// Define the structure of a HostedEvent
interface HostedEvent {
    meetingId: number;
    topic: string;
    description?: string;
    startTime: string;
    locationType: string;
    image?: string; // Optional field for images
}

// EventRegistrations Component
const EventRegistrations: React.FC = () => {
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [hostedEvents, setHostedEvents] = useState<HostedEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            const token = localStorage.getItem('token');
            const userId = JSON.parse(localStorage.getItem('user_z')!).userId;
            try {
                // Fetch event registrations
                const response = await fetch(`http://localhost:8080/api/event-registrations/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: EventRegistration[] = await response.json();
                setRegistrations(data);
            } catch (err: unknown) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchHostedEvents = async () => {
            const token = localStorage.getItem('token');
            const userId = JSON.parse(localStorage.getItem('user_z')!).userId;
            try {
                // Fetch hosted events
                const response = await fetch(`http://localhost:8080/api/meetings/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: HostedEvent[] = await response.json();
                setHostedEvents(data);
            } catch (err: unknown) {
                setError(err);
            }
        };

        fetchRegistrations();
        fetchHostedEvents();
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500 text-center">Error loading event registrations.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Event Registrations</h2>
            <div className="space-y-6">
                {registrations.map((registration) => (
                    <div
                        key={registration.regisId}
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col transition-transform transform"
                    >
                        {registration.image && (
                            <img
                                src={registration.image}
                                alt={registration.eventTopic}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{registration.eventTopic}</h3>
                        <p className="text-gray-600 mb-2">
                            <strong>Event Date:</strong> {new Date(registration.eventDate).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Location Type:</strong> {registration.locationType}
                        </p>
                        {registration.eventDescription && (
                            <p className="text-gray-700 mb-4">{registration.eventDescription}</p>
                        )}
                        <div className="mt-auto flex justify-end">
                            <a
                                href={`/event/${registration.meetingId}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                View Event
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center mt-12">Events You're Hosting</h2>
            <div className="space-y-6">
                {hostedEvents.map((event) => (
                    <div
                        key={event.meetingId}
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col transition-transform transform"
                    >
                        {event.image && (
                            <img
                                src={event.image}
                                alt={event.topic}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                        )}
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.topic}</h3>
                        <p className="text-gray-600 mb-2">
                            <strong>Event Date:</strong> {new Date(event.startTime).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Location Type:</strong> {event.locationType}
                        </p>
                        {event.description && (
                            <p className="text-gray-700 mb-4">{event.description}</p>
                        )}
                        <div className="mt-auto flex justify-end">
                            <a
                                href={`/event/${event.meetingId}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                            >
                                View Event
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default EventRegistrations;







