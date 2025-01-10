"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CalendarSelect } from "./CalendarSelect";
import { TicketSelect } from "./TicketSelect";

export function TicketWidget() {
  const [ticketDate, setTicketDate] = useLocalStorage<Date>(
    "ticket-date",
    new Date(),
  );
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalKids, setTotalKids] = useState(0);

  function handleSelectedDate(val?: Date) {
    if (val) {
      setTicketDate(val);
    }
  }

  return (
    <div className="mx-auto w-2/3 p-4">
      <div className="flex">
        <div className="grow-[5] cursor-pointer rounded-l-lg bg-white p-2 text-[#1E274A]">
          <CalendarSelect
            ticketDate={format(ticketDate, "P")}
            calendarDate={ticketDate}
            onSelect={handleSelectedDate}
          />
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Days</p>
          <p className="font-bold">1</p>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <TicketSelect
            totalAdults={totalAdults}
            setTotalAdults={setTotalAdults}
            setTotalKids={setTotalKids}
          />
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Kids (2-16)</p>
          <p className="font-bold text-[#A1A3AA]">{totalKids || "Select"}</p>
        </div>
        <div className="flex grow-[2] items-center justify-center rounded-r-lg bg-[#E52330] p-2">
          <Button className="hover:no-underline" variant="link">
            <Link className="font-bold text-white" href="/tickets">
              Get tickets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
