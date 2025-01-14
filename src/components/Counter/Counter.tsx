"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  isMinusDisabled: boolean;
  count: number;
  onAdd: VoidFunction;
  onMinus: VoidFunction;
  isCritical?: boolean;
}

export function Counter({
  count,
  isCritical,
  isMinusDisabled,
  onAdd,
  onMinus,
}: CounterProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant={isCritical ? "destructive" : undefined}
        disabled={isMinusDisabled}
        size="icon"
        onClick={onMinus}
      >
        <Minus />
      </Button>
      <span className="font-bold">{count}</span>
      <Button variant="destructive" size="icon" onClick={onAdd}>
        <Plus />
      </Button>
    </div>
  );
}
