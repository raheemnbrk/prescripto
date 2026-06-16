import type { User } from "./authTypes";

export interface Doctor extends Omit<User, "id" | "image"> {
  userId: string;
  image: string;
  specialization: string;
  experience: number;
  fees: number;
  about: string;
  degree: string;
  address: string;
  available: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface doctorFilter {
  search: string;
  specialization: string;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  total: number;
  page: number;
  totalPages: number;
}
