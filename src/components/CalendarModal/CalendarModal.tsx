"use client";

import { TicketCalendar } from "@/components/TicketCalendar/TicketCalendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

interface CalendarModalProps {
  calendarDate?: Date;
  trigger: ReactNode;
  onSelect: (date?: Date) => void;
}

export function CalendarModal({
  calendarDate,
  trigger,
  onSelect,
}: CalendarModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-auto">
        <DialogTitle>Date of visit?</DialogTitle>
        <TicketCalendar
          date={
            calendarDate
              ? new Date(Date.parse(calendarDate.toString()))
              : undefined
          }
          onSelect={onSelect}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
