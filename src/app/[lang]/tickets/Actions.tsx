"use client";

import { CalendarModal } from "@/components/CalendarModal/CalendarModal";
import { TicketModal } from "@/components/TicketsModal/TicketModal";
import { initialStates } from "@/lib/constants";
import { format } from "date-fns";
import { Calendar, Edit2, User } from "lucide-react";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";

export function Actions() {
  const [ticketDate, setTicketDate] = useSessionStorage<Date>(
    "ticket-date",
    new Date(),
  );
  const [ticketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );
  const [, setTotalAdults] = useState(ticketData.totalAdults);
  const [, setTotalKids] = useState(ticketData.totalKids);

  function handleSelectedDate(val?: Date) {
    if (val) {
      setTicketDate(val);
    }
  }

  return (
    <div className="flex">
      <CalendarModal
        calendarDate={ticketDate}
        onSelect={handleSelectedDate}
        trigger={
          <div className="flex cursor-pointer items-center gap-2 rounded-l-md border border-black p-2">
            <Calendar className="h-4 w-4" />
            <span>{format(ticketDate, "P")}</span>{" "}
            <Edit2 className="h-4 w-4 text-red-600" />
          </div>
        }
      />
      <TicketModal
        setTotalAdults={setTotalAdults}
        setTotalKids={setTotalKids}
        trigger={
          <div className="flex cursor-pointer items-center gap-2 rounded-r-md border border-l-0 border-black p-2">
            <User className="h-4 w-4" />{" "}
            <span>{ticketData.totalAdults + ticketData.totalKids}</span>{" "}
            <Edit2 className="h-4 w-4 text-red-600" />
          </div>
        }
      />
    </div>
  );
}
