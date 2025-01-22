import { addDays, format } from "date-fns";
import { useEffect, useRef, useState, useCallback } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import CustomDay from "./CustomDay";
import { DayProps } from "react-day-picker";
import { TicketCalendarHeader } from "./TicketCalendarHeader";
import { TicketCalendarFooter } from "./TicketCalendarFooter";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { formatSelectedDates } from "@/utils/dateUtils";

type DayInfo = {
  price: number | null;
  closed: boolean;
  lowestPrice: boolean;
};

type Props = {
  calendarData: PricesData | undefined;
  onFetchNext: () => Promise<void>;
  loading: boolean;
  selectedDates: Date[];
  onApply: (dates: Date[]) => void;
};

export type PricesData = Record<string, DayInfo>;

const TicketCalendar = ({
  calendarData,
  onFetchNext,
  loading,
  selectedDates,
  onApply,
}: Props) => {
  const [currentSelection, setCurrentSelection] =
    useState<Date[]>(selectedDates);
  const [areMultipleDays, setAreMultipleDays] = useState<boolean>(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [isContentMounted, setIsContentMounted] = useState(false);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = window.innerWidth <= 768;

  if (!calendarData) return null;

  const setRef = useCallback((node: HTMLDivElement | null) => {
    calendarContainerRef.current = node;
    if (node) {
      setIsContentMounted(true);
    } else {
      setIsContentMounted(false);
    }
  }, []);

  const handleScroll = async () => {
    if (!calendarContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      calendarContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 1 && !loading) {
      onFetchNext().then(() => {
        setNumberOfMonths(numberOfMonths + 1);
      });
    }
  };

  useEffect(() => {
    if (!isContentMounted) return;

    const calendarContainer = calendarContainerRef.current;

    if (calendarContainer) {
      calendarContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (calendarContainer) {
        calendarContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isContentMounted, numberOfMonths, loading]);

  const handleSelect = (date: Date) => {
    if (!areMultipleDays || currentSelection.length === 2) {
      setCurrentSelection([date]);
    } else {
      const firstDate = currentSelection[0];
      if (addDays(firstDate, 1).getTime() === date.getTime()) {
        setCurrentSelection([...currentSelection, date]);
      } else {
        setCurrentSelection([date]);
      }
    }
  };

  const handleDaysOptionSelect = (option: boolean) => {
    setAreMultipleDays(option);
    setCurrentSelection([]);
  };

  const handleApply = () => {
    console.log("Applied selection:", { currentSelection, areMultipleDays });
    onApply(currentSelection);
  };

  const renderCalendar = () => {
    const calendarContent = (
      <Calendar
        mode="single"
        disableNavigation={isMobile}
        weekStartsOn={1}
        numberOfMonths={numberOfMonths}
        onMonthChange={onFetchNext}
        formatters={{
          formatWeekdayName: (date) => format(date, "eee"),
        }}
        components={{
          Day: (props: DayProps) => (
            <CustomDay
              {...props}
              dateData={calendarData}
              onSelect={handleSelect}
              selectedDates={currentSelection}
            />
          ),
        }}
      />
    );

    if (isMobile) {
      return (
        <ScrollArea ref={setRef} className="max-h-[750px] overflow-y-auto">
          {calendarContent}
          {loading && (
            <div className="py-4 text-center text-gray-500">
              Loading more dates...
            </div>
          )}
        </ScrollArea>
      );
    }

    return calendarContent;
  };

  return (
    <>
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <div>
              <p className="text-start text-xs">Date of visit</p>
              <p className="font-bold">{formatSelectedDates(selectedDates)}</p>
            </div>
          </SheetTrigger>
          <SheetContent className="p-4" side="bottom">
            <SheetTitle />
            <TicketCalendarHeader
              areMultipleDays={areMultipleDays}
              onDaysOptionSelect={handleDaysOptionSelect}
            />
            {renderCalendar()}
            <TicketCalendarFooter handleApply={handleApply} />
          </SheetContent>
        </Sheet>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <p className="text-start text-xs">Date of visit</p>
              <p className="font-bold">{formatSelectedDates(selectedDates)}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <TicketCalendarHeader
              areMultipleDays={areMultipleDays}
              onDaysOptionSelect={handleDaysOptionSelect}
            />
            {renderCalendar()}
            <TicketCalendarFooter handleApply={handleApply} />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default TicketCalendar;
