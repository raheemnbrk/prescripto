import api from "../axios";

export const bookAppointment = async (docId: string, date: string) => {
  const res = await api.post(`/appointments/book/${docId}`, { date });
  return res.data;
};
