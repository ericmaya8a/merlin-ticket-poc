"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AgeOptions } from "@/components/AgeSelector/AgeOptions";
import { Dispatch, SetStateAction, useState } from "react";

interface TicketSelectProps {
  totalAdults: number;
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
}

export function TicketSelect({
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
          setTotalAdults={setTotalAdults}
          setTotalKids={setTotalKids}
          setIsOpen={setIsOpen}
        />
      </PopoverContent>
    </Popover>
  );
}
