import { useEffect, useState } from "react";
import NoticeCard from "../components/NoticeCard";

export default function Home() {
  const [notices, setNotices] = useState([]);

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

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-bold text-gray-800">
        College Notice Board
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to the College Notice Board System.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold text-gray-800">
        Latest Notices
      </h2>

      {notices.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No notices available.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {notices.map((notice) => (
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