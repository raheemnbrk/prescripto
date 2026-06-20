import type { User } from "./authTypes";

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface statsRes {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  pendingDoctors: number;
}
