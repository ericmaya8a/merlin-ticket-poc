import { BackButton } from "@/components/BackButton/BackButton";
import { Cart } from "@/components/Cart/Cart";
import { Header } from "@/components/Header/Header";
import { Actions } from "./Actions";
import { PaymentTypes } from "./PaymentTypes";
import { TicketCard } from "./TicketCard";
import { ContinueButton } from "./ContinueButton";

export default function TicketsPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100dvh-80px)]">
        <section className="w-2/3 px-16 py-8">
          <BackButton href="/" />
          <div className="mb-4 mt-4">
            <Actions />
          </div>

          <h1 className="mb-4 mt-4 scroll-m-20 text-3xl tracking-tight lg:text-5xl">
            Choose your tickets
          </h1>

          <p className="text-[#1E274A]">Pay in full or spread the cost.</p>

          <div className="space-y-8">
            <PaymentTypes />
            <TicketCard />
            <div className="text-center">
              <ContinueButton />
            </div>
          </div>
        </section>

        <section className="w-1/3 bg-[#FBFBFB] p-8">
          <Cart />
        </section>
      </div>
    </>
  );
}
