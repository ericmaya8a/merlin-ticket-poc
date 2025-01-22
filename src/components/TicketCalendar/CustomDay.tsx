import { cn } from "@/lib/utils";
import { format, isSameDay, isSameMonth } from "date-fns";
import { DayProps } from "react-day-picker";
import { PricesData } from "./TicketCalendar";

interface CustomDayProps extends DayProps {
  dateData: PricesData;
  onSelect?: (date: Date) => void;
  selectedDates?: Date[];
}

const CustomDay = ({
  date,
  displayMonth,
  dateData,
  onSelect,
  selectedDates,
}: CustomDayProps) => {
  if (!date) {
    return null;
  }

  if (!isSameMonth(date, displayMonth)) {
    return <div className="h-8 w-9 border border-transparent"></div>;
  }

  const formattedDate = format(date, "yyyy-MM-dd");
  const dayInfo = dateData[formattedDate];
  const isSelected =
    selectedDates &&
    selectedDates.some((selectedDate) => isSameDay(date, selectedDate));

  const closedClass =
    "inline-flex items-center place-content-center aspect-square bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed relative before:content-[''] before:absolute before:z-10 before:h-[1px] before:w-[130%] before:-rotate-[40deg] before:origin-center before:right-[-15%] before:top-[50%] before:bg-[lightgray]";

  const dayClasses = cn(
    "w-9 h-8 text-[#1E274A] flex items-center justify-center rounded-[2px] border",
    dayInfo?.closed
      ? closedClass
      : dayInfo?.lowestPrice
        ? "bg-green-50 text-gray-800 border-[#00A13A]"
        : "border-[#A1A3AA]",
    isSelected ? "bg-[#E52330] text-white border-red-500 hover:bg-red-600" : "",
  );

  const textDayClasses = cn(
    "text-base font-medium relative z-10 font-bold",
    dayInfo?.closed ? "text-gray-400" : "",
  );

  const handleClick = () => {
    if (dayInfo?.closed || !onSelect) return;
    onSelect(date);
  };

  const ariaLabel = dayInfo?.closed
    ? `${format(date, "eeee, MMM d")}, Closed`
    : `${format(date, "eeee, MMM d")}, Price: £${dayInfo?.price || "N/A"}`;

  return (
    <div className="flex justify-center">
      <button
        className="flex flex-col items-center"
        onClick={handleClick}
        disabled={dayInfo?.closed}
        aria-disabled={dayInfo?.closed}
        aria-label={ariaLabel}
      >
        <div className={dayClasses}>
          <span className={textDayClasses}>{date.getDate()}</span>
        </div>
        <span
          className={cn(
            "mt-1 text-xs font-medium text-[#1E274A]",
            dayInfo?.closed ? "text-gray-400" : "text-gray-800",
          )}
        >
          {dayInfo?.closed ? "Closed" : `£${dayInfo?.price || ""}`}
        </span>
      </button>
    </div>
  );
};

export default CustomDay;
