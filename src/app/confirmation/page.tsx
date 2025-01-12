import { Header } from "@/components/Header/Header";
import { getBookingById } from "@/lib/dal/queries/booking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation",
};

type SearchParams = Promise<{
  id: string;
}>;

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const id = (await searchParams).id;
  const response = await getBookingById(id);

  return (
    <>
      <Header />
      <div className="p-8">Confirmation Page</div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </>
  );
}
