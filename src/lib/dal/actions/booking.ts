"use server";

interface PayVisitResponse {
  success: boolean;
  data: BasketType & { id: string };
}

const cmsUrl = process.env.CMS_URL;

export async function payVisit(data: BasketType): Promise<PayVisitResponse> {
  const response = await fetch(`${cmsUrl}/api/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}
