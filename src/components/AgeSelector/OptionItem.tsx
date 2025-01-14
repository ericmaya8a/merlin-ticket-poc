"use client";

import { Counter } from "@/components/Counter/Counter";
import { useEffect, useState } from "react";

interface OptionItemProps {
  option: AgeOptionType;
  onChange: (id: AgeOptionType["id"], val: number) => void;
}

export function OptionItem({
  option: { id, count, text },
  onChange,
}: OptionItemProps) {
  const [countValue, setCountValue] = useState(count);

  useEffect(() => {
    onChange(id, countValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue]);

  return (
    <div key={id} className="flex items-center justify-between px-1 py-2">
      <span className="text-sm">{text}</span>
      <Counter
        count={countValue}
        isMinusDisabled={countValue <= 0}
        onAdd={() => setCountValue(countValue + 1)}
        onMinus={() => setCountValue(countValue > 0 ? countValue - 1 : 0)}
      />
    </div>
  );
}
