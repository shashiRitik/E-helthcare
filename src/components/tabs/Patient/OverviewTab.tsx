import { Calendar, Clock, Download, Eye, FileText } from 'lucide-react'
import { useEffect, useState } from 'react';
import api from '../../../services/api';


function OverviewTab() {

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

  const [tests, setTests] = useState<Array<{
    id: string;
    patient: string;
    testType: string;
    prescribedBy: string;
    date: string;
    amount: string;
    notes: string;
    amountStatus: string;
  }>>([]);

  // ✅ Fetch doctors & departments
  useEffect(() => {

    api.get('/api/appointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching appointmets:', err));


    api.get('/tests')
      .then((res) => setTests(res.data))
      .catch((err) => console.error('Error fetching tests:', err));

  }, []);


  return (
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
                {tests.length}
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

            {Array.isArray(appointments) && appointments.length > 0 ? (
              appointments.map((appointment) => (
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
              ))
            ) : (
              <p className="text-gray-600">You have no upcoming appointments.</p>
            )}


          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
          </div>
          <div className="p-6 space-y-4">
            {tests.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{report.testType}</p>
                  <p className="text-sm text-gray-500">{report.testType}</p>
                  <p className="text-sm text-gray-500">By {report.prescribedBy}</p>
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
  )
}

export default OverviewTab
