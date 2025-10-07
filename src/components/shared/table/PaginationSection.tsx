// Import Dependencies

// Local Imports
import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

// ----------------------------------------------------------------------

export function PaginationSection() {

  return (
    <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <div className="text-xs-plus flex items-center space-x-2">
        <span>Show</span>
        <Select defaultValue="10">
          <SelectTrigger className="w-[70px] h-7 rounded-full py-1 text-xs">
            <SelectValue placeholder="10" />
          </SelectTrigger>

          {/* Make dropdown width auto */}
          <SelectContent className="w-auto min-w-[unset]">
            {[10, 20, 30, 40, 50].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>
      <div>
        <Pagination
          total={5}
          value={1}

        >
          <PaginationPrevious />
          <PaginationItems />
          <PaginationNext />
        </Pagination>
      </div>
      <div className="text-xs-plus truncate">
        1 -{" "}
        10 of{" "}
        50 entries
      </div>
    </div>
  );
}
