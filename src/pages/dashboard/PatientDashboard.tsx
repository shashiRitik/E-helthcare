import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Calendar,
  FileText,
  Plus,
  Activity,
  Heart
} from 'lucide-react';
import OverviewTab from '../../components/tabs/Patient/OverviewTab';
import AppointmentListTab from '../../components/tabs/Patient/AppointmentListTab';
import MedicalReportTab from '../../components/tabs/Patient/MedicalReportTab';
import BookAppointmentsTab from '../../components/tabs/Patient/BookAppointmentsTab';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Medical Reports', icon: FileText },
    { id: 'book', label: 'Book Appointment', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.first_name || 'Patient'}!
              </h1>
              <p className="text-gray-600">Manage your health and appointments</p>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Patient Portal</p>
                <p className="text-sm text-gray-500">Your health dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* === OVERVIEW TAB === */}
        {activeTab === 'overview' && (
          <OverviewTab />
        )}

        {/* === APPOINTMENTS TAB === */}
        {activeTab === 'appointments' && (
          <AppointmentListTab />
        )}

        {/* === REPORTS TAB === */}
        {activeTab === 'reports' && (
          <MedicalReportTab />
        )}

        {/* === BOOK APPOINTMENT TAB === */}
        {activeTab === 'book' && (
          <BookAppointmentsTab />
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
