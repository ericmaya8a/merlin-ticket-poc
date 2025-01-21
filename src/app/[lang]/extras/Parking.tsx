"use client";

import { ParkingQuantityExpressCounter } from "@/components/Cart/ParkingQuantityExpressCounter";
import { ParkingQuantityStandardCounter } from "@/components/Cart/ParkingQuantityStandardCounter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { constants, initialStates } from "@/lib/constants";
import { useState } from "react";
import { useSessionStorage } from "usehooks-ts";

interface Extras {
  id: string;
  category: "parking";
  title: string;
  description: string;
  price: number;
  count: number;
}

export function Parking() {
  const [basket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket,
  );
  const parkingExtrasInitial: Extras[] = [
    {
      id: "parking001",
      category: "parking",
      title: "Express Parking",
      description: "Park in the best spots near the entrance!",
      price: constants.parking.EXPRESS_PARKING,
      count: basket.parking.express.count,
    },
    {
      id: "parking002",
      category: "parking",
      title: "Standard Parking",
      description: "Pre-book online and save time on the day.",
      price: constants.parking.STANDARD_PARKING,
      count: basket.parking.standard.count,
    },
  ];
  const [parkingExtras] = useState<Extras[]>(parkingExtrasInitial);

  return (
    <section className="flex flex-col items-center space-y-10">
      {parkingExtras.map(({ id, title, description, price }) => (
        <Card className="w-[550px]" key={id}>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl">{title}</h2>
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>{description}</CardContent>
          <CardFooter className="flex p-6">
            <div className="w-2/3">
              <span>
                <strong>£{price}</strong> per vehicle
              </span>
            </div>
            <div className="w-1/3">
              <div className="flex items-center space-x-2">
                {id === "parking001" ? <ParkingQuantityExpressCounter /> : null}
                {id === "parking002" ? (
                  <ParkingQuantityStandardCounter />
                ) : null}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}

      <Button
        variant="destructive"
        className="h-12 w-[280px] font-bold"
        asChild
      >
        <Link href="/review">Continue</Link>
      </Button>
    </section>
  );
}
