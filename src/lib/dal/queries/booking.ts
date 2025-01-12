"use server";

interface BookingByIdResponse {
  success: boolean;
  data: BasketType & { id: string };
}

export async function getBookingById(id: string): Promise<BookingByIdResponse> {
  const result = await fetch(`http://localhost:3000/api/booking/${id}`);
  return await result.json();
}
