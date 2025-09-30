import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Search, FileText, DollarSign, Activity, Plus, Eye, CreditCard as Edit, CreditCard, CheckCircle } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const patients = [
    {
      id: '1',
      name: 'John Doe',
      patientId: 'P001',
      phone: '+1234567890',
      lastVisit: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      patientId: 'P002',
      phone: '+1234567891',
      lastVisit: '2024-01-12',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      patientId: 'P003',
      phone: '+1234567892',
      lastVisit: '2024-01-10',
      status: 'active'
    }
  ];

  const testRegistrations = [
    {
      id: '1',
      patient: 'John Doe',
      patientId: 'P001',
      test: 'Blood Test',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      amount: 150,
      paymentStatus: 'pending'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      patientId: 'P002',
      test: 'X-Ray Chest',
      prescribedBy: 'Dr. Michael Brown',
      date: '2024-01-21',
      amount: 250,
      paymentStatus: 'paid'
    }
  ];

  const recentPayments = [
    {
      id: '1',
      patient: 'Jane Smith',
      amount: 250,
      method: 'Credit Card',
      date: '2024-01-18',
      status: 'completed'
    },
    {
      id: '2',
      patient: 'Bob Wilson',
      amount: 180,
      method: 'Cash',
      date: '2024-01-17',
      status: 'completed'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patient Search', icon: Search },
    { id: 'tests', label: 'Test Registration', icon: FileText },
    { id: 'payments', label: 'Payment Processing', icon: DollarSign },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.first_name} {user?.last_name}
                </h1>
                <p className="text-gray-600">Hospital Staff - Help Desk</p>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-teal-600" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Staff Portal</p>
                  <p className="text-sm text-gray-500">Patient support & services</p>
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
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-teal-500 focus:outline-none focus:ring-teal-500"
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
                        ? 'bg-teal-100 text-teal-700'
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
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {patients.length}
                    </p>
                    <p className="text-gray-600">Total Patients</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {testRegistrations.length}
                    </p>
                    <p className="text-gray-600">Pending Tests</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      ${recentPayments.reduce((sum, payment) => sum + payment.amount, 0)}
                    </p>
                    <p className="text-gray-600">Today's Collections</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {testRegistrations.filter(t => t.paymentStatus === 'pending').length}
                    </p>
                    <p className="text-gray-600">Pending Payments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Test Registrations */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Test Registrations</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {testRegistrations.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{test.patient}</p>
                          <p className="text-sm text-gray-500">{test.test}</p>
                          <p className="text-sm text-gray-500">Date: {test.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${test.amount}</p>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            test.paymentStatus === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {test.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{payment.patient}</p>
                          <p className="text-sm text-gray-500">{payment.method}</p>
                          <p className="text-sm text-gray-500">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${payment.amount}</p>
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Patient Search Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Patient Search</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search by name or patient ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
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
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.patientId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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

        {/* Test Registration Tab */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            {/* Register New Test Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Register New Test</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.patientId})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select Test Type</option>
                      <option>Blood Test</option>
                      <option>X-Ray</option>
                      <option>MRI Scan</option>
                      <option>CT Scan</option>
                      <option>Ultrasound</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescribed By
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select Doctor</option>
                      <option>Dr. Sarah Johnson</option>
                      <option>Dr. Michael Brown</option>
                      <option>Dr. Emily Davis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Additional notes or instructions..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Register Test
                  </button>
                </div>
              </form>
            </div>

            {/* Registered Tests */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Registered Tests</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {testRegistrations.map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{test.patient}</h4>
                          <p className="text-gray-600">{test.test}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-gray-500">Prescribed by: {test.prescribedBy}</span>
                            <span className="text-gray-500">Date: {test.date}</span>
                            <span className="text-gray-500">Amount: ${test.amount}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            test.paymentStatus === 'paid' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {test.paymentStatus}
                          </span>
                          {test.paymentStatus === 'pending' && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                              Process Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Processing Tab */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Payment Processing Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Process Payment</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.patientId})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select Payment Method</option>
                      <option>Cash</option>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Optional - for card payments"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </button>
                </div>
              </form>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{payment.patient}</p>
                          <p className="text-sm text-gray-500">{payment.method} • {payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${payment.amount}</p>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {payment.status}
                        </span>
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

export default StaffDashboard;