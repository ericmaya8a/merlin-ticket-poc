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
import { cn } from "@/lib/utils";

interface CartProps {
  cardClassname?: string;
  titleClassName?: string;
}

export function Cart({ cardClassname, titleClassName }: CartProps) {
  return (
    <Card className={cn("w-[306px]", cardClassname)}>
      <CardHeader>
        <CardTitle className={titleClassName}>Your visit</CardTitle>
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
