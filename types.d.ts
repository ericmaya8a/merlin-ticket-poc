interface BasketType {
  tickets: {
    count: number;
    subtotal: number;
    savings: number;
  };
  parking: {
    express: {
      count: number;
      subtotal: number;
    };
    standard: {
      count: number;
      subtotal: number;
    };
  };
}

interface AgeOptionType {
  id: "A" | "O" | "Y" | "T";
  text: string;
  count: number;
}

interface TicketType {
  totalAdults: number;
  totalKids: number;
  options: AgeOptionType[];
}
