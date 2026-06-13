import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiX,
  FiSliders,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import { useSpecializations } from "@/hooks/useDoctor";
import { useDoctorFilters } from "@/hooks/useDoctorFilters";

export default function Filter() {
  const { search, specialization, setSearch, setSpecialization, resetFilters } =
    useDoctorFilters();
  const { data: specializations } = useSpecializations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSpecialization({
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>);
    setOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-8">
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={search}
          onChange={setSearch}
          type="text"
          placeholder="Search by doctor name..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative md:w-56" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:bg-indigo-50 focus:border-indigo-200 transition-all text-gray-700 cursor-pointer"
          >
            <FiSliders className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <span className="truncate">
              {specialization || "All Specialties"}
            </span>
            <FiChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden py-2 max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleSelect("")}
                className={`w-full flex items-center justify-between cursor-pointer px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors ${
                  !specialization
                    ? "text-primary font-medium"
                    : "text-gray-700"
                }`}
              >
                All Specialties
                {!specialization && <FiCheck className="w-4 h-4" />}
              </button>

              {specializations?.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSelect(s)}
                  className={`w-full flex items-center cursor-pointer justify-between px-4 py-2.5 text-left hover:bg-indigo-50 transition-colors ${
                    specialization === s
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {s}
                  {specialization === s && <FiCheck className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {(search || specialization) && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl text-gray-600 hover:text-gray-800 transition-all font-medium whitespace-nowrap cursor-pointer"
          >
            <FiX className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
