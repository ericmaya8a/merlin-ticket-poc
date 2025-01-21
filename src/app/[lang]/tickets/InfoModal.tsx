import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export function InfoModal({ header }: { header: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex cursor-pointer gap-2">
          <Info className="text-blue-400" />
          More info
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>
            You get single day admission to Alton Towers on the date selected.
          </DialogDescription>
          <div className="flex flex-col gap-4 border border-blue-700 bg-blue-300/20 p-4">
            <div className="flex gap-4">
              <Info className="text-blue-400" />
              <strong>About your ticket</strong>
            </div>
            <div className="pl-4">
              <ul className="list-disc">
                <li>
                  Prices are for individual tickets, subject to change based on
                  availability.
                </li>
                <li>Under 2s go free with al least one paying adult.</li>
                <li>Entry to Alton Towers Waterpark is not included.</li>
              </ul>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
