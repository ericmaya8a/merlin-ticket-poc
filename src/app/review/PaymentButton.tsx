"use client";

import { Button } from "@/components/ui/button";
import { initialStates } from "@/lib/constants";
import { payVisit } from "@/lib/dal/actions/booking";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export function PaymentButton() {
  const router = useRouter();
  const [basket] = useLocalStorage<BasketType>("basket", initialStates.basket);

  async function handlePayment() {
    const { success, data } = await payVisit(basket);

    if (success) {
      router.push(`/confirmation?id=${data.id}`);
    }
  }

  return (
    <Button
      className="w-full bg-blue-950 text-2xl font-bold text-white"
      onClick={handlePayment}
    >
      PayPay
    </Button>
  );
}
