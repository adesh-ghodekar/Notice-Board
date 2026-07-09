import { useRequireAuth } from "../../hooks/useRequireAuth";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DashboardCard from "../../components/admin/DashboardCard";

const CARDS = [
  {
    href: "/admin/notices",
    icon: "📝",
    title: "Manage Notices",
    description: "Create, edit and manage all notices.",
    color: "bg-blue-600",
  },
  {
    href: "/admin/users",
    icon: "👤",
    title: "Manage Admins",
    description: "Add, edit and delete admins.",
    color: "bg-green-600",
  },
  {
    href: "/",
    icon: "📢",
    title: "View Notices",
    description: "Open the public notice board.",
    color: "bg-purple-600",
  },
];

export default function AdminDashboard() {
  const { session, isLoading } = useRequireAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!session) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Welcome, <span className="font-semibold">{session.user.name}</span>
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <DashboardCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  );
}
