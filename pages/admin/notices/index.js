import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import AdminTable from "../../../components/admin/AdminTable";

export default function ManageNotices() {
  const { session, isLoading } = useRequireAuth();

  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    if (!session) return;

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load notices."))
      .finally(() => setLoadingNotices(false));
  }, [session]);

  async function deleteNotice(id) {
    setPendingDeleteId(null);

    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });

    if (res.ok) {
      setNotices((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notice deleted successfully!");
    } else {
      toast.error("Failed to delete notice.");
    }
  }

  if (isLoading || (session && loadingNotices)) return <LoadingSpinner />;
  if (!session) return null;

  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "priority", label: "Priority" },
    {
      key: "pinned",
      label: "Pinned",
      className: "text-center",
      render: (row) => (row.pinned ? "📌" : "-"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <Link
            href={`/notices/edit/${row.id}`}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={() => setPendingDeleteId(row.id)}
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const pendingNotice = notices.find((n) => n.id === pendingDeleteId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Manage Notices</h1>

        <Link
          href="/notices/create"
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          + Create Notice
        </Link>
      </div>

      <AdminTable
        columns={columns}
        rows={notices}
        emptyMessage="Create your first notice to see it listed here."
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete this notice?"
        message={pendingNotice ? `"${pendingNotice.title}" will be permanently removed.` : ""}
        onConfirm={() => deleteNotice(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
