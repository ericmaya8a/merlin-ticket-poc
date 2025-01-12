export const constants = {
  tickets: {
    GATE_PRICE: 40,
    ONLINE_PRICE: 29,
  },
} as const;

export const initialStates = {
  ticketDescription: {
    totalAdults: 0,
    totalKids: 0,
    options: [
      { id: "A", text: "Adult (Age 17+)", count: 0 },
      { id: "O", text: "Older kids (Age 8 - 15)", count: 0 },
      { id: "Y", text: "Young kids (Age 2 - 7)", count: 0 },
      { id: "T", text: "Toddlers (Under 2)", count: 0 },
    ],
  },
  basket: {
    tickets: {
      count: 0,
      subtotal: 0,
      savings: 0,
    },
  },
};