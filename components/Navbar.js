import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          📢 College Notice Board
        </h1>

        <div className="flex gap-8 text-lg">

          <Link
            href="/"
            className="hover:text-blue-200 transition"
          >
            Home
          </Link>

          <Link
            href="/notices/create"
            className="hover:text-blue-200 transition"
          >
            Create Notice
          </Link>

        </div>

      </div>
    </nav>
  );
}