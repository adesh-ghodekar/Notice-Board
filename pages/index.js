import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import NoticeCard from "../components/NoticeCard";
import StatsCards from "../components/StatsCards";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 5;

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, priorityFilter, sortBy]);

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
      toast.success("Notice Deleted Successfully!");
    } else {
      toast.error("Failed to delete notice.");
    }
  }

  const filteredNotices = useMemo(() => {
    let filtered = notices.filter((notice) => {
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

    switch (sortBy) {
      case "NEWEST":
        filtered.sort(
          (a, b) =>
            new Date(b.publishDate) - new Date(a.publishDate)
        );
        break;

      case "OLDEST":
        filtered.sort(
          (a, b) =>
            new Date(a.publishDate) - new Date(b.publishDate)
        );
        break;

      case "TITLE_ASC":
        filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "TITLE_DESC":
        filtered.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    notices,
    search,
    categoryFilter,
    priorityFilter,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredNotices.length / noticesPerPage
  );

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;

  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  return (
        <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-800">
        College Notice Board
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the College Notice Board System.
      </p>

      <hr className="my-8" />
      <StatsCards notices={notices} />

      <div className="mb-8 grid gap-4 md:grid-cols-4">

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

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3"
        >
          <option value="NEWEST">Newest First</option>
          <option value="OLDEST">Oldest First</option>
          <option value="TITLE_ASC">Title (A-Z)</option>
          <option value="TITLE_DESC">Title (Z-A)</option>
        </select>

      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Latest Notices
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading notices...
          </p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <div className="text-6xl">📭</div>

          <h3 className="mt-4 text-2xl font-semibold text-gray-700">
            No Notices Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search, category, priority or sorting filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-8">
            {currentNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                handleDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">

              <button
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                disabled={currentPage === 1}
                className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`rounded-lg px-4 py-2 transition ${
                    currentPage === index + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                disabled={currentPage === totalPages}
                className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
}