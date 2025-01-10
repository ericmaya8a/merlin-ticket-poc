"use client";

import { Counter } from "@/components/Counter/Counter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AgeOption {
  id: "A" | "O" | "Y" | "T";
  text: string;
  count: number;
}

interface ageOptionsProps {
  setTotalAdults: Dispatch<SetStateAction<number>>;
  setTotalKids: Dispatch<SetStateAction<number>>;
}

export function AgeOptions({ setTotalAdults, setTotalKids }: ageOptionsProps) {
  const [options, setOptions] = useState<AgeOption[]>([
    { id: "A", text: "Adult (Age 17+)", count: 0 },
    { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
    { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
    { id: "T", text: "Toddlers (Under 2)", count: 0 },
  ]);

  function handleChange(id: AgeOption["id"], val: number) {
    setOptions((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((item) => item.id === id);
      newState[index].count = val;
      return newState;
    });
  }

  useEffect(() => {
    setTotalAdults(options.filter(({ id }) => id === "A")[0].count);
    setTotalKids(
      options
        .filter(({ id }) => id !== "A")
        .reduce((sum, item) => sum + item.count, 0),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div>
      {options.map(({ id, text, count }) => (
        <div key={id} className="flex items-center justify-between px-1 py-2">
          <span className="text-sm">{text}</span>
          <Counter count={count} onChange={(val) => handleChange(id, val)} />
        </div>
      ))}
    </div>
  );
}
