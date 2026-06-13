import { useSearchParams } from "react-router-dom";

export function useDoctorFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const specialization = searchParams.get("specialization") ?? "";

  const setSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) params.set("search", value);
      else params.delete("search");

      return params;
    });
  };

  const setSpecialization = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) params.set("specialization", value);
      else params.delete("specialization");

      return params;
    });
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  return {
    search,
    specialization,
    setSearch,
    setSpecialization,
    resetFilters,
  };
}
