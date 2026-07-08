import { useEffect, useMemo, useState } from "react";
import NoticeCard from "../components/NoticeCard";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNotices((prev) =>
        prev.filter((notice) => notice.id !== id)
      );
    } else {
      alert("Failed to delete notice.");
    }
  }

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchSearch = notice.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "ALL" ||
        notice.category === categoryFilter;

      const matchPriority =
        priorityFilter === "ALL" ||
        notice.priority === priorityFilter;

      return matchSearch && matchCategory && matchPriority;
    });
  }, [notices, search, categoryFilter, priorityFilter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-800">
        College Notice Board
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the College Notice Board System.
      </p>

      <hr className="my-8" />

      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="🔍 Search Notice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="ALL">All Categories</option>
          <option value="GENERAL">GENERAL</option>
          <option value="EVENT">EVENT</option>
          <option value="EXAM">EXAM</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="ALL">All Priorities</option>
          <option value="NORMAL">NORMAL</option>
          <option value="URGENT">URGENT</option>
        </select>

      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Latest Notices
      </h2>

      {filteredNotices.length === 0 ? (
        <p className="mt-8 text-gray-500">
          No matching notices found.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}