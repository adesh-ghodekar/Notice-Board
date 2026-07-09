import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from "../../utils/constants";

export default function NoticeFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <input
        type="text"
        placeholder="🔍 Search Notice..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        <option value="ALL">All Categories</option>
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        <option value="ALL">All Priorities</option>
        {PRIORITY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
