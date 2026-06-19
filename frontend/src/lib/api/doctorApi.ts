import type { Doctor } from "@/types/doctorType";
import api from "../axios";

export const applyDoctor = async (data: FormData) => {
  const res = await api.post("/doctor/apply", data);
  return res.data;
};

export const getAllDoctors = async (
  search?: string,
  filter?: string,
): Promise<Doctor[]> => {
  const res = await api.get("/doctor/all", { params: { search, filter } });
  return res.data.doctors;
};

export const getSingleDoctor = async (id: string): Promise<Doctor> => {
  const res = await api.get(`/doctor/${id}`);
  return res.data.doctor;
};

export const getAllSpecializations = async (): Promise<string[]> => {
  const res = await api.get("/doctor/specializations");
  return res.data.specializations;
};

export const getRelatedDoctors = async (
  id: string,
  specialization: string,
): Promise<Doctor[]> => {
  const res = await api.get(`/doctor/${id}/related`, {
    params: specialization,
  });
  return res.data.doctors;
};

export const getTopDoctors = async (limit = 4): Promise<Doctor[]> => {
  const res = await api.get("/doctor/top", { params: { limit } });
  return res.data.doctors;
};

export const getDoctorPatients = async (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  const res = await api.get("/doctor/patients", { params });
  return res.data;
};

export const getDoctorProfile = async () => {
  const res = await api.get("/doctor/profile");
  return res.data.doctor; 
};

export const updateDoctorProfile = async (data: FormData) => {
  const res = await api.post("/doctor/update", data, { 
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const toggleDoctorAvailability = async (availability: boolean) => {
  const res = await api.post("/doctor/available", { availability }); 
  return res.data;
};
