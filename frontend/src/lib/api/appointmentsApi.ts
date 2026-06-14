import type { Appointment } from "@/types/appointments";
import api from "../axios";

export const bookAppointment = async (docId: string, date: string) => {
  const res = await api.post(`/appointments/book/${docId}`, { date });
  return res.data;
};

export const getPatientAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get(`/appointments/my-appointments`);
  return res.data.appointments;
};

export const cancelAppointment = async (id: string) => {
  const res = await api.post(`/appointments/cancel/${id}`);
  return res.data;
};
