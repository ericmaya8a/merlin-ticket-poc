"use client";

import { AgeOptions } from "@/components/AgeSelector/AgeOptions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";

interface TicketSelectProps {
  ticketData: TicketType;
  setTicketData: Dispatch<SetStateAction<TicketType>>;
  totalAdults: number;
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
}

export function TicketSelect({
  ticketData,
  setTicketData,
  totalAdults,
  setTotalAdults,
  setTotalKids,
}: TicketSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <p className="text-xs">Adults (17+)</p>
          <p className="font-bold text-[#A1A3AA]">{totalAdults || "Select"}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <AgeOptions
          ticketData={ticketData}
          setTicketData={setTicketData}
          setTotalAdults={setTotalAdults}
          setTotalKids={setTotalKids}
          setIsOpen={setIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
