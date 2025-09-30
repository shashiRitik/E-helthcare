import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Calendar, FileText, Clock, Activity, Stethoscope, Eye, CreditCard as Edit, CheckCircle } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const todayAppointments = [
    {
      id: '1',
      patient: 'John Doe',
      time: '10:00 AM',
      reason: 'Regular Checkup',
      status: 'scheduled'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      time: '11:30 AM',
      reason: 'Follow-up consultation',
      status: 'scheduled'
    },
    {
      id: '3',
      patient: 'Mike Johnson',
      time: '2:00 PM',
      reason: 'Chest pain examination',
      status: 'in-progress'
    }
  ];

  const myPatients = [
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      lastVisit: '2024-01-15',
      condition: 'Hypertension',
      status: 'stable'
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 32,
      lastVisit: '2024-01-12',
      condition: 'Diabetes Type 2',
      status: 'monitoring'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      age: 58,
      lastVisit: '2024-01-10',
      condition: 'Heart Disease',
      status: 'critical'
    }
  ];

  const recentReports = [
    {
      id: '1',
      patient: 'John Doe',
      type: 'Blood Test',
      date: '2024-01-15',
      status: 'reviewed'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      type: 'X-Ray',
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'patients', label: 'My Patients', icon: Users },
    { id: 'reports', label: 'Patient Reports', icon: FileText },
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
                  Dr. {user?.first_name} {user?.last_name}
                </h1>
                <p className="text-gray-600">Cardiology Department</p>
              </div>
              <div className="flex items-center space-x-3">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Doctor Portal</p>
                  <p className="text-sm text-gray-500">Manage your patients</p>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {todayAppointments.length}
                    </p>
                    <p className="text-gray-600">Today's Appointments</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {myPatients.length}
                    </p>
                    <p className="text-gray-600">Active Patients</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {recentReports.length}
                    </p>
                    <p className="text-gray-600">Pending Reports</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">85%</p>
                    <p className="text-gray-600">Schedule Utilization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.patient}</p>
                          <p className="text-sm text-gray-500">{appointment.reason}</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Critical Patients */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Patients Requiring Attention</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {myPatients.filter(p => p.status === 'critical' || p.status === 'monitoring').map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.condition}</p>
                          <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          patient.status === 'critical' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status}
                        </span>
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
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Appointment Schedule</h3>
              <div className="flex items-center space-x-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{appointment.patient}</h4>
                        <p className="text-gray-600">{appointment.reason}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          Start Consultation
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">My Patients</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="search"
                    placeholder="Search patients..."
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.condition}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === 'stable' 
                            ? 'bg-green-100 text-green-800'
                            : patient.status === 'monitoring'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Patient Reports</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{report.patient}</p>
                        <p className="text-sm text-gray-500">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === 'reviewed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                          <Eye className="h-4 w-4" />
                        </button>
                        {report.status === 'pending' && (
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;