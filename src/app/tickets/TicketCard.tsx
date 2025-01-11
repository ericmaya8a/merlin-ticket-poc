"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { InfoModal } from "./InfoModal";
import { constants } from "@/lib/constants";
import { Counter } from "@/components/Counter/Counter";

export function TicketCard() {
  const [basket, setBasket] = useLocalStorage<BasketType>("basket", {
    tickets: {
      count: 0,
      subtotal: 0,
      savings: 0,
    },
  });
  const [ticketData] = useLocalStorage<TicketType>("ticket-desc", {
    totalAdults: 0,
    totalKids: 0,
    options: [
      { id: "A", text: "Adult (Age 17+)", count: 0 },
      { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
      { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
      { id: "T", text: "Toddlers (Under 2)", count: 0 },
    ],
  });
  const [dayPrice, setDayPrice] = useLocalStorage<1 | 2>("ticket-pass", 1);
  const isOneDayTicket = dayPrice === 1;
  const header = isOneDayTicket ? "1 day ticket" : "2 day ticket";
  const totalSelectedTickets = ticketData.totalAdults + ticketData.totalKids;
  const gateSubtotal =
    totalSelectedTickets * constants.tickets.GATE_PRICE * dayPrice;
  const onlineSubtotal =
    totalSelectedTickets * constants.tickets.ONLINE_PRICE * dayPrice;
  const savings = gateSubtotal - onlineSubtotal;

  function handleAddToBasket() {
    setBasket((prevValues) => {
      const newValues = { ...prevValues };
      newValues.tickets = {
        count: totalSelectedTickets,
        subtotal: onlineSubtotal,
        savings,
      };
      return newValues;
    });
  }

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
            onClick={() => setDayPrice(1)}
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
            onClick={() => setDayPrice(2)}
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
                  {dayPrice == 1
                    ? formatCurrency(constants.tickets.GATE_PRICE)
                    : formatCurrency(constants.tickets.GATE_PRICE * dayPrice)}
                </strong>
              </div>
              <div className="w-1/2 border-l border-t border-slate-300 p-4">
                Online price:{" "}
                <strong>
                  {isOneDayTicket
                    ? formatCurrency(constants.tickets.ONLINE_PRICE)
                    : formatCurrency(constants.tickets.ONLINE_PRICE * dayPrice)}
                </strong>
              </div>
            </div>
          </div>

          <div className="flex grow flex-col items-center justify-center gap-4 p-8">
            {basket.tickets.count > 0 ? (
              <Counter
                count={totalSelectedTickets}
                onChange={(value) => console.log(value)}
              />
            ) : (
              <Button
                className="w-full font-bold"
                variant="destructive"
                onClick={handleAddToBasket}
              >
                Add to basket
              </Button>
            )}
            <p>
              Total price:
              <span className="line-through">
                {formatCurrency(gateSubtotal)}
              </span>
              <strong>{formatCurrency(onlineSubtotal)}</strong>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
