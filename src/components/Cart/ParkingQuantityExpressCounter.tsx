"use client";

import { Counter } from "@/components/Counter/Counter";
import { constants, initialStates } from "@/lib/constants";
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
    <Counter
      count={basket.parking.express.count}
      isMinusDisabled={basket.parking.express.count <= 0}
      onAdd={handleAdd}
      onMinus={handleMinus}
      isCritical
    />
  );
}
