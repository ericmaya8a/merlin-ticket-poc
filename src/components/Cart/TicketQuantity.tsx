"use client";

import { Counter } from "@/components/Counter/Counter";
import { formatCurrency } from "@/lib/utils";
import { Tag } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function TicketQuantity() {
  const [basket] = useLocalStorage<BasketType>("basket", {
    tickets: {
      count: 0,
      subtotal: 0,
      savings: 0,
    },
  });

  if (basket.tickets.count > 0)
    return (
      <>
        <div className="flex items-center justify-between">
          <Counter
            count={basket.tickets.count}
            onChange={(value) => console.log(value)}
          />
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
