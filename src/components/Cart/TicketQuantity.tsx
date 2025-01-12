"use client";

import { initialStates } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Tag, Trash2 } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { TicketQuantityCounter } from "./TicketQuantityCounter";

export function TicketQuantity() {
  const [basket, setBasket] = useLocalStorage<BasketType>(
    "basket",
    initialStates.basket,
  );

  function handleDeleteTickets() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      newBasket.tickets = initialStates.basket.tickets;
      return newBasket;
    });
  }

  if (basket.tickets.count > 0)
    return (
      <>
        <div className="flex items-center justify-between">
          <TicketQuantityCounter />
          <div className="cursor-pointer">
            <Trash2
              className="h-4 w-4 text-red-600"
              onClick={handleDeleteTickets}
            />
          </div>
          <div>
            <span className="line-through">
              {formatCurrency(basket.tickets.subtotal + basket.tickets.savings)}
            </span>
            <strong>{formatCurrency(basket.tickets.subtotal)}</strong>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div></div>
          <div className="flex gap-2 bg-[#F79E1B33]/20 p-1 text-xs font-bold text-[#BF6F14]">
            <Tag className="h-4 w-4" />
            <span>{formatCurrency(basket.tickets.savings)} savings</span>
          </div>
        </div>
      </>
    );

  return null;
}
