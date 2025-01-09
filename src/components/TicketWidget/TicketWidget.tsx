"use client";

import { TicketCalendar } from "@/components/TicketCalendar/TicketCalendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

export function TicketWidget() {
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
    <div className="mx-auto w-2/3 p-4">
      <div className="flex">
        <div className="grow-[5] cursor-pointer rounded-l-lg bg-white p-2 text-[#1E274A]">
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <p className="text-xs">Date of visit</p>
                <p className="font-bold">{format(ticketDate, "P")}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <TicketCalendar
                date={
                  ticketDate
                    ? new Date(Date.parse(ticketDate.toString()))
                    : undefined
                }
                onSelect={handleSelectedDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Days</p>
          <p className="font-bold">1</p>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Adults (17+)</p>
          <p className="font-bold text-[#A1A3AA]">Select</p>
        </div>
        <div className="grow border border-l-black bg-white p-2 text-[#1E274A]">
          <p className="text-xs">Kids (2-16)</p>
          <p className="font-bold text-[#A1A3AA]">Select</p>
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
