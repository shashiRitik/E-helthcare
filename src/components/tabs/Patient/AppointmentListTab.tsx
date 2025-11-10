import { useEffect, useState } from "react";

import { Calendar, Clock } from "lucide-react";
import api from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";


function AppointmentListTab() {

    const { user } = useAuth();

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

        const patientId = getPatientId();

    useEffect(() => {

        api.get(`/api/appointments/${patientId}`)
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error('Error fetching appointmets:', err));

    }, []);

 return (
  <div>
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">My Appointments</h3>

      <div className="space-y-6">
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg p-6 flex justify-between"
            >
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {appointment.doctorName}
                </h4>
                <p className="text-gray-600">{appointment.departmentName}</p>
                <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
                  <span>
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {appointment.date}
                  </span>
                  <span>
                    <Clock className="inline h-4 w-4 mr-1" />
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
          ))
        ) : (
          <p className="text-gray-600">You have no appointments scheduled.</p>
        )}
      </div>
    </div>
  </div>
);

}

export default AppointmentListTab
