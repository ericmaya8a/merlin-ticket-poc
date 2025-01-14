"use client";

import { AgeOptions } from "@/components/AgeSelector/AgeOptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface TicketModalProps {
  trigger: ReactNode;
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
}

export function TicketModal({
  trigger,
  setTotalAdults,
  setTotalKids,
}: TicketModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-auto">
        <DialogTitle>Who is coming?</DialogTitle>
        <DialogDescription className="sr-only">
          Who is coming?
        </DialogDescription>
        <AgeOptions
          setTotalAdults={setTotalAdults}
          setTotalKids={setTotalKids}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
