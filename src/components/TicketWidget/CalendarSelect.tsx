import { TicketCalendar } from "@/components/TicketCalendar/TicketCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface CalendarSelectProps {
  ticketDate: string;
  calendarDate?: Date;
  onSelect: (date?: Date) => void;
}

export function CalendarSelect({
  ticketDate,
  calendarDate,
  onSelect,
}: CalendarSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <p className="text-xs">Date of visit</p>
          <p className="font-bold">{ticketDate}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <TicketCalendar
          date={
            calendarDate
              ? new Date(Date.parse(calendarDate.toString()))
              : undefined
          }
          onSelect={onSelect}
          setIsOpen={setIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
