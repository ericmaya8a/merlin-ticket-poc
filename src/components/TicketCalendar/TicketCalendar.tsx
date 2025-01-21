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

type DayInfo = {
  price: number | null;
  closed: boolean;
  lowestPrice: boolean;
};

type Props = {
  calendarData: PricesData | undefined;
  onFetchNext: () => Promise<void>;
  loading: boolean;
};

export type PricesData = Record<string, DayInfo>;

const TicketCalendar = ({ calendarData, onFetchNext, loading }: Props) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [areMultipleDays, setAreMultipleDays] = useState<boolean>(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [isContentMounted, setIsContentMounted] = useState(false);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = window.innerWidth <= 768;

  if (!calendarData) return null;

  const setRef = useCallback((node: HTMLDivElement | null) => {
    calendarContainerRef.current = node;
    if (node) {
      console.log("Ref assigned:", node);
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
      console.log("Reached the bottom of the calendar!");

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
    if (!areMultipleDays || selectedDates.length === 2) {
      setSelectedDates([date]);
    } else {
      const firstDate = selectedDates[0];
      if (addDays(firstDate, 1).getTime() === date.getTime()) {
        setSelectedDates([...selectedDates, date]);
      } else {
        setSelectedDates([date]);
      }
    }
  };

  const handleDaysOptionSelect = (option: boolean) => {
    setAreMultipleDays(option);
    setSelectedDates([]);
  };

  const handleApply = () => {
    console.log("Applied selection:", { selectedDates, areMultipleDays });
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
              selectedDates={selectedDates}
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
          <SheetTrigger>Open Calendar</SheetTrigger>
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
          <PopoverTrigger>Open Calendar</PopoverTrigger>
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
