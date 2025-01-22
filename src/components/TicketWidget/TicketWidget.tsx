"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { initialStates } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { TicketSelect } from "./TicketSelect";
import TicketCalendar from "../TicketCalendar/TicketCalendar";

export function TicketWidget() {
  const [ticketDate, setTicketDate] = useSessionStorage<Date[]>(
    "ticket-date",
    [],
  );
  const [ticketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );
  const [dayPrice] = useSessionStorage<1 | 2>("ticket-pass", 1);
  const [totalAdults, setTotalAdults] = useState(ticketData.totalAdults);
  const [totalKids, setTotalKids] = useState(ticketData.totalKids);
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/calendarDay", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setCalendarData(data);
        }
      } catch (error) {
        console.error("Error fetching calendar data", error);
      }
    };

    fetchData();
  }, []);

  function handleSelectedDate(val?: Date | Date[]) {
    if (Array.isArray(val)) {
      setTicketDate(val);
    } else if (val instanceof Date) {
      setTicketDate([val]);
    }
  }

  return (
    <div className="mx-auto p-4 sm:w-2/3">
      <div className="flex flex-col sm:flex-row">
        <div className="flex grow">
          <div className="grow-[2] cursor-pointer rounded-tl-lg border border-b-0 border-r-0 border-[#144722] bg-white p-2 text-[#1E274A] sm:grow-[5] sm:rounded-l-lg sm:border-b-[1px]">
            <TicketCalendar
              selectedDates={ticketDate}
              calendarData={calendarData || {}}
              onFetchNext={async () => {}}
              loading={false}
              onApply={handleSelectedDate}
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
              disabled={totalAdults < 1}
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
