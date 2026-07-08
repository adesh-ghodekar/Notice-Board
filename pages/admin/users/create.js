import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateAdmin() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/admins/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Admin created successfully!");

    router.push("/admin/users");
  }

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-center text-3xl font-bold">
        Add Admin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <button
          className="w-full rounded bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
        >
          Create Admin
        </button>

      </form>

    </div>
  );
}