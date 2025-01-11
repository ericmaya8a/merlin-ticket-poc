import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateInfo } from "./DateInfo";
import TicketPass from "./TicketPass";
import { TicketQuantity } from "./TicketQuantity";

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
        </div>
      </CardContent>
    </Card>
  );
}
