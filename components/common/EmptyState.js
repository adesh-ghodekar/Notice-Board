export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description,
}) {
  return (
    <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
      <div className="text-6xl">{icon}</div>

      <h3 className="mt-4 text-2xl font-semibold text-gray-700">{title}</h3>

      {description && <p className="mt-2 text-gray-500">{description}</p>}
    </div>
  );
}
