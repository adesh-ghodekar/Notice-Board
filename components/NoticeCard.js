import Link from "next/link";

export default function NoticeCard({ notice, handleDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl">

      <div className="flex items-center justify-between">

        <span
          className={`rounded-full px-4 py-1 text-sm font-bold text-white ${
            notice.priority === "URGENT"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {notice.priority}
        </span>

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

      <div className="mt-6 flex gap-4">

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

    </div>
  );
}