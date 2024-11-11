import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import LandingPage from './views/LandingPage';
import LoginPage from './views/login';
import RegisterPage from './views/regis';
import ProfilePage from './views/profile/profile';
import PHQ9Quiz from './components/phq';
import GAD7Quiz from './components/gad';
import ProtectedRoute from './components/protected';
import CategoryDiscussion from './views/catediscussio'
import ForumsPage from './views/forum';

import ResourcePage from './views/resource';
import Chatbot from './components/ai_c/aiC';

import FacilitatorApplicationPage from './views/facilform';
import ScheduleMeetingPage from './views/sched';

import DiscussionDetail from './components/discussio-det';

import './index.css';




import ChartsPage from './views/profile/charts';


import Applications from './components/form/faciList';
import { UserProvider } from './context/UserContext';
import FileUpload from './views/uploa-tes';

import ApplicationDetails from './components/form/faci-det';


import MeetingsList from './views/virtua';
import MeetingDetail from './components/meeting/event-det';
import EventRegistrations from './views/profile/event';
import ExercisesPage from './views/exercise';

import QuizLinks from './components/quizlink';

import AllCate from './views/virtua_a';


const App: React.FC = () => {

  return (
    <UserProvider>
      
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
          <Route path="/profile/charts" element={<ProtectedRoute><ChartsPage /></ProtectedRoute>} /> 
           
          <Route path="/profile/events" element={<ProtectedRoute><EventRegistrations /></ProtectedRoute>} /> 
          <Route path="/profile/quizzes" element={<ProtectedRoute><QuizLinks /></ProtectedRoute>} /> 
          
          <Route path="/profile/reminders" element={<ProtectedRoute><ExercisesPage /></ProtectedRoute>} /> 
          
          

          <Route path="/phq9" element={<ProtectedRoute><PHQ9Quiz /></ProtectedRoute>} />
          <Route path="/gad7" element={<ProtectedRoute><GAD7Quiz /></ProtectedRoute>} />
          <Route path="/forums" element={<ProtectedRoute><ForumsPage /></ProtectedRoute>} />
          <Route path="/forums/:category" element={<ProtectedRoute><CategoryDiscussion /></ProtectedRoute>} />
          <Route path="/forums/discussion/:discussionId" element={<ProtectedRoute><DiscussionDetail /></ProtectedRoute>} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/facilitator-form" element={<ProtectedRoute><FacilitatorApplicationPage /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><ScheduleMeetingPage /></ProtectedRoute>} />
          <Route path="/tes" element={<ProtectedRoute><FileUpload /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/applications/:id" element={<ProtectedRoute><ApplicationDetails /></ProtectedRoute>} />
          <Route path="/virtual-support" element={<ProtectedRoute><MeetingsList /></ProtectedRoute>} />
          <Route path="/events/category/:category" element={<ProtectedRoute><AllCate /></ProtectedRoute>} />
          <Route path="/event/:id" element={<ProtectedRoute><MeetingDetail /></ProtectedRoute>} />
        </Routes>
        <Chatbot />
      </div>

    </Router>
    </UserProvider>
  
);


}

export default App;











