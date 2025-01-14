"use client";

import { initialStates } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Gauge, ParkingCircle, Trash2 } from "lucide-react";
import { useSessionStorage } from "usehooks-ts";
import { ParkingQuantityExpressCounter } from "./ParkingQuantityExpressCounter";
import { ParkingQuantityStandardCounter } from "./ParkingQuantityStandardCounter";

export function ParkingQuantity() {
  const [basket, setBasket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket,
  );

  function handleDeleteExpressParking() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      newBasket.parking.express = initialStates.basket.parking.express;
      return newBasket;
    });
  }

  function handleDeleteStandardParking() {
    setBasket((prevBasket) => {
      const newBasket = { ...prevBasket };
      newBasket.parking.standard = initialStates.basket.parking.standard;
      return newBasket;
    });
  }

  if (basket.parking.express.count > 0 || basket.parking.standard.count > 0)
    return (
      <>
        {basket.parking.express.count > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <strong className="flex items-center gap-2">
                <Gauge className="h-4 w-4" /> Express parking
              </strong>
              <strong>{formatCurrency(basket.parking.express.subtotal)}</strong>
            </div>
            <div className="flex items-center gap-2">
              <ParkingQuantityExpressCounter />
              <div className="cursor-pointer">
                <Trash2
                  className="h-4 w-4 text-red-600"
                  onClick={handleDeleteExpressParking}
                />
              </div>
            </div>
          </>
        ) : null}

        {basket.parking.standard.count > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <strong className="flex items-center gap-2">
                <ParkingCircle className="h-4 w-4" /> Standard parking
              </strong>
              <strong>
                {formatCurrency(basket.parking.standard.subtotal)}
              </strong>
            </div>
            <div className="flex items-center gap-2">
              <ParkingQuantityStandardCounter />
              <div className="cursor-pointer">
                <Trash2
                  className="h-4 w-4 text-red-600"
                  onClick={handleDeleteStandardParking}
                />
              </div>
            </div>
          </>
        ) : null}
      </>
    );

  return null;
}
