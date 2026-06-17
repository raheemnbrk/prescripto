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

export const getDoctorAppointments = async (params: {
  search?: string;
  date?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get("/appointments/doctor/all", { params });
  return res.data;
};

export const doctorCancelAppointments = async (id: string) => {
  const res = await api.post(`/appointments/doctor/cancel/${id}`);
  return res.data;
};

export const doctorConfirmAppointments = async (id: string) => {
  const res = await api.post(`/appointments/doctor/confirm/${id}`);
  return res.data;
};

export const doctorCompleteAppointments = async (id: string) => {
  const res = await api.post(`/appointments/doctor/complete/${id}`);
  return res.data;
};
