import { BackButton } from "@/components/BackButton/BackButton";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function TicketsPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100dvh-80px)]">
        <section className="w-2/3 p-8">
          <BackButton href="/" />
        </section>
        <section className="w-1/3 bg-[#FBFBFB] p-8">
          <Card className="w-[306px]">
            <CardHeader>
              <CardTitle>Your visit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between bg-[#F2F2F3] px-2">
                <Calendar className="text-[#A1A3AA]" />{" "}
                <span className="text-sm text-[#1E274A]">Sat 14 Dec 2024</span>{" "}
                <Button className="text-[#E52330]" variant="link">
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
