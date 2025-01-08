import { Header } from "@/components/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation",
};

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <div className="p-8">Confirmation Page</div>
    </>
  );
}
