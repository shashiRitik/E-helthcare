import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  FileText, 
  Clock, 
  User, 
  Plus,
  Upload,
  Download,
  Eye,
  Activity,
  Heart
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Brown',
      department: 'Dermatology',
      date: '2024-01-25',
      time: '2:30 PM',
      status: 'confirmed'
    }
  ];

  const recentReports = [
    {
      id: '1',
      name: 'Blood Test Results',
      date: '2024-01-15',
      type: 'Lab Report',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      name: 'X-Ray Chest',
      date: '2024-01-10',
      type: 'Imaging',
      doctor: 'Dr. Michael Brown'
    }
  ];

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
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.first_name}!
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
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
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {upcomingAppointments.length}
                    </p>
                    <p className="text-gray-600">Upcoming Appointments</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {recentReports.length}
                    </p>
                    <p className="text-gray-600">Medical Reports</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-gray-600">Completed Visits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.doctor}</p>
                          <p className="text-sm text-gray-500">{appointment.department}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.type}</p>
                          <p className="text-sm text-gray-500">By {report.doctor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">My Appointments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{appointment.doctor}</h4>
                        <p className="text-gray-600">{appointment.department}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="flex items-center text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                          {appointment.status}
                        </span>
                        <div className="mt-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Medical Report</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Choose Files
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Medical Reports</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.type} • {report.date}</p>
                          <p className="text-sm text-gray-500">Uploaded by {report.doctor}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Appointment Tab */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Book New Appointment</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Department</option>
                    <option>Cardiology</option>
                    <option>Dermatology</option>
                    <option>Neurology</option>
                    <option>Orthopedics</option>
                    <option>Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Doctor</option>
                    <option>Dr. Sarah Johnson</option>
                    <option>Dr. Michael Brown</option>
                    <option>Dr. Emily Davis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit / Symptoms
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your symptoms or reason for the visit..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;