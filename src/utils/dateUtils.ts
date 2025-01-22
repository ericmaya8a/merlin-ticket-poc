import { format } from "date-fns";

export const formatSelectedDates = (selectedDates: Date[]): string => {
  if (selectedDates.length === 1) {
    return format(selectedDates[0], "MM/dd/yyyy");
  }
  if (selectedDates.length === 2) {
    return `${format(selectedDates[0], "MM/dd/yyyy")} - ${format(
      selectedDates[1],
      "MM/dd/yyyy",
    )}`;
  }
  return "Select date(s)";
};
