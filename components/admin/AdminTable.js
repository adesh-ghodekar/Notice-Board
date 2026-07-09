import EmptyState from "../common/EmptyState";

/**
 * columns: [{ key, label, render?: (row) => node, className?: string }]
 */
export default function AdminTable({ columns, rows, keyField = "id", emptyMessage }) {
  if (!rows || rows.length === 0) {
    return <EmptyState title="Nothing here yet" description={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField]} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4 ${col.className || ""}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
