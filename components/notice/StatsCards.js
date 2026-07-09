function StatCard({ title, value, color, icon }) {
  return (
    <div className={`${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="text-3xl">{icon}</div>
      <p className="mt-3 text-lg font-medium">{title}</p>
      <h2 className="mt-2 text-4xl font-bold">{value}</h2>
    </div>
  );
}

export default function StatsCards({ notices }) {
  const total = notices.length;
  const urgent = notices.filter((n) => n.priority === "URGENT").length;
  const events = notices.filter((n) => n.category === "EVENT").length;
  const exams = notices.filter((n) => n.category === "EXAM").length;

  const cards = [
    { title: "Total Notices", value: total, color: "bg-blue-600", icon: "📄" },
    { title: "Urgent", value: urgent, color: "bg-red-500", icon: "🚨" },
    { title: "Events", value: events, color: "bg-green-500", icon: "🎉" },
    { title: "Exams", value: exams, color: "bg-yellow-500", icon: "📝" },
  ];

  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
