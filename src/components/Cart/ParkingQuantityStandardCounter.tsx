"use client";

import { Button } from "@/components/ui/button";
import { constants, initialStates } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function ParkingQuantityStandardCounter() {
  const [basket, setBasket] = useLocalStorage<BasketType>(
    "basket",
    initialStates.basket,
  );

  function handleMinus() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      const count = prevBasket.parking.standard.count - 1;
      const subtotal = count * constants.parking.STANDARD_PARKING;
      newBasket.parking.standard = {
        count,
        subtotal,
      };
      return newBasket;
    });
  }

  function handleAdd() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      const count = prevBasket.parking.standard.count + 1;
      const subtotal = count * constants.parking.STANDARD_PARKING;
      newBasket.parking.standard = {
        count,
        subtotal,
      };
      return newBasket;
    });
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="destructive"
        disabled={basket.parking.standard.count <= 0}
        size="icon"
        onClick={handleMinus}
      >
        <Minus />
      </Button>
      <span className="font-bold">{basket.parking.standard.count}</span>
      <Button variant="destructive" size="icon" onClick={handleAdd}>
        <Plus />
      </Button>
    </div>
  );
}
