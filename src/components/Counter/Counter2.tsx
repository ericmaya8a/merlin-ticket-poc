"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface Counter2Props {
  isMinusDisabled: boolean;
  count: number;
  onAdd: VoidFunction;
  onMinus: VoidFunction;
}

export function Counter2({
  count,
  isMinusDisabled,
  onAdd,
  onMinus,
}: Counter2Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="destructive"
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
