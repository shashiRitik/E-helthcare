import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, UserCheck, Stethoscope, Building, Calendar, FileText, DollarSign, Activity, Plus, Eye, CreditCard as Edit, Trash2, BarChart3, Settings, Shield, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalPatients: 1250,
    totalDoctors: 45,
    totalStaff: 120,
    totalAppointments: 2340,
    pendingAppointments: 85,
    completedAppointments: 2255,
    totalReports: 5680,
    totalTests: 3200,
    totalRevenue: 156750
  };

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'patient',
      status: 'active',
      lastLogin: '2024-01-18',
      joinDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2024-01-19',
      joinDate: '2022-03-20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@hospital.com',
      role: 'staff',
      status: 'active',
      lastLogin: '2024-01-19',
      joinDate: '2023-01-10'
    }
  ];

  const departments = [
    {
      id: '1',
      name: 'Cardiology',
      headDoctor: 'Dr. Sarah Johnson',
      doctorCount: 8,
      patients: 320,
      status: 'active'
    },
    {
      id: '2',
      name: 'Neurology',
      headDoctor: 'Dr. Michael Brown',
      doctorCount: 6,
      patients: 250,
      status: 'active'
    },
    {
      id: '3',
      name: 'Pediatrics',
      headDoctor: 'Dr. Emily Davis',
      doctorCount: 10,
      patients: 680,
      status: 'active'
    }
  ];

  const systemLogs = [
    {
      id: '1',
      action: 'User Login',
      user: 'Dr. Sarah Johnson',
      timestamp: '2024-01-19 14:30:25',
      details: 'Successful login from 192.168.1.100'
    },
    {
      id: '2',
      action: 'Appointment Created',
      user: 'John Doe',
      timestamp: '2024-01-19 14:25:18',
      details: 'New appointment scheduled with Dr. Michael Brown'
    },
    {
      id: '3',
      action: 'Report Upload',
      user: 'Jane Smith',
      timestamp: '2024-01-19 14:20:45',
      details: 'Blood test report uploaded'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'system', label: 'System Management', icon: Settings },
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
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">System administration and management</p>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-red-600" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Administrator</p>
                  <p className="text-sm text-gray-500">Full system access</p>
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
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500"
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
                        ? 'bg-red-100 text-red-700'
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
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Users className="h-10 w-10 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalPatients.toLocaleString()}</p>
                    <p className="text-gray-600">Total Patients</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Stethoscope className="h-10 w-10 text-green-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors}</p>
                    <p className="text-gray-600">Total Doctors</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <UserCheck className="h-10 w-10 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalStaff}</p>
                    <p className="text-gray-600">Total Staff</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Calendar className="h-10 w-10 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments.toLocaleString()}</p>
                    <p className="text-gray-600">Total Appointments</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <FileText className="h-10 w-10 text-teal-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">{stats.totalReports.toLocaleString()}</p>
                    <p className="text-gray-600">Medical Reports</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <DollarSign className="h-10 w-10 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-gray-600">Monthly Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Activity */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent System Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {systemLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start">
                        <Activity className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-sm text-gray-500">{log.user}</p>
                          <p className="text-xs text-gray-400">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Department Status */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Department Overview</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {departments.map((dept) => (
                      <div key={dept.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{dept.name}</p>
                          <p className="text-sm text-gray-500">{dept.headDoctor}</p>
                          <p className="text-sm text-gray-500">
                            {dept.doctorCount} doctors • {dept.patients} patients
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {dept.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Add User Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                            user.role === 'staff' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Department Management</h3>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div key={dept.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Building className="h-8 w-8 text-blue-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {dept.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">Head: {dept.headDoctor}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{dept.doctorCount}</p>
                      <p className="text-sm text-gray-500">Doctors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{dept.patients}</p>
                      <p className="text-sm text-gray-500">Patients</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Management Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            {/* System Health */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">System Health & Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-gray-600">System Uptime</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">847</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-gray-600">System Alerts</p>
                </div>
              </div>
            </div>

            {/* System Logs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">System Activity Logs</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <Activity className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <span className="text-xs text-gray-400">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600">User: {log.user}</p>
                        <p className="text-sm text-gray-500">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;