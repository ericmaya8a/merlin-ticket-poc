"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  date: Date;
}

export function Countdown({ date }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const seconds = Math.ceil((timeRemaining / 1000) % 60);
  const minutes = Math.ceil((timeRemaining / (1000 * 60)) % 60);
  const hours = Math.ceil((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const eventTime = new Date(date).getTime();
      let remainingTime = eventTime - currentTime;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
      }

      setTimeRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [timeRemaining, date]);

  if (timeRemaining > 0)
    return (
      <div className="flex gap-2">
        <div className="h-[56px] w-[56px] text-center">
          <div className="bg-[#0D3017] px-2 py-1 font-bold">
            {days.toString()}
          </div>
          <small className="text-xs">Days</small>
        </div>
        <strong>:</strong>
        <div className="h-[56px] w-[56px] text-center">
          <div className="bg-[#0D3017] px-2 py-1 font-bold">
            {hours.toString()}
          </div>
          <small className="text-xs">Hours</small>
        </div>
        <strong>:</strong>
        <div className="h-[56px] w-[56px] text-center">
          <div className="bg-[#0D3017] px-2 py-1 font-bold">
            {minutes.toString()}
          </div>
          <small className="text-xs">Minutes</small>
        </div>
        <strong>:</strong>
        <div className="h-[56px] w-[56px] text-center">
          <div className="bg-[#0D3017] px-2 py-1 font-bold">
            {seconds.toString()}
          </div>
          <small className="text-xs">Seconds</small>
        </div>
      </div>
    );

  return null;
}
