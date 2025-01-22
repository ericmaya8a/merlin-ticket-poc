"use server";

import { constants } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

const cmsUrl = process.env.CMS_URL;

interface BookingByIdResponse {
  success: boolean;
  data: BasketType & { id: string; date: string };
}

interface DataResponse {
  tickets: {
    count: number;
    subtotal: string;
    gateSubtotal: string;
    savings: string;
  };
  parking: {
    express: {
      count: number;
      subtotal: string;
    };
    standard: {
      count: number;
      subtotal: string;
    };
  };
  total: string;
  vat: string;
  date: Date;
  formattedDate: string;
}

export async function getBookingById(id: string): Promise<DataResponse> {
  const {
    data: { tickets, parking, date },
  }: BookingByIdResponse = await (
    await fetch(`${cmsUrl}/api/booking/${id}`)
  ).json();
  const gateTicketSubtotal = tickets.count * constants.tickets.GATE_PRICE;
  const total =
    tickets.subtotal + parking.express.subtotal + parking.standard.subtotal;
  const vat = total * constants.VAT;
  const data: DataResponse = {
    tickets: {
      count: tickets.count,
      subtotal: formatCurrency(tickets.subtotal),
      gateSubtotal: formatCurrency(gateTicketSubtotal),
      savings: formatCurrency(tickets.savings),
    },
    parking: {
      express: {
        count: parking.express.count,
        subtotal: formatCurrency(parking.express.subtotal),
      },
      standard: {
        count: parking.standard.count,
        subtotal: formatCurrency(parking.standard.subtotal),
      },
    },
    total: formatCurrency(total),
    vat: formatCurrency(vat),
    date: new Date(date),
    formattedDate: format(date, "EEEE dd MMM yyyy"),
  };
  return data;
}
