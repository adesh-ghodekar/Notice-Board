import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data));
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
      <h1>College Notice Board</h1>

      <p>Welcome to the College Notice Board System.</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Latest Notices</h2>

      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "25px",
              marginTop: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  backgroundColor:
                    notice.priority === "URGENT"
                      ? "#dc3545"
                      : "#28a745",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {notice.priority}
              </span>

              <span style={{ color: "#666" }}>
                {new Date(notice.publishDate).toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h2 style={{ marginBottom: "10px" }}>{notice.title}</h2>

            {/* Body */}
            <p
              style={{
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {notice.body}
            </p>

            {/* Category */}
            <p>
              <strong>Category:</strong> {notice.category}
            </p>

            {/* Buttons */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "15px",
              }}
            >
              <Link
                href={`/notices/edit/${notice.id}`}
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                Edit
              </Link>

              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}