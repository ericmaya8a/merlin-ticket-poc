"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { InfoModal } from "./InfoModal";

export function TicketCard() {
  const [dayPrice, setDayPrice] = useState<"one day" | "two day">("one day");
  const isOneDayTicket = dayPrice === "one day";
  const header = isOneDayTicket ? "1 day ticket" : "2 day ticket";

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <span>Show price for</span>
        <div className="cursor-pointer">
          <span
            className={cn(
              "rounded-l-md border border-red-600 p-2 font-bold",
              isOneDayTicket
                ? "bg-red-600 text-white"
                : "bg-white text-red-600",
            )}
            onClick={() => setDayPrice("one day")}
          >
            1 day
          </span>
          <span
            className={cn(
              "rounded-r-md border border-red-600 p-2 font-bold",
              !isOneDayTicket
                ? "bg-red-600 text-white"
                : "bg-white text-red-600",
            )}
            onClick={() => setDayPrice("two day")}
          >
            2 day
          </span>
        </div>
      </div>

      <Card className="">
        <div className="flex">
          <div className="grow border-r border-slate-300">
            <div className="flex flex-col gap-4 p-4">
              <p className="text-2xl">{header}</p>
              <InfoModal header={header} />
            </div>
            <div className="flex">
              <div className="w-1/2 border-t border-slate-300 p-4">
                Gate price:{" "}
                <strong className="line-through">
                  {dayPrice == "one day" ? "£66.00" : "£80.00"}
                </strong>
              </div>
              <div className="w-1/2 border-l border-t border-slate-300 p-4">
                Online price:{" "}
                <strong>{isOneDayTicket ? "£29.00" : "£50.00"}</strong>
              </div>
            </div>
          </div>

          <div className="flex grow flex-col items-center justify-center gap-4 p-8">
            <Button className="w-full font-bold" variant="destructive">
              Add to basket
            </Button>
            <p>
              Total price:
              <span className="line-through">
                {isOneDayTicket ? "£200.00" : "£400.00"}
              </span>
              <strong>{isOneDayTicket ? "£160.00" : "£250.00"}</strong>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
