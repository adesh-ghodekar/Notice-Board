export default function StatsCards({ notices }) {
  const total = notices.length;

  const urgent = notices.filter(
    (notice) => notice.priority === "URGENT"
  ).length;

  const events = notices.filter(
    (notice) => notice.category === "EVENT"
  ).length;

  const exams = notices.filter(
    (notice) => notice.category === "EXAM"
  ).length;

  const cards = [
    {
      title: "Total Notices",
      value: total,
      color: "bg-blue-600",
      icon: "📄",
    },
    {
      title: "Urgent",
      value: urgent,
      color: "bg-red-500",
      icon: "🚨",
    },
    {
      title: "Events",
      value: events,
      color: "bg-green-500",
      icon: "🎉",
    },
    {
      title: "Exams",
      value: exams,
      color: "bg-yellow-500",
      icon: "📝",
    },
  ];

  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 text-white shadow-lg`}
        >
          <div className="text-3xl">{card.icon}</div>

          <p className="mt-3 text-lg font-medium">
            {card.title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}