"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { initialStates } from "@/lib/constants";
import { format } from "date-fns";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { CalendarSelect } from "./CalendarSelect";
import { TicketSelect } from "./TicketSelect";

export function TicketWidget() {
  const [ticketDate, setTicketDate] = useSessionStorage<Date>(
    "ticket-date",
    new Date(),
  );
  const [ticketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );
  const [dayPrice] = useSessionStorage<1 | 2>("ticket-pass", 1);
  const [totalAdults, setTotalAdults] = useState(ticketData.totalAdults);
  const [totalKids, setTotalKids] = useState(ticketData.totalKids);

  function handleSelectedDate(val?: Date) {
    if (val) {
      setTicketDate(val);
    }
  }

  return (
    <div className="mx-auto p-4 sm:w-2/3">
      <div className="flex flex-col sm:flex-row">
        <div className="flex grow">
          <div className="grow-[2] cursor-pointer rounded-tl-lg border border-b-0 border-r-0 border-[#144722] bg-white p-2 text-[#1E274A] sm:grow-[5] sm:rounded-l-lg sm:border-b-[1px]">
            <CalendarSelect
              ticketDate={format(ticketDate, "P")}
              calendarDate={ticketDate}
              onSelect={handleSelectedDate}
            />
          </div>
          <div className="grow rounded-tr-lg border border-b-0 border-[#144722] bg-white p-2 text-[#1E274A] sm:rounded-none sm:border-b-[1px] sm:border-r-0">
            <p className="text-xs">Days</p>
            <p className="font-bold">{dayPrice}</p>
          </div>
        </div>

        <div className="flex">
          <div className="grow rounded-bl-lg border border-r-0 border-[#144722] bg-white p-2 text-[#1E274A] sm:rounded-none">
            <TicketSelect
              totalAdults={totalAdults}
              setTotalAdults={setTotalAdults}
              setTotalKids={setTotalKids}
            />
          </div>
          <div className="grow border border-r-0 border-[#144722] bg-white p-2 text-[#1E274A]">
            <p className="text-xs">Kids (2-16)</p>
            <p className="font-bold text-[#A1A3AA]">{totalKids || "Select"}</p>
          </div>
          <div className="flex grow-[2] items-center justify-center rounded-br-lg border border-[#144722] bg-[#E52330] p-2 sm:rounded-r-lg">
            <Button
              className="hover:no-underline"
              variant="link"
              disabled={ticketData.totalAdults < 1}
            >
              <Link className="font-bold text-white" href="/tickets">
                Get tickets
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
