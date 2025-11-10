import React, { useEffect, useState } from 'react'

import api from '../../../services/api.ts';
import { useAuth } from '../../../contexts/AuthContext.tsx';

function BookAppointmentsTab() {

    const [formData, setFormData] = React.useState({
        departmentId: '',
        doctorId: '',
        date: '',  // ✅ separate field
        time: '',
        symptoms: '',
    });
    const { user } = useAuth();
    const [departments, setDepartments] = useState<Array<{ id: string, name: string }>>([]);
    const [doctors, setDoctors] = useState<Array<
        { id: string, first_name: string, last_name: string, specialization: string }
    >>([]);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');


    useEffect(() => {
        api.get('/api/departments')
            .then((res) => setDepartments(res.data))
            .catch((err) => console.error('Error fetching departments:', err));

        api.get('/auth/doctors')
            .then((res) => setDoctors(res.data))
            .catch((err) => console.error('Error fetching doctors:', err));

    }, []);

    // ✅ Submit appointment
    const handleBookAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

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


    // ✅ Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
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
                        className={`text-sm mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {message}
                    </p>
                )}
            </form>

        </div>
    )
}

export default BookAppointmentsTab
