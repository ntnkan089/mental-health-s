import React, { useState } from 'react';

interface TherapistData {
    name: string;
    credentials: string;
    location: string;
    phone: string;
    statement: string;
    url: string;
    img: string;
}

const Therapis: React.FC = () => {
    const baseUrl = 'https://www.psychologytoday.com/us/therapists/';
    const [zipCode, setZipCode] = useState<string>('60148');
    const [therapistData, setTherapistData] = useState<TherapistData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleScrapeTherapists = async () => {
        setError(null);
        const therapistUrl = `${baseUrl}${zipCode}`;
        
        try {
            const response = await fetch(`http://localhost:8080/scrape?url=${encodeURIComponent(therapistUrl)}`);
            if (!response.ok) {
                throw new Error('Error fetching therapist data');
            }
            const data: TherapistData[] = await response.json();
            setTherapistData(data);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Find Therapists Near You</h1>

                {/* Zip Code Input */}
                <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter Zip Code"
                        className="border border-gray-300 p-3 rounded-lg w-full sm:w-2/3 mb-4 sm:mb-0 mr-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleScrapeTherapists}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
                    >
                        Search Therapists
                    </button>
                </div>

                {/* Display Therapist Data */}
                {therapistData.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Therapist Profiles</h3>
                        <div className="space-y-6">
                            {therapistData.map((therapist, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                                    <img
                                        src={therapist.img}
                                        alt={therapist.name}
                                        className="w-24 h-32 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
                                    />
                                    <div>
                                        <p className="text-xl font-bold text-gray-800">{therapist.name}</p>
                                        <p className="text-gray-600 text-sm mb-1">{therapist.credentials}</p>
                                        <br />
                                        <p className="text-gray-700"><strong>Location:</strong> {therapist.location}</p>
                                        <br />
                                        <p 
                                        className="text-gray-700"><strong>Phone:</strong> {therapist.phone}</p>
                                        <br />
                                        <p className="text-gray-700 mb-2"><strong>Statement:</strong> {therapist.statement}</p>
                                        <a
                                            href={therapist.url}
                                            className="text-blue-600 font-semibold hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Handling */}
                {error && (
                    <div className="text-red-500 mt-4">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Therapis;






