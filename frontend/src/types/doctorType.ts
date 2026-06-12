import type { User } from "./authTypes";

export interface Doctor extends Omit<User, "image"> {
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

