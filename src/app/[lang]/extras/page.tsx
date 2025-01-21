import { BackButton } from "@/components/BackButton/BackButton";
import { Cart } from "@/components/Cart/Cart";
import { Header } from "@/components/Header/Header";
import { Parking } from "./Parking";

export default function ParkingAndExtrasPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100dvh-80px)]">
        <section className="w-2/3 p-8">
          <BackButton href="/tickets" title="Back to tickets" />

          <h1 className="mb-4 mt-4 scroll-m-20 text-3xl tracking-tight lg:text-5xl">
            Parking & Extras
          </h1>
          <p className="mb-4 text-[#1E274A]">Get most out of your day.</p>

          <Parking />
        </section>

        <section className="w-1/3 bg-[#FBFBFB] p-8">
          <Cart />
        </section>
      </div>
    </>
  );
}
