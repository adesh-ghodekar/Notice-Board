import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ManageNotices() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, [session, status]);

  async function deleteNotice(id) {
    if (!confirm("Delete this notice?")) return;

    const res = await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNotices((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-700 border-t-transparent"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Manage Notices
        </h1>

        <Link
          href="/notices/create"
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          + Create Notice
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Pinned
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {notices.map((notice) => (

              <tr
                key={notice.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {notice.title}
                </td>

                <td className="px-6 py-4">
                  {notice.category}
                </td>

                <td className="px-6 py-4">
                  {notice.priority}
                </td>

                <td className="px-6 py-4 text-center">
                  {notice.pinned ? "📌" : "-"}
                </td>

                <td className="flex gap-3 px-6 py-4">

                  <Link
                    href={`/notices/edit/${notice.id}`}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteNotice(notice.id)
                    }
                    className="rounded bg-red-600 px-4 py-2 text-white"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}