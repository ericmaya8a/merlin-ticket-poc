import { Header } from "@/components/Header/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { constants } from "@/lib/constants";
import { getBookingById } from "@/lib/dal/queries/booking";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Clock, CreditCard, Mail, Tag, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { Countdown } from "./Countdown";

export const metadata: Metadata = {
  title: "Confirmation",
};

type SearchParams = Promise<{
  id: string;
}>;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const id = (await searchParams).id;
  if (id) {
    const { date, formattedDate, parking, tickets, total, vat } =
      await getBookingById(id);

    return (
      <>
        <Header>
          <div className="mx-auto flex w-[638px] flex-col items-center">
            <h1 className="mb-8 mt-4 text-3xl lg:text-5xl">
              You&apos;re going to Chessington!
            </h1>

            <p className="text-xl font-bold">{formattedDate}</p>
            <div className="mb-4 mt-4">
              <Countdown date={date} />
            </div>
            <Image
              src="/images/get_ready_for_your_visit.png"
              width={1600}
              height={986}
              alt=""
              className="py-10"
            ></Image>
          </div>
        </Header>

        <section className="mx-auto w-[638px]">
          <Card className="mb-32 mt-8 w-[638px]">
            <CardHeader className="align-middle">
              <CardTitle className="text-center text-3xl">
                Your booking: {id.substring(0, 12)}
              </CardTitle>
            </CardHeader>
            <CardDescription className="sr-only">
              Your Confirmation
            </CardDescription>
            <CardContent className="mx-auto w-[400px]">
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-medium">1 day ticket</span>
                    <div className="flex gap-1">
                      <span className="text-lg font-medium text-primary line-through">
                        {tickets.gateSubtotal}
                      </span>
                      <span className="text-lg font-medium text-primary">
                        {tickets.subtotal}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>
                      {tickets.count}x{" "}
                      {formatCurrency(constants.tickets.ONLINE_PRICE)}
                    </span>
                    <div className="flex gap-2 bg-[#F79E1B33]/20 p-1 text-xs font-bold text-[#BF6F14]">
                      <Tag className="h-4 w-4" />
                      <span>{tickets.savings} savings</span>
                    </div>
                  </div>
                </div>
                <div className="my-4 border-t border-gray-200"></div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-medium text-primary">
                    {parking.express.count}x Express parking
                  </span>
                  <span className="text-lg font-medium text-primary">
                    {parking.express.subtotal}
                  </span>
                </div>
                <div className="my-4 border-t border-gray-200"></div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-medium text-primary">
                    {parking.standard.count}x Standard parking
                  </span>
                  <span className="text-lg font-medium text-primary">
                    {parking.standard.subtotal}
                  </span>
                </div>
                <div className="my-4 border-t border-gray-200"></div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-medium">Subtotal</span>
                    <span className="text-lg font-medium text-primary">
                      {total}
                    </span>
                  </div>

                  <div className="flex justify-between bg-[#F79E1B33]/20 p-1 font-bold text-[#BF6F14]">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Savings
                    </span>
                    <span>{tickets.savings}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-medium">VAT</span>
                    <span className="text-lg font-medium text-primary">
                      {vat}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-2xl font-bold text-primary">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full border-t border-gray-200"></div>

              <div className="py-8">
                <p className="flex items-center gap-1 pb-4 font-bold text-primary">
                  <Calendar className="h-4 w-4" /> <span>{formattedDate}</span>
                </p>

                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Park opens at 10:00am</span>
                </p>
                <div className="pl-5">
                  <p>Alton Towers</p>
                  <p>Farley Ln, Alton, </p>
                  <p>Stoke-on-Trent </p>
                  <p>ST10 4DB</p>
                </div>
              </div>

              <div className="w-full border-t border-gray-200"></div>

              <div className="py-8">
                <p className="pb-4 text-2xl font-bold text-primary">Payment</p>

                <p className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Mary Goround</span>
                </p>
                <p className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>mgoround@gmail.com</span>
                </p>
                <p className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Apple Pay</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <h2 className="mt-10 text-center text-3xl font-bold">
        You don&apos;t have access to this page
      </h2>
    </>
  );
}
