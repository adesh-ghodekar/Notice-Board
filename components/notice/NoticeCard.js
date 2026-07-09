import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ConfirmDialog from "../common/ConfirmDialog";

const HTTP_URL_PATTERN = /^https?:\/\//i;

export default function NoticeCard({ notice, onDelete, onPinChange }) {
  const { data: session } = useSession();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pinning, setPinning] = useState(false);

  const hasValidImage =
    typeof notice.image === "string" && HTTP_URL_PATTERN.test(notice.image);

  async function togglePin() {
    setPinning(true);

    try {
      const res = await fetch(`/api/notices/${notice.id}/pin`, {
        method: "PATCH",
      });

      if (res.ok) {
        onPinChange();
        toast.success(
          notice.pinned ? "Notice unpinned successfully!" : "Notice pinned successfully!"
        );
      } else {
        toast.error("Failed to update pin status.");
      }
    } finally {
      setPinning(false);
    }
  }

  async function confirmDelete() {
    setConfirmOpen(false);
    await onDelete(notice.id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl">
      {hasValidImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={notice.image}
          alt={notice.title}
          className="h-48 w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-1 text-sm font-bold text-white ${
                notice.priority === "URGENT" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {notice.priority}
            </span>

            {notice.pinned && (
              <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black">
                📌 Pinned
              </span>
            )}
          </div>

          <span className="text-sm text-gray-500">
            {new Date(notice.publishDate).toLocaleDateString()}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-800">{notice.title}</h2>

        <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">{notice.body}</p>

        <div className="mt-5">
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {notice.category}
          </span>
        </div>

        {session && (
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={togglePin}
              disabled={pinning}
              className={`rounded-lg px-5 py-2 font-medium text-white transition disabled:opacity-60 ${
                notice.pinned
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              {notice.pinned ? "📍 Unpin" : "📌 Pin"}
            </button>

            <Link
              href={`/notices/edit/${notice.id}`}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this notice?"
        message={`"${notice.title}" will be permanently removed. This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
