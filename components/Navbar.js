import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#1e40af",
        color: "white",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>📢 College Notice Board</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          href="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          href="/notices/create"
          style={{ color: "white", textDecoration: "none" }}
        >
          Create Notice
        </Link>
      </div>
    </nav>
  );
}