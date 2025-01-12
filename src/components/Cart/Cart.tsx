import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateInfo } from "./DateInfo";
import TicketPass from "./TicketPass";
import { TicketQuantity } from "./TicketQuantity";
import VisitTotal from "./VisitTotal";
import { ParkingQuantity } from "./ParkingQuantity";

export function Cart() {
  return (
    <Card className="w-[306px]">
      <CardHeader>
        <CardTitle>Your visit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DateInfo />
          <TicketPass />
          <TicketQuantity />
          <ParkingQuantity />
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <VisitTotal />
      </CardFooter>
    </Card>
  );
}
