"use client";

import { initialStates } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Tag } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export default function VisitTotal() {
  const [basket] = useLocalStorage<BasketType>("basket", initialStates.basket);

  if (basket.tickets.count)
    return (
      <div className="w-full border-t border-t-slate-300 p-6">
        <div className="space-y-2">
          <div className="flex justify-between font-bold">
            <span>Subtotal</span>
            <span>{formatCurrency(basket.tickets.subtotal)}</span>
          </div>
          <div className="flex justify-between bg-[#F79E1B33]/20 p-1 font-bold text-[#BF6F14]">
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Savings
            </span>
            <span>{formatCurrency(basket.tickets.savings)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>VAT</span>
            <span>{formatCurrency(32)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>{formatCurrency(basket.tickets.subtotal)}</span>
          </div>
        </div>
      </div>
    );

  return null;
}
