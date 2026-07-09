import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const EMPTY_FORM = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function CreateAdmin() {
  const router = useRouter();
  const { session, isLoading } = useRequireAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/admins/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      toast.success("Admin created successfully!");
      router.push("/admin/users");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;
  if (!session) return null;

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-center text-3xl font-bold">Add Admin</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}
