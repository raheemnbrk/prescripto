import api from "../axios";

export const applyDoctor = async (data: FormData) => {
  const res = await api.post("/doctor/apply", data);
  return res.data;
};

export const getAllDoctors = async (search?: string, filter?: string) => {
  const res = await api.get("/doctor/all", { params: { search, filter } });
  return res.data;
};

export const getSingleDoctor = async (id: string) => {
  const res = await api.get(`/doctor/${id}`);
  return res.data;
};
