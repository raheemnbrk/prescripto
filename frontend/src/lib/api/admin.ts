import axios from "axios";

export const getAllDoctors = async ({
  page,
  status,
  search,
}: {
  page: number;
  status: string;
  search: string;
}) => {
  const res = await axios.get("/admin/all-doctors", {
    params: {
      page,
      search: search || undefined,
      status: status || undefined,
    },
  });

  return res.data;
};
