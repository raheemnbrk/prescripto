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
