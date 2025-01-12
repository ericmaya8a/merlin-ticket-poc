"use client";

import { Counter } from "@/components/Counter/Counter";
import { Button } from "@/components/ui/button";
import { constants, initialStates } from "@/lib/constants";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface ageOptionsProps {
  ticketData: TicketType;
  setTicketData: Dispatch<SetStateAction<TicketType>>;
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AgeOptions({
  ticketData,
  setTicketData,
  setTotalAdults,
  setTotalKids,
  setIsOpen,
}: ageOptionsProps) {
  const [options, setOptions] = useState<AgeOptionType[]>([
    { id: "A", text: "Adult (Age 17+)", count: 0 },
    { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
    { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
    { id: "T", text: "Toddlers (Under 2)", count: 0 },
  ]);
  const [basket, setBasket] = useLocalStorage<BasketType>(
    "basket",
    initialStates.basket,
  );

  function handleChange(id: AgeOptionType["id"], val: number) {
    setOptions((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === id);
      newState[index].count = val;
      return newState;
    });
  }

  function getTotalAdults() {
    return options.filter(({ id }) => id === "A")[0].count;
  }

  function getTotalKids() {
    return options
      .filter(({ id }) => id !== "A")
      .reduce((sum, item) => sum + item.count, 0);
  }

  function handleApply() {
    const tickets: TicketType = {
      totalAdults: getTotalAdults(),
      totalKids: getTotalKids(),
      options,
    };
    setTicketData(tickets);
    setIsOpen(false);
    if (basket.tickets.count > 0) {
      setBasket((prevBasket) => {
        const newBasket = { ...prevBasket };
        const count = tickets.totalAdults + tickets.totalKids;
        const gateSubtotal = count * constants.tickets.GATE_PRICE;
        const subtotal = count * constants.tickets.ONLINE_PRICE;
        const savings = gateSubtotal - subtotal;

        newBasket.tickets = {
          count,
          subtotal,
          savings,
        };
        return newBasket;
      });
    }
  }

  useEffect(() => {
    setTotalAdults(getTotalAdults());
    setTotalKids(getTotalKids());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div>
      {ticketData.options.map(({ id, text, count }) => (
        <div key={id} className="flex items-center justify-between px-1 py-2">
          <span className="text-sm">{text}</span>
          <Counter count={count} onChange={(val) => handleChange(id, val)} />
        </div>
      ))}
      <Button
        className="mt-4 w-full font-bold"
        variant="destructive"
        onClick={handleApply}
      >
        Apply
      </Button>
    </div>
  );
}
