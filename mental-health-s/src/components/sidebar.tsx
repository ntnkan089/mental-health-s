import React from 'react';

import { Link } from 'react-router-dom';

import { useUser } from '../hook/user';
import { BarChart, Activity , ClipboardList, Calendar, Scroll, NotebookPen, Users     } from 'lucide-react'; // Importing Lucide icons

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScheduleMeetingModal } from './meeting/sched';

const Sidebar: React.FC = () => {
  const { user_0 } = useUser();
  return (
    
    <div className="w-64 h-full bg-gray-800 text-white p-6 shadow-lg">
      <ul className="space-y-4">
        <li>
          
          <Link to="/profile/charts" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
            <BarChart className="mr-2" />
            Charts
          </Link>
        </li>
        <li>
          <Link to="/profile/reminders" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
            <Activity className="mr-2" />
            Exercises
          </Link>
        </li>
        <li>
          <Link to="/resources" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
            <ClipboardList className="mr-2" />
            Resources
          </Link>
        </li>
        <li>
          <Link to="/profile/events" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
            <Calendar className="mr-2" />
            Your Events
          </Link>
        
        </li>

        <li>
          
          <Link to="/profile/quizzes" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
            <NotebookPen  className="mr-2" />

            Quizzes
          </Link>
        </li>
        {user_0?.role === 'admin' && (
          <li>
            <Link to="/applications" className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200">
              <Scroll className="mr-2" />
              Applications
            </Link>
          </li>
        )}
        {(user_0?.role === 'admin'||user_0?.role === 'facilitator') && (
          <li>
            <Dialog>
                <DialogTrigger asChild>
                <p className="flex items-center text-gray-300 hover:text-blue-400 transition duration-200 hover:cursor-pointer">
              <Users  className="mr-2" />
              Host an Event
            </p>
                </DialogTrigger>
                <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                    <DialogTitle className="text-2xl font-semibold">Create New Event</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to schedule a new event.
                    </DialogDescription>
                    <ScheduleMeetingModal />
                </DialogContent>
            </Dialog>
          </li>
        )}
        

      </ul>
    </div>
  );
};

export default Sidebar;














