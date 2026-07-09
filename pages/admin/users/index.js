import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import AdminTable from "../../../components/admin/AdminTable";

export default function ManageAdmins() {
  const { session, isLoading } = useRequireAuth();

  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load admins."))
      .finally(() => setLoadingAdmins(false));
  }, [session]);

  if (isLoading || (session && loadingAdmins)) return <LoadingSpinner />;
  if (!session) return null;

  const columns = [
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Manage Admins</h1>

        <Link
          href="/admin/users/create"
          className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Admin
        </Link>
      </div>

      <AdminTable
        columns={columns}
        rows={admins}
        emptyMessage="Add your first admin to see it listed here."
      />
    </div>
  );
}
