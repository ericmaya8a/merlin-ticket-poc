"use client";

import { TicketQuantityCounter } from "@/components/Cart/TicketQuantityCounter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { constants, initialStates } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { useSessionStorage } from "usehooks-ts";
import { InfoModal } from "./InfoModal";

export function TicketCard() {
  const [basket, setBasket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket,
  );
  const [ticketData] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );
  const [dayPrice, setDayPrice] = useSessionStorage<1 | 2>("ticket-pass", 1);
  const isOneDayTicket = dayPrice === 1;
  const header = isOneDayTicket ? "1 day ticket" : "2 day ticket";
  const totalSelectedTickets = ticketData.totalAdults + ticketData.totalKids;
  const gateSubtotal =
    totalSelectedTickets * constants.tickets.GATE_PRICE * dayPrice;
  const onlineSubtotal =
    totalSelectedTickets * constants.tickets.ONLINE_PRICE * dayPrice;
  const savings = gateSubtotal - onlineSubtotal;

  function handleOneDay() {
    setDayPrice(1);
    if (basket.tickets.count > 0 && dayPrice === 2) {
      setBasket((prevBasket) => {
        const newBasket = { ...prevBasket };
        newBasket.tickets = {
          count: prevBasket.tickets.count,
          savings: prevBasket.tickets.savings / 2,
          subtotal: prevBasket.tickets.subtotal / 2,
        };
        return newBasket;
      });
    }
  }

  function handleTwoDay() {
    setDayPrice(2);
    if (basket.tickets.count > 0) {
      setBasket((prevBasket) => {
        const newBasket = { ...prevBasket };
        newBasket.tickets = {
          count: prevBasket.tickets.count,
          savings: prevBasket.tickets.savings * 2,
          subtotal: prevBasket.tickets.subtotal * 2,
        };
        return newBasket;
      });
    }
  }

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
            onClick={handleOneDay}
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
            onClick={handleTwoDay}
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
              <TicketQuantityCounter />
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
