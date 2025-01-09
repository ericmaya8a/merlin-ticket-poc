import { Header } from "@/components/Header/Header";
import { TicketWidget } from "@/components/TicketWidget/TicketWidget";

export default async function Home() {
  return (
    <Header>
      <TicketWidget />
    </Header>
  );
}
