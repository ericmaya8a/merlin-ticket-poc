"use client";

import { Button } from "@/components/ui/button";
import { constants, initialStates } from "@/lib/constants";
import { Minus, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export function ParkingQuantityExpressCounter() {
  const [basket, setBasket] = useLocalStorage<BasketType>(
    "basket",
    initialStates.basket,
  );

  function handleMinus() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      const count = prevBasket.parking.express.count - 1;
      const subtotal = count * constants.parking.EXPRESS_PARKING;
      newBasket.parking.express = {
        count,
        subtotal,
      };
      return newBasket;
    });
  }

  function handleAdd() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      const count = prevBasket.parking.express.count + 1;
      const subtotal = count * constants.parking.EXPRESS_PARKING;
      newBasket.parking.express = {
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
        disabled={basket.parking.express.count <= 0}
        size="icon"
        onClick={handleMinus}
      >
        <Minus />
      </Button>
      <span className="font-bold">{basket.parking.express.count}</span>
      <Button variant="destructive" size="icon" onClick={handleAdd}>
        <Plus />
      </Button>
    </div>
  );
}
