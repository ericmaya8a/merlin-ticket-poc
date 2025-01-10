import { BackButton } from "@/components/BackButton/BackButton";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ReviewPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center gap-6 py-10">
        <BackButton href="/extras" title="Continue shopping" />

        <h1 className="mb-8 mt-4 scroll-m-20 text-3xl tracking-tight lg:text-5xl">
          Review & complete your order
        </h1>

        <section className="p-8">
          <Card className="w-[768px] px-20">
            <CardHeader>
              <CardTitle>
                <span className="text-3xl font-bold text-primary">
                  Your visit
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between bg-[#F2F2F3] px-2">
                <span className="text-sm text-[#1E274A]">Sat 14 Dec 2024</span>{" "}
                <Button className="text-[#E52330]" variant="link">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-[#1E274A]">1 day ticket</span>{" "}
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="w-1/3 text-[#1E274A]">
                  <div className="flex items-center space-x-2">
                    <Button variant="destructive" size="sm">
                      -
                    </Button>
                    <span className="w-2 pr-4 text-center text-2xl font-bold">
                      5
                    </span>
                    <Button variant="destructive" size="sm">
                      +
                    </Button>
                  </div>
                </div>
                <span className="w-2/3 text-end text-[#1E274A]">
                  <strong>£160.00</strong>
                </span>
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-[#1E274A]">Reserve & Ride</span>{" "}
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="w-1/3 text-[#1E274A]">
                  <div className="flex items-center space-x-2">
                    <Button variant="destructive" size="sm">
                      -
                    </Button>
                    <span className="w-2 pr-4 text-center text-2xl font-bold">
                      5
                    </span>
                    <Button variant="destructive" size="sm">
                      +
                    </Button>
                  </div>
                </div>
                <span className="w-2/3 text-end text-[#1E274A]">
                  <strong>£275.00</strong>
                </span>
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-[#1E274A]">Express parking</span>{" "}
              </div>
              <div className="flex items-center justify-between px-2">
                <div className="w-1/3 text-[#1E274A]">
                  <div className="flex items-center space-x-2">
                    <Button variant="destructive" size="sm">
                      -
                    </Button>
                    <span className="w-2 pr-4 text-center text-2xl font-bold">
                      1
                    </span>
                    <Button variant="destructive" size="sm">
                      +
                    </Button>
                  </div>
                </div>
                <span className="w-2/3 text-end text-[#1E274A]">
                  <strong>£275.00</strong>
                </span>
              </div>
            </CardContent>

            <div className="my-4 border-t border-gray-200"></div>

            <CardFooter>
              <div className="w-full space-y-2 px-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-md font-medium">Subtotal</span>
                  <span className="text-md font-semibold text-primary">
                    £450.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-md font-medium">VAT</span>
                  <span className="text-md font-semibold text-primary">
                    £91.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-2xl font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    £450.00
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </section>

        <section className="w-[768px] py-8">
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
            <p>
              <h3 className="mb-4 text-2xl font-bold text-primary">Pay with</h3>
            </p>
            <span>
              Pay in full or spread the cost with out buy now, pay later options
            </span>
          </section>

          <section className="text-4xl font-bold">TBC...</section>
        </section>
      </div>
    </>
  );
}
