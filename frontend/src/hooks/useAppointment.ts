import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { generateSlots } from "@/utils/generateSlot";
import {
  bookAppointment,
  cancelAppointment,
  getPatientAppointments,
} from "@/lib/api/appointmentsApi";

export const useBookAppointment = (docId: string) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const slotDays = generateSlots();

  const { mutate: book, isPending } = useMutation({
    mutationFn: (date: string) => bookAppointment(docId, date),
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      setSelectedSlot(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });

  const handleBook = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    book(selectedSlot);
  };

  return {
    selectedSlot,
    setSelectedSlot,
    slotDays,
    handleBook,
    isPending,
  };
};

export const usePatientAppointments = () =>
  useQuery({
    queryKey: ["patient-appointments"],
    queryFn: getPatientAppointments,
  });

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelAppointment(id),

    onSuccess: () => {
      toast.success("Appointment cancelled.");

      queryClient.invalidateQueries({
        queryKey: ["patient-appointments"],
      });
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    },
  });
};
