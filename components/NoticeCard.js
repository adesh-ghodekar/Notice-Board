import Link from "next/link";

export default function NoticeCard({ notice, handleDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">

      <div className="flex justify-between items-start">

        <span
          className={`px-4 py-1 rounded-full text-sm font-bold text-white ${
            notice.priority === "URGENT"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {notice.priority}
        </span>

        <span className="text-gray-500">
          {new Date(notice.publishDate).toLocaleDateString()}
        </span>

      </div>

      <h2 className="text-2xl font-semibold mt-5">
        {notice.title}
      </h2>

      <p className="text-gray-600 mt-3">
        {notice.body}
      </p>

      <div className="mt-5">

        <span className="font-semibold">
          Category:
        </span>{" "}
        {notice.category}

      </div>

      <div className="flex gap-4 mt-6">

        <Link
          href={`/notices/edit/${notice.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Edit
        </Link>

        <button
          onClick={() => handleDelete(notice.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}