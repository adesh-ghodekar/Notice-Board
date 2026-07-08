import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ManageAdmins() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    fetch("/api/admins")
  .then(async (res) => {
    const data = await res.json();

    console.log("API Response:", data);
    console.log("Is Array:", Array.isArray(data));

    setAdmins(Array.isArray(data) ? data : []);
  })
  .catch((err) => {
    console.error(err);
    setAdmins([]);
  });
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

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Manage Admins
        </h1>

        <Link
          href="/admin/users/create"
          className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Admin
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
            </tr>

          </thead>

          <tbody>

            {admins.map((admin) => (

              <tr
                key={admin.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {admin.name}
                </td>

                <td className="px-6 py-4">
                  {admin.username}
                </td>

                <td className="px-6 py-4">
                  {admin.email}
                </td>

                <td className="px-6 py-4">
                  {admin.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}