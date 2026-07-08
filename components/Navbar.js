import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          📢 College Notice Board
        </h1>

        <div className="flex gap-6">
          <Link
            href="/"
            className="font-medium text-white transition hover:text-blue-200"
          >
            Home
          </Link>

          <Link
            href="/notices/create"
            className="font-medium text-white transition hover:text-blue-200"
          >
            Create Notice
          </Link>
        </div>
      </div>
    </nav>
  );
}