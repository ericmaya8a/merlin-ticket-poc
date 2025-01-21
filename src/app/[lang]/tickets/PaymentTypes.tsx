import { Badge } from "@/components/ui/badge";

export function PaymentTypes() {
  return (
    <div className="mt-4 flex gap-2">
      <Badge className="text-blue-900" variant="outline">
        VISA
      </Badge>
      <Badge className="text-blue-900" variant="outline">
        AMEX
      </Badge>
      <Badge className="text-blue-900" variant="outline">
        PayPal
      </Badge>
    </div>
  );
}
