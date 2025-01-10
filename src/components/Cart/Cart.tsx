"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function Cart() {
  const [ticketDate] = useLocalStorage<Date>("ticket-date", new Date());

  return (
    <Card className="w-[306px]">
      <CardHeader>
        <CardTitle>Your visit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between bg-[#F2F2F3] px-2">
          <Calendar className="text-[#A1A3AA]" />{" "}
          <span className="text-sm text-[#1E274A]">
            {format(ticketDate, "E dd LLL yyyy")}
          </span>{" "}
          <Button className="text-[#E52330] hover:no-underline" variant="link">
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
