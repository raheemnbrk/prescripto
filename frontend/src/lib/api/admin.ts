import type { AppointmentFilters } from "@/types/appointments";
import api from "../axios";

export const getAllDoctors = async ({
  page,
  status,
  search,
}: {
  page: number;
  status: string;
  search: string;
}) => {
  const res = await api.get("/admin/all-doctors", {
    params: {
      page,
      search: search || undefined,
      status: status || undefined,
    },
  });

  return res.data;
};

export const approveDoctor = async (id: string) => {
  const res = await api.post(`/admin/approve/${id}`);
  return res.data;
};

export const rejectDoctor = async (id: string) => {
  const res = await api.post(`/admin/reject/${id}`);
  return res.data;
};

export const getALlUsers = async ({
  search,
  limit,
  page,
}: {
  search?: string;
  limit: number;
  page: number;
}) => {
  const res = await api.get("/admin/all-users", {
    params: { search: search || undefined, limit, page },
  });
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/admin/delete/${id}`);
  return res.data;
};

export const getAllAppointments = async (filters: AppointmentFilters) => {
  const res = await api.get("/appointments/admin/all", { params: filters });
  return res.data;
};
