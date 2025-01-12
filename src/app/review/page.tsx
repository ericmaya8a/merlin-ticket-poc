import { BackButton } from "@/components/BackButton/BackButton";
import { Cart } from "@/components/Cart/Cart";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReviewPage() {
  return (
    <>
      <Header />
      <div className="mx-auto flex w-[768px] flex-col gap-6 py-10">
        <div>
          <BackButton href="/extras" title="Continue shopping" />
        </div>

        <h1 className="mb-8 mt-4 text-3xl lg:text-5xl">
          Review & complete your order
        </h1>

        <section>
          <Cart
            titleClassName="text-3xl font-bold text-primary"
            cardClassname="w-full p-20"
          />
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-bold text-primary">Payment</h2>

          <section className="mt-8">
            <h3 className="mb-4 text-2xl text-primary">Terms & Conditions</h3>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="h-6 w-6" />
              <label
                htmlFor="terms"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the terms and conditions
              </label>
            </div>
          </section>

          <section className="mt-12">
            <h3 className="mb-4 text-2xl text-primary">Keeping in touch</h3>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="h-6 w-6" />
              <label
                htmlFor="terms"
                className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I would like to get personalised offers and updates from Merlin
                Entertainments{" "}
              </label>
            </div>
          </section>

          <section className="py-8">
            <h3 className="mb-4 text-2xl font-bold text-primary">Pay with</h3>
            <span>
              Pay in full or spread the cost with out buy now, pay later options
            </span>
          </section>

          <section>
            <Button className="w-full bg-blue-950 text-2xl font-bold text-white">
              PayPay
            </Button>
          </section>
        </section>
      </div>
    </>
  );
}
