import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import NoticeCard from "../components/notice/NoticeCard";
import StatsCards from "../components/notice/StatsCards";
import NoticeFilters from "../components/notice/NoticeFilters";
import Pagination from "../components/notice/Pagination";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import { NOTICES_PER_PAGE } from "../utils/constants";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchNotices() {
    try {
      setLoading(true);

      const res = await fetch("/api/notices");
      const data = await res.json();

      setNotices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, priorityFilter, sortBy]);

  async function handleDelete(id) {
    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });

    if (res.ok) {
      setNotices((prev) => prev.filter((notice) => notice.id !== id));
      toast.success("Notice deleted successfully!");
    } else {
      toast.error("Failed to delete notice.");
    }
  }

  const filteredNotices = useMemo(() => {
    const filtered = notices.filter((notice) => {
      const matchSearch = notice.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "ALL" || notice.category === categoryFilter;
      const matchPriority = priorityFilter === "ALL" || notice.priority === priorityFilter;

      return matchSearch && matchCategory && matchPriority;
    });

    switch (sortBy) {
      case "NEWEST":
        filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case "OLDEST":
        filtered.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        break;
      case "TITLE_ASC":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "TITLE_DESC":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [notices, search, categoryFilter, priorityFilter, sortBy]);

  const totalPages = Math.ceil(filteredNotices.length / NOTICES_PER_PAGE);
  const indexOfLastNotice = currentPage * NOTICES_PER_PAGE;
  const indexOfFirstNotice = indexOfLastNotice - NOTICES_PER_PAGE;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">College Notice Board</h1>

      <p className="mt-2 text-gray-600">Welcome to the College Notice Board System.</p>

      <hr className="my-8" />

      <StatsCards notices={notices} />

      <NoticeFilters
        search={search}
        onSearchChange={setSearch}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <h2 className="text-2xl font-semibold text-gray-800">Latest Notices</h2>

      {loading ? (
        <LoadingSpinner fullScreen={false} label="Loading notices..." />
      ) : filteredNotices.length === 0 ? (
        <EmptyState
          title="No Notices Found"
          description="Try changing your search, category, priority or sorting filters."
        />
      ) : (
        <>
          <div className="mt-8 space-y-8">
            {currentNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={handleDelete}
                onPinChange={fetchNotices}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
