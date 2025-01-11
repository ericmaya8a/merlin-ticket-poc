"use client";

import { CalendarModal } from "@/components/CalendarModal/CalendarModal";
import { TicketModal } from "@/components/TicketsModal/TicketModal";
import { Ticket } from "@/components/TicketWidget/TicketWidget";
import { format } from "date-fns";
import { Calendar, Edit2, User } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function Actions() {
  const [ticketDate, setTicketDate] = useLocalStorage<Date>(
    "ticket-date",
    new Date(),
  );
  const [ticketData, setTicketData] = useLocalStorage<Ticket>("ticket-desc", {
    totalAdults: 0,
    totalKids: 0,
    options: [
      { id: "A", text: "Adult (Age 17+)", count: 0 },
      { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
      { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
      { id: "T", text: "Toddlers (Under 2)", count: 0 },
    ],
  });
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
        ticketData={ticketData}
        setTicketData={setTicketData}
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
