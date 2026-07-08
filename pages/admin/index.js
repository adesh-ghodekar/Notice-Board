import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-700 border-t-transparent"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-4xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome,
        <span className="font-semibold">
          {" "}
          {session.user.name}
        </span>
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Link
          href="/admin/notices"
          className="rounded-xl bg-blue-600 p-8 text-white shadow-lg transition hover:scale-105"
        >
          <div className="text-5xl">📝</div>

          <h2 className="mt-5 text-2xl font-bold">
            Manage Notices
          </h2>

          <p className="mt-2 text-blue-100">
            Create, edit and manage all notices.
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="rounded-xl bg-green-600 p-8 text-white shadow-lg transition hover:scale-105"
        >
          <div className="text-5xl">👤</div>

          <h2 className="mt-5 text-2xl font-bold">
            Manage Admins
          </h2>

          <p className="mt-2 text-green-100">
            Add, edit and delete admins.
          </p>
        </Link>

        <Link
          href="/"
          className="rounded-xl bg-purple-600 p-8 text-white shadow-lg transition hover:scale-105"
        >
          <div className="text-5xl">📢</div>

          <h2 className="mt-5 text-2xl font-bold">
            View Notices
          </h2>

          <p className="mt-2 text-purple-100">
            Open the public notice board.
          </p>
        </Link>

      </div>

    </div>
  );
}