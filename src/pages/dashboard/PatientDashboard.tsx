import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  FileText, 
  Clock, 
  Plus,
  Upload,
  Download,
  Eye,
  Activity,
  Heart
} from 'lucide-react';
import api from '../../services/api';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // ✅ Dynamic data
  const [departments, setDepartments] = useState<Array<{ id: string , name : string }>>([]);
  const [reports, setReports] = useState<Array<{ id: string , name : string }>>([]);

   const [appointments, setAppointments] = useState<
  Array<{
    id: string;
    doctorName: string;
    departmentName: string;
    date: string;
    time: string;
    status: string;
  }>
>([]);

  const [doctors, setDoctors] = useState<
    Array<{ id: string; first_name: string; last_name: string , specialization: string }>
  >([]);

  const [formData, setFormData] = useState({
    departmentId: '',
    doctorId: '',
    date: '',
    time: '',
    symptoms: '',
  });

  // ✅ Fetch doctors & departments
  useEffect(() => {
    api.get('/api/departments')
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error('Error fetching departments:', err));

    api.get('/auth/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error('Error fetching doctors:', err));

       api.get('/api/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointmets:', err));


  }, []);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // ✅ Handle button click → open file picker
  const handleReportUpload = () => {
    fileInputRef.current?.click();
  };

  // ✅ Handle file selection & upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // check file type and size
    if (!["application/pdf", "image/png", "image/jpeg"].includes(file.type)) {
      setUploadMessage("❌ Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage("❌ File size exceeds 10MB limit.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadMessage("");

      const response = await api.post("/api/reports/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // onUploadProgress: (progressEvent) => {
        //   // const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //   setUploadMessage(`Uploading... ${percent}%`);
        // },
      });

      setUploadMessage("✅ File uploaded successfully!");
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
 

   
  // ✅ Get patient ID safely
  const getPatientId = () => {
    if (user?.id) return user.id;
    try {
      const stored = localStorage.getItem('healthcare_user');
      if (stored) return JSON.parse(stored)?.id || '';
    } catch {
      return '';
    }
    return '';
  };

  // ✅ Submit appointment
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const patientId = getPatientId();
    if (!patientId) {
      setMessage('❌ Unable to find patient ID. Please log in again.'); 
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/appointments/book', {
        patientId,
        doctorId: formData.doctorId,
         departmentId: formData.departmentId,
          date: formData.date,  // ✅ separate field
          time: formData.time,
        symptoms: formData.symptoms,
      });

      setMessage('✅ Appointment booked successfully!');
      setFormData({
        departmentId: '',
        doctorId: '',
        date: '',
        time: '',
        symptoms: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('❌ Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // upload and reports - static for now




  const recentReports = [
    {
      id: '1',
      name: 'Blood Test Results',
      date: '2024-01-15',
      type: 'Lab Report',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: '2',
      name: 'X-Ray Chest',
      date: '2024-01-10',
      type: 'Imaging',
      doctor: 'Dr. Michael Brown',
    },
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

        {/* === OVERVIEW TAB === */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.length}
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

            {/* Appointments + Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                </div>
                <div className="p-6 space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-500">{appointment.departmentName}</p>
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

              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
                </div>
                <div className="p-6 space-y-4">
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
        )}

        {/* === APPOINTMENTS TAB === */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">My Appointments</h3>
            <div className="space-y-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 flex justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{appointment.doctorName}</h4>
                    <p className="text-gray-600">{appointment.departmentName}</p>
                    <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
                      <span><Calendar className="inline h-4 w-4 mr-1" />{appointment.date}</span>
                      <span><Clock className="inline h-4 w-4 mr-1" />{appointment.time}</span>
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
              ))}
            </div>
          </div>
        )}

        {/* === REPORTS TAB === */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Upload */}
         <div className="bg-white rounded-lg shadow-sm p-6 text-center border-2 border-dashed border-gray-300">
    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
    <p className="text-sm text-gray-500">Supported: PDF, JPG, PNG (Max 10MB)</p>

    {/* Hidden File Input */}
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      className="hidden"
      ref={fileInputRef}
      onChange={handleFileChange}
    />

    {/* Upload Button */}
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
      onClick={handleReportUpload}
      disabled={uploading}
    >
      {uploading ? "Uploading..." : "Choose Files"}
    </button>

    {/* Status Message */}
    {uploadMessage && (
      <p
        className={`mt-3 text-sm ${
          uploadMessage.startsWith("✅")
            ? "text-green-600"
            : uploadMessage.startsWith("❌")
            ? "text-red-600"
            : "text-blue-600"
        }`}
      >
        {uploadMessage}
      </p>
    )}
    
  </div>

            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Reports</h3>
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
        )}

        {/* === BOOK APPOINTMENT TAB === */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Book New Appointment</h3>
            <form className="space-y-6" onSubmit={handleBookAppointment}>
              {/* Department & Doctor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor
                  </label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                       {"Dr."} {doc.first_name} {doc.last_name} - {doc.specialization}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit / Symptoms
                </label>
                <textarea
                  name="symptoms"
                  rows={4}
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Please describe your symptoms or reason for the visit..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>

              {message && (
                <p
                  className={`text-sm mt-2 ${
                    message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
