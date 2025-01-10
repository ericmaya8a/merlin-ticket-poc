"use client";

import { AgeOptions } from "@/components/AgeSelector/AgeOptions";
import { SimplePopover } from "@/components/SimplePopover/SimplePopover";
import { TicketCalendar } from "@/components/TicketCalendar/TicketCalendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

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
          <SimplePopover
            trigger={
              <div>
                <p className="text-xs">Date of visit</p>
                <p className="font-bold">{format(ticketDate, "P")}</p>
              </div>
            }
            content={
              <TicketCalendar
                date={
                  ticketDate
                    ? new Date(Date.parse(ticketDate.toString()))
                    : undefined
                }
                onSelect={handleSelectedDate}
              />
            }
          />
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Days</p>
          <p className="font-bold">1</p>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <SimplePopover
            trigger={
              <div>
                <p className="text-xs">Adults (17+)</p>
                <p className="font-bold text-[#A1A3AA]">
                  {totalAdults || "Select"}
                </p>
              </div>
            }
            content={
              <AgeOptions
                setTotalAdults={setTotalAdults}
                setTotalKids={setTotalKids}
              />
            }
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
