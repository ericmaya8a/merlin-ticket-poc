"use client";

import { Ticket } from "lucide-react";
import { useSessionStorage } from "usehooks-ts";

export default function TicketPass() {
  const [dayPrice] = useSessionStorage<1 | 2>("ticket-pass", 1);

  return (
    <div className="flex items-center gap-2">
      <Ticket className="h-4 w-4 text-green-900" />
      <strong>{dayPrice} Day General</strong>
    </div>
  );
}
