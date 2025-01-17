"use client";

import { Button } from "@/components/ui/button";
import { initialStates } from "@/lib/constants";
import { payVisit } from "@/lib/dal/actions/booking";
import { useRouter } from "next/navigation";
import { useSessionStorage } from "usehooks-ts";

export function PaymentButton() {
  const router = useRouter();
  const [basket, , removeTicketBasket] = useSessionStorage<BasketType>(
    "basket",
    initialStates.basket,
  );
  const [, , removeTicketDate] = useSessionStorage<Date>(
    "ticket-date",
    new Date(),
  );
  const [, , removeTicketDescription] = useSessionStorage<TicketType>(
    "ticket-desc",
    initialStates.ticketDescription as TicketType,
  );
  const [, , removeTicketPass] = useSessionStorage<1 | 2>("ticket-pass", 1);

  async function handlePayment() {
    const { success, data } = await payVisit(basket);

    if (success) {
      router.push(`/confirmation?id=${data.id}`);
      removeTicketBasket();
      removeTicketDescription();
      removeTicketDate();
      removeTicketPass();
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
