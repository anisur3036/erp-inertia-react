import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  direction = null,
  sortBy = () => {},
  children,
}) {
  return (
    <th onClick={(e) => sortBy(name)} className="px-3 py-2">
      <div className="flex items-center justify-between gap-1 cursor-pointer">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && direction === "asc" ? "text-white" : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
