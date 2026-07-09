import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold text-white sm:text-2xl"
        >
          📢 College Notice Board
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="font-medium text-white transition hover:text-blue-200"
          >
            Home
          </Link>

          {session ? (
            <>
              <Link
                href="/admin"
                className="font-medium text-white transition hover:text-blue-200"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 font-medium text-blue-800 transition hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
