export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor' | 'staff' | 'admin';
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
}

export interface Patient extends User {
  role: 'patient';
  date_of_birth?: string;
  gender?: string;
  address?: string;
  emergency_contact?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  department_id: string;
  specialization: string;
  license_number: string;
  years_experience?: number;
}

export interface Staff extends User {
  role: 'staff';
  employee_id: string;
  department?: string;
}

export interface Admin extends User {
  role: 'admin';
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  head_doctor_id?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  department_id: string;
  appointment_date: string;
  appointment_time: string;
  illness_description: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface MedicalReport {
  id: string;
  patient_id: string;
  doctor_id?: string;
  report_type: string;
  file_url: string;
  file_name: string;
  description?: string;
  upload_date: string;
}

export interface TestRegistration {
  id: string;
  patient_id: string;
  doctor_id: string;
  staff_id: string;
  test_type: string;
  test_date: string;
  status: 'registered' | 'completed' | 'cancelled';
  amount: number;
  payment_status: 'pending' | 'paid' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  test_registration_id: string;
  patient_id: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: 'completed' | 'refunded';
  transaction_id?: string;
}

export interface DashboardStats {
  total_patients: number;
  total_doctors: number;
  total_staff: number;
  total_appointments: number;
  pending_appointments: number;
  completed_appointments: number;
  total_reports: number;
  total_tests: number;
  total_revenue: number;
}