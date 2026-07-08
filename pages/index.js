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
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold">
        College Notice Board
      </h1>

      <p className="mt-3 text-gray-600">
        Welcome to the College Notice Board System.
      </p>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold">
        Latest Notices
      </h2>

      {notices.length === 0 ? (

        <p className="mt-6">
          No notices available.
        </p>

      ) : (

        <div className="space-y-8 mt-8">

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