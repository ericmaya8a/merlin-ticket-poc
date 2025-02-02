"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { initialStates } from "@/lib/constants";
import { useSessionStorage } from "usehooks-ts";

export function ContinueButton() {
  const [basket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket,
  );
  const router = useRouter();

  return (
    <Button
      className="w-1/4 font-bold hover:no-underline"
      variant="destructive"
      disabled={!basket.tickets.count}
      onClick={() => router.push("/extras")}
    >
      Continue
    </Button>
  );
}
