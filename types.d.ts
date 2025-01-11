interface BasketType {
  tickets: {
    count: number;
    subtotal: number;
    savings: number;
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
