import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { EMPTY_NOTICE_FORM } from "../../utils/constants";
import LoadingSpinner from "../common/LoadingSpinner";
import NoticeForm from "./NoticeForm";

export default function NoticeFormPage({ mode }) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const { id } = router.query;
  const { session, isLoading } = useRequireAuth();

  const [form, setForm] = useState(EMPTY_NOTICE_FORM);
  const [loadingNotice, setLoadingNotice] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit || !id || !session) return;

    let cancelled = false;

    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        setForm({
          title: data.title || "",
          body: data.body || "",
          category: data.category || "GENERAL",
          priority: data.priority || "NORMAL",
          publishDate: data.publishDate ? data.publishDate.split("T")[0] : "",
          image: data.image || "",
        });
      })
      .catch(() => toast.error("Failed to load notice."))
      .finally(() => {
        if (!cancelled) setLoadingNotice(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isEdit, id, session]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const url = isEdit ? `/api/notices/${id}` : "/api/notices";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: form.image?.trim() || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      toast.success(isEdit ? "Notice updated successfully!" : "Notice created successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading || (isEdit && loadingNotice)) {
    return <LoadingSpinner />;
  }

  if (!session) return null;

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold">
        {isEdit ? "Edit Notice" : "Create Notice"}
      </h1>

      <NoticeForm
        form={form}
        onChange={updateField}
        onSubmit={handleSubmit}
        submitting={submitting}
        buttonText={isEdit ? "Update Notice" : "Create Notice"}
      />
    </div>
  );
}
