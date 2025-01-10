"use client";

import { BackButton } from "@/components/BackButton/BackButton";
import { Counter } from "@/components/Counter/Counter";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface Extras {
  id: string;
  category: "parking";
  title: string;
  description: string;
  price: string;
  count: number;
}

const parkingExtrasInitial: Extras[] = [
  {
    id: "parking001",
    category: "parking",
    title: "Express Parking",
    description: "Park in the best spots near the entrance!",
    price: "15.00",
    count: 0,
  },
  {
    id: "parking002",
    category: "parking",
    title: "Standard Parking",
    description: "Pre-book online and save time on the day.",
    price: "7.00",
    count: 0,
  },
];

export default function ParkingAndExtrasPage() {
  const [parkingSelection, setParkingSelection] = useLocalStorage(
    "extras-parking",
    JSON.stringify(parkingExtrasInitial),
  );

  const [parkingExtras, setParkingExtras] = useState<Extras[]>(
    JSON.parse(parkingSelection) || parkingExtrasInitial,
  );

  const [ticketDate, setTicketDate] = useLocalStorage<Date>(
    "ticket-date",
    new Date(),
  );

  const handleChange = (id: string, newCount: number) => {
    const newState = [...parkingExtras];
    newState.find((extra) => extra.id === id)!.count = newCount;
    setParkingExtras(newState);
  };

  const handleContinue = () => {
    setParkingSelection(JSON.stringify(parkingExtras));
  };

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100dvh-80px)]">
        <section className="w-2/3 p-8">
          <BackButton href="/tickets" title="Back to tickets" />

          <h1 className="mb-8 mt-4 scroll-m-20 text-3xl tracking-tight lg:text-5xl">
            Parking & Extras
          </h1>
          <section className="flex flex-col items-center space-y-10">
            {parkingExtras.map(({ id, title, description, price, count }) => (
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
                      <Counter
                        count={count}
                        onChange={(newCount) => handleChange(id, newCount)}
                      />
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Button
              asChild
              variant="destructive"
              className="h-12 w-[280px]"
              onClick={handleContinue}
            >
              <Link href="/review">Continue</Link>
            </Button>
          </section>
        </section>
        <section className="w-1/3 bg-[#FBFBFB] p-8">
          <Card className="w-[306px]">
            <CardHeader>
              <CardTitle>Your visit</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between bg-[#F2F2F3] px-2">
                <span className="text-sm text-[#1E274A]">
                  {format(ticketDate, "EEE dd MMM yyyy")}
                </span>{" "}
                <Button className="text-[#E52330]" variant="link">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-[#1E274A]">1 day ticket</span>{" "}
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="w-1/3 text-[#1E274A]">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      // onClick={() =>
                      //   handleGuestChange("children", "decrement")
                      // }
                    >
                      -
                    </Button>
                    <span className="w-2 pr-4 text-center text-2xl font-bold">
                      5
                    </span>
                    <Button variant="destructive" size="sm">
                      +
                    </Button>
                  </div>
                </div>
                <span className="w-2/3 text-end text-[#1E274A]">
                  <strong>£160.00</strong>
                </span>
              </div>
            </CardContent>

            <div className="my-4 border-t border-gray-200"></div>

            <CardFooter>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-sm font-semibold text-primary">
                    £160.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">VAT</span>
                  <span className="text-sm font-semibold text-primary">
                    £32.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-md font-bold text-primary">Total</span>
                  <span className="text-md font-bold text-primary">
                    £160.00
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  );
}
