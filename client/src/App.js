// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Login from './pages/Login';
import RecruiterSignup from './pages/RecruiterSignup';
import CandidateSignup from './pages/CandidateSignup';
import LinkedInCallback from './pages/LinkedInCallback';
import LinkedInProfile from './pages/LinkedInProfile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import TalentMatchDemo from './components/TalentMatchDemo';
import MonProfil from './pages/MonProfil';
import NewJobOffer from './pages/NewJobOffer';
import RecruiterApplications from './pages/RecruiterApplications';
import InterviewCalendar from './pages/InterviewCalendar';
import CVAnalysis from './pages/CVAnalysis';
import MesCandidatures from './pages/MesCandidatures';
import OffresEmploi from './pages/OffresEmploi';
import Messages from './pages/Messages';
import HomePage from './pages/HomePage';
import JobDetail from './pages/JobDetail';
import CompanyDetail from './pages/CompanyDetail';
import UserProfile from './pages/UserProfile';
import Chatbot from './components/Chatbot/Chatbot';  // ← import correct

// Composant pour les routes protégées
const ProtectedRoute = ({ children, allowedTypes }) => {
  const { currentUser, userType } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recruiter-signup" element={<RecruiterSignup />} />
          <Route path="/candidate-signup" element={<CandidateSignup />} />
          <Route path="/demo" element={<TalentMatchDemo />} />
          <Route path="/linkedin-callback" element={<LinkedInCallback />} />
          <Route path="/offres-emploi/:id" element={<JobDetail />} />
          <Route path="/entreprises/:id" element={<CompanyDetail />} />

          {/* Nouvelle route pour votre Chatbot de conseils */}
          <Route path="/conseils" element={<Chatbot />} />

          {/* Routes protégées pour recruteurs */}
          <Route
            path="/recruiter-dashboard"
            element={
              <ProtectedRoute allowedTypes={['recruiter']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-job-offer"
            element={
              <ProtectedRoute allowedTypes={['recruiter']}>
                <NewJobOffer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications-management"
            element={
              <ProtectedRoute allowedTypes={['recruiter']}>
                <RecruiterApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview-calendar"
            element={
              <ProtectedRoute allowedTypes={['recruiter']}>
                <InterviewCalendar />
              </ProtectedRoute>
            }
          />

          {/* Routes protégées pour candidats */}
          <Route
            path="/candidate-dashboard"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/linkedin-profile"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <LinkedInProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cv-analysis"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <CVAnalysis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mon-profil"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <MonProfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mes-candidatures"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <MesCandidatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offres-emploi"
            element={
              <ProtectedRoute allowedTypes={['candidate']}>
                <OffresEmploi />
              </ProtectedRoute>
            }
          />

          {/* Route commune pour le profil */}
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute allowedTypes={['candidate', 'recruiter']}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute allowedTypes={['candidate', 'recruiter']}>
                <Messages />
              </ProtectedRoute>
            }
          />

          {/* Placeholder pour accès non autorisé */}
          <Route path="/unauthorized" element={<div>Accès non autorisé</div>} />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
