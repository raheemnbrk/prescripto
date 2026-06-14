import { useBookAppointment } from "@/hooks/useAppointment";
import { FiClock, FiCheckCircle, FiCalendar } from "react-icons/fi";
import { BsCalendar2Week } from "react-icons/bs";

interface Props {
  docId: string;
  available: boolean;
}

export default function BookAppointment({ docId, available }: Props) {
  const { selectedSlot, setSelectedSlot, slotDays, handleBook, isPending } =
    useBookAppointment(docId);

  const today = new Date().toDateString();

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-indigo-100">
          <BsCalendar2Week className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Book an Appointment
          </h2>
          <p className="text-sm text-gray-400">
            Choose an available date and time slot
          </p>
        </div>
      </div>

      {!available ? (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-4 rounded-2xl text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          This doctor is currently unavailable for bookings.
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-8">
          <div>
            {slotDays.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                <FiCalendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  No available slots this week.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {slotDays.map(({ date, slots }) => {
                  const isToday = date.toDateString() === today;
                  const isSelectedDay =
                    selectedSlot && slots.some((s) => s === selectedSlot);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`rounded-2xl border transition-all ${
                        isSelectedDay
                          ? "border-indigo-300 bg-indigo-50/50"
                          : "border-gray-100 bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                        <div
                          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${
                            isToday
                              ? "bg-indigo-500 text-white"
                              : "bg-white border border-gray-200 text-gray-500"
                          }`}
                        >
                          {isToday
                            ? "Today"
                            : date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                        <span className="ml-auto text-xs text-gray-400">
                          {slots.length} slots
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 px-4 pb-4">
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                              selectedSlot === slot
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm scale-105"
                                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
                            }`}
                          >
                            <FiClock className="w-3 h-3 shrink-0" />
                            {new Date(slot).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-6 bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-4">Summary</h3>

              {selectedSlot ? (
                <>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-indigo-100 shadow-sm">
                    <FiCheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Slot Selected
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(selectedSlot).toLocaleDateString("en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                      <p className="text-sm font-bold text-indigo-600 mt-1">
                        {new Date(selectedSlot).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={isPending}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="w-full mt-2 text-xs text-gray-400 py-2 transition-colors cursor-pointer hover:text-red-600"
                  >
                    Clear selection
                  </button>
                </>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <FiCalendar className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">
                    Select a time slot to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
