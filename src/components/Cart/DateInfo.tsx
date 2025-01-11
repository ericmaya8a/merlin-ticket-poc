"use client";

import { CalendarModal } from "@/components/CalendarModal/CalendarModal";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function DateInfo() {
  const [ticketDate, setTicketDate] = useLocalStorage<Date>(
    "ticket-date",
    new Date(),
  );

  function handleSelectedDate(val?: Date) {
    if (val) {
      setTicketDate(val);
    }
  }

  return (
    <div className="flex items-center justify-between bg-[#F2F2F3] px-2">
      <Calendar className="text-[#A1A3AA]" />{" "}
      <span className="text-sm text-[#1E274A]">
        {format(ticketDate, "E dd LLL yyyy")}
      </span>
      <CalendarModal
        calendarDate={ticketDate}
        onSelect={handleSelectedDate}
        trigger={
          <Button className="text-[#E52330] hover:no-underline" variant="link">
            Change
          </Button>
        }
      />
    </div>
  );
}
