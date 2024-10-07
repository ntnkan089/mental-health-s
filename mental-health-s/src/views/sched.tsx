// pages/schedule-meeting.tsx

import { ScheduleMeetingModal } from "@/components/meeting/sched"; // Adjust the import path based on your file structure

const ScheduleMeetingPage = () => {
    return (

        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Schedule a Meeting</h1>
            <ScheduleMeetingModal />
        </div>
    );
};

export default ScheduleMeetingPage;


