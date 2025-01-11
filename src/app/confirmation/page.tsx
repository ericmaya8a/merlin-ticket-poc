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
        <Card className="mb-16 mt-8 w-[638px]">
          <CardHeader className="align-middle">
            <CardTitle>
              <h2 className="text-center text-3xl">Your booking: 2349234234</h2>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-sm text-[#1E274A]">1 day ticket</span>{" "}
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="w-1/3 text-[#1E274A]">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    // onClick={() =>
                    //   handleGuestChange("children", "decrement")
                    // }
                  >
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
          </CardContent>

          <div className="my-4 border-t border-gray-200"></div>

          <CardFooter>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-sm font-semibold text-primary">
                  £160.00
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">VAT</span>
                <span className="text-sm font-semibold text-primary">
                  £32.00
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-md font-bold text-primary">Total</span>
                <span className="text-md font-bold text-primary">£160.00</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
