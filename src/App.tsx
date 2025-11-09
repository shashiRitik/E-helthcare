import React from 'react';
import N8nChatbot from './components/common/N8nChatbot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      {/* 👇 Global n8n Chatbot (Available on all pages) */}
      <N8nChatbot />
      <Router>
        <Routes>
          {/* Public routes with navbar and footer */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <About />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />

          {/* Auth routes without navbar and footer */}
          <Route path="/auth/login" element={
            <Layout showNavbar={false} showFooter={false}>
              <Login />
            </Layout>
          } />
          <Route path="/auth/signup" element={
            <Layout showNavbar={false} showFooter={false}>
              <Signup />
            </Layout>
          } />

          {/* Protected dashboard routes without footer */}
          <Route path="/patient/dashboard" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Layout showFooter={false}>
                <PatientDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/doctor/dashboard" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Layout showFooter={false}>
                <DoctorDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/staff/dashboard" element={
            <ProtectedRoute allowedRoles={['staff']}>
              <Layout showFooter={false}>
                <StaffDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout showFooter={false}>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;