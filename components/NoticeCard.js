import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function NoticeCard({
  notice,
  handleDelete,
  handlePin,
}) {
  const { data: session } = useSession();

  async function togglePin() {
    const res = await fetch(`/api/notices/${notice.id}/pin`, {
      method: "PATCH",
    });

    if (res.ok) {
      handlePin();

      toast.success(
        notice.pinned
          ? "Notice unpinned successfully!"
          : "Notice pinned successfully!"
      );
    } else {
      toast.error("Failed to update pin status.");
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span
            className={`rounded-full px-4 py-1 text-sm font-bold text-white ${
              notice.priority === "URGENT"
                ? "bg-red-500"
                : "bg-green-500"
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

      <h2 className="mt-5 text-2xl font-bold text-gray-800">
        {notice.title}
      </h2>

      <p className="mt-3 leading-7 text-gray-600">
        {notice.body}
      </p>

      <div className="mt-5">
        <span className="font-semibold text-gray-700">
          Category:
        </span>{" "}
        <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {notice.category}
        </span>
      </div>

      {/* Admin Actions */}
      {session && (
        <div className="mt-6 flex flex-wrap gap-4">

          <button
            onClick={togglePin}
            className={`rounded-lg px-5 py-2 font-medium text-white transition ${
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
            onClick={() => handleDelete(notice.id)}
            className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
          >
            🗑 Delete
          </button>

        </div>
      )}

    </div>
  );
}