"use client";

import { Button } from "@/components/ui/button";
import { constants, initialStates } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function TicketQuantityCounter() {
  const [basket, setBasket] = useLocalStorage<BasketType>(
    "basket",
    initialStates.basket,
  );
  const [, setTicketData] = useLocalStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );

  function handleAdd() {
    setTicketData((prevData) => {
      const newData = { ...prevData };
      newData.totalAdults = prevData.totalAdults + 1;
      newData.options[0].count = prevData.options[0].count + 1;

      setBasket((prevBasket) => {
        const newBasket = { ...prevBasket };
        const count = newData.totalAdults + newData.totalKids;
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

      return newData;
    });
  }

  function handleMinus() {
    if (basket.tickets.count > 1) {
      setTicketData((prevData) => {
        const newData = { ...prevData };
        const maxContElement = newData.options.reduce((max, current) =>
          current.count > max.count ? current : max,
        );
        const index = newData.options.findIndex(
          (item) => item.id === maxContElement.id,
        );
        newData.options[index].count -= 1;
        if (maxContElement.id === "A") {
          newData.totalAdults = prevData.totalAdults - 1;
        } else {
          newData.totalKids = prevData.totalKids - 1;
        }

        setBasket((prevBasket) => {
          const newBasket = { ...prevBasket };
          const count = newData.totalAdults + newData.totalKids;
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

        return newData;
      });
    }
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="destructive"
        disabled={basket.tickets.count <= 0}
        size="icon"
        onClick={handleMinus}
      >
        <Minus />
      </Button>
      <span className="font-bold">{basket.tickets.count}</span>
      <Button variant="destructive" size="icon" onClick={handleAdd}>
        <Plus />
      </Button>
    </div>
  );
}
