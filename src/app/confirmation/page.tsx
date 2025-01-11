import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Confirmation",
};

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <section className="-mt-4 h-[650px] bg-[#144722] text-white">
        <section className="mx-auto flex w-[638px] flex-col items-center">
          <h1 className="mb-8 mt-4 text-3xl lg:text-5xl">
            You're going to Chessington!
          </h1>

          <span className="text-3xl font-bold">Saturday 14 Dec 2024</span>
          <Image
            src="/images/get_ready_for_your_visit.png"
            width={1600}
            height={986}
            alt=""
            className="py-10"
          ></Image>
        </section>
      </section>
      <section className="mx-auto flex w-[638px] flex-col items-center">
        <Card className="mb-32 mt-8 w-[638px]">
          <CardHeader className="align-middle">
            <CardTitle>
              <h2 className="text-center text-3xl">Your booking: 2349234234</h2>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mx-auto w-[400px] space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium">1 day ticket</span>
                <span className="text-lg font-medium text-primary">
                  £160.00
                </span>
              </div>
              <div className="my-4 border-t border-gray-200"></div>
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium">Reserve & Ride</span>
                <span className="text-lg font-medium text-primary">
                  £275.00
                </span>
              </div>
              <div className="my-4 border-t border-gray-200"></div>
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-medium text-primary">
                  1x Express parking
                </span>
                <span className="text-lg font-medium text-primary">£20.00</span>
              </div>
              <div className="my-4 border-t border-gray-200"></div>

              <div className="w-full space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-medium">Subtotal</span>
                  <span className="text-lg font-medium text-primary">
                    £455.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-medium">VAT</span>
                  <span className="text-lg font-medium text-primary">
                    £91.00
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-2xl font-bold text-primary">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    £455.00
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-gray-200"></div>

            <div className="flex items-center justify-center py-8">
              <span className="text-2xl font-bold text-primary">
                Saturday 14 Dec 2024
              </span>
            </div>
          </CardContent>

          <div className="my-4 border-t border-gray-200"></div>

          <CardFooter>Footer</CardFooter>
        </Card>
      </section>
    </>
  );
}
