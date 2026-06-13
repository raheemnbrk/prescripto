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
