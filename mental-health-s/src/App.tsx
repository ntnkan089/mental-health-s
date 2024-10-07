import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import LandingPage from './views/LandingPage';
import LoginPage from './views/login';
import RegisterPage from './views/regis';
import ProfilePage from './views/profile';
import PHQ9Quiz from './components/phq';
import GAD7Quiz from './components/gad';
import ProtectedRoute from './components/protected';
import CategoryDiscussion from './views/catediscussio'
import ForumsPage from './views/forum';

import ResourcePage from './views/resource';


import FacilitatorApplicationPage from './views/facilform';
import ScheduleMeetingPage from './views/sched';

import DiscussionDetail from './components/discussio-det';

import './index.css';




const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
          <Route path="/phq9" element={<PHQ9Quiz />} />
          <Route path="/gad7" element={<GAD7Quiz />} />
          <Route path="/forums" element={<ForumsPage />} />
          <Route path="/forums/:category" element={<CategoryDiscussion />} />
          <Route path="/forums/discussion/:discussionTitle" element={<DiscussionDetail />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/facilitator-form" element={<FacilitatorApplicationPage />} />
          <Route path="/schedule" element={<ScheduleMeetingPage />} />

        </Routes>
      </div>
    </Router>

  );
}





export default App;







