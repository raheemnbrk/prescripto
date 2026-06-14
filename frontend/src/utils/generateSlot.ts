export interface SlotDay {
  date: Date;
  slots: string[];
}

export function generateSlots(): SlotDay[] {
  const days: SlotDay[] = [];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(now.getDate() + i);

    const day = date.getDay();
    if (day === 5) continue; 

    const slots: string[] = [];

    for (let hour = 9; hour <= 17; hour++) {
      for (const minute of [0, 30]) {
        if (hour === 17 && minute === 30) continue;

        const slot = new Date(date);
        slot.setHours(hour, minute, 0, 0);

        if (i === 0 && slot.getTime() < now.getTime() + 2 * 60 * 60 * 1000) continue;

        slots.push(slot.toISOString());
      }
    }

    if (slots.length > 0) days.push({ date, slots });
  }

  return days;
}