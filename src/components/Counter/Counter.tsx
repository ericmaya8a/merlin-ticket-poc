"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface CounterProps {
  count?: number;
  onChange: (value: number) => void;
}

export function Counter({ count = 0, onChange }: CounterProps) {
  const [countValue, setCountValue] = useState(count);

  function handleMinus() {
    setCountValue(countValue > 0 ? countValue - 1 : 0);
  }

  function handlePlus() {
    setCountValue(countValue + 1);
  }

  useEffect(() => {
    onChange(countValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue]);

  return (
    <div className="flex items-center justify-between gap-2">
      <Button disabled={countValue <= 0} size="icon" onClick={handleMinus}>
        <Minus />
      </Button>
      <span className="font-bold">{countValue}</span>
      <Button variant="destructive" size="icon" onClick={handlePlus}>
        <Plus />
      </Button>
    </div>
  );
}
