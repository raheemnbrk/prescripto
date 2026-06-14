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
}
