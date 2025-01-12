"use server";

interface PayVisitResponse {
  success: boolean;
  data: BasketType & { id: string };
}

export async function payVisit(data: BasketType): Promise<PayVisitResponse> {
  const response = await fetch("http://localhost:3000/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}
