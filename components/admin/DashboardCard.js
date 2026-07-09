import Link from "next/link";

export default function DashboardCard({ href, icon, title, description, color }) {
  return (
    <Link
      href={href}
      className={`rounded-xl ${color} p-8 text-white shadow-lg transition hover:scale-105`}
    >
      <div className="text-5xl">{icon}</div>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-white/90">{description}</p>
    </Link>
  );
}
