import { cn } from "@/lib/utils";

export const TicketCalendarHeader = ({
  areMultipleDays,
  onDaysOptionSelect,
}: {
  areMultipleDays: boolean;
  onDaysOptionSelect: (option: boolean) => void;
}) => {
  return (
    <div className="mb-4 flex flex-col justify-between lg:flex-row lg:items-center">
      <h2 className="text-2xl font-bold text-[#1E274A]">Date of Visit?</h2>
      <div className="flex flex-row items-center gap-3">
        <h3 className="text-base font-medium text-[#1E274A]">How many days?</h3>
        <div className="flex flex-row items-center gap-2">
          <button
            className={cn(
              "h-8 w-9 rounded-md border text-white",
              !areMultipleDays
                ? "border-[#E52330] bg-[#E52330] hover:bg-red-600"
                : "border-[#E52330] text-[#E52330] hover:bg-red-50",
            )}
            onClick={() => onDaysOptionSelect(false)}
          >
            1
          </button>
          <button
            className={cn(
              "h-8 w-9 rounded-md border text-white",
              areMultipleDays
                ? "border-[#E52330] bg-[#E52330] hover:bg-red-600"
                : "border-[#E52330] text-[#E52330] hover:bg-red-50",
            )}
            onClick={() => onDaysOptionSelect(true)}
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
};
