"use client";

import { Counter } from "@/components/Counter/Counter";
import { constants, initialStates } from "@/lib/constants";
import { useSessionStorage } from "usehooks-ts";

export function ParkingQuantityStandardCounter() {
  const [basket, setBasket] = useSessionStorage<BasketType>(
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
    <Counter
      count={basket.parking.standard.count}
      isMinusDisabled={basket.parking.standard.count <= 0}
      onAdd={handleAdd}
      onMinus={handleMinus}
      isCritical
    />
  );
}
