import { Calendar } from "@/components/ui/calendar";

interface TicketCalendarProps {
  date?: Date;
  onSelect: (date?: Date) => void;
}

export function TicketCalendar({ date, onSelect }: TicketCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(date) => onSelect(date)}
    />
  );
}
