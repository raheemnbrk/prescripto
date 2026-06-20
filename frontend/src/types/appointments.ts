export interface Appointment {
  id: string;
  userId: string;
  docId: string;
  date: string;
  fees: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  doctorName: string;
  doctorImage: string;
  specialization: string;
  patientName: string;
  patientImage: string;
}

export interface appointmentRes {
  appointments: Appointment[];
  total: number;
  page: number;
  totalPages: number;
}

export interface AppointmentFilters {
  search?: string;
  searchBy?: "doctor" | "user";
  status?: string;
  date?: string;
  range?: "last7days" | "last30days" | "last12months" | "all";
  page?: number;
  limit?: number;
}
