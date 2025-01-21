export const TicketCalendarFooter = ({
  handleApply,
}: {
  handleApply: () => void;
}) => {
  return (
    <div className="flex flex-1 items-center gap-6 border-t border-t-[#D7D8DB] px-3 py-4 lg:justify-between lg:border-t-0">
      <button className="rounded-[2px] border border-[#00A13A] bg-green-50 px-6 py-2 text-xs font-bold text-[#144722] hover:bg-green-100">
        Lowest prices
      </button>
      <button
        className="w-full rounded-md bg-[#E52330] px-6 py-3 font-bold text-white hover:bg-red-600 lg:w-[200px]"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};
