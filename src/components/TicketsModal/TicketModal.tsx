"use client";

import { AgeOptions } from "@/components/AgeSelector/AgeOptions";
import { Ticket } from "@/components/TicketWidget/TicketWidget";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface TicketModalProps {
  ticketData: Ticket;
  trigger: ReactNode;
  setTicketData: Dispatch<SetStateAction<Ticket>>;
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
}

export function TicketModal({
  ticketData,
  trigger,
  setTicketData,
  setTotalAdults,
  setTotalKids,
}: TicketModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-auto">
        <DialogTitle>Who is coming?</DialogTitle>
        <AgeOptions
          ticketData={ticketData}
          setTicketData={setTicketData}
          setTotalAdults={setTotalAdults}
          setTotalKids={setTotalKids}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
