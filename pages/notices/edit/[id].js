import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NoticeForm from "../../../components/NoticeForm";
import { toast } from "react-toastify";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [priority, setPriority] = useState("NORMAL");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (!id) return;

    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setBody(data.body || "");
        setCategory(data.category || "GENERAL");
        setPriority(data.priority || "NORMAL");
        setPublishDate(
          data.publishDate ? data.publishDate.split("T")[0] : ""
        );
        setImage(data.image || "");
      });
  }, [id, session, status, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category,
        priority,
        publishDate,
        image: image || null,
      }),
    });

    if (res.ok) {
      toast.success("Notice Updated Successfully!");
      router.push("/");
    } else {
      toast.error("Failed to update notice.");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Edit Notice
      </h1>

      <NoticeForm
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
        category={category}
        setCategory={setCategory}
        priority={priority}
        setPriority={setPriority}
        publishDate={publishDate}
        setPublishDate={setPublishDate}
        image={image}
        setImage={setImage}
        onSubmit={handleSubmit}
        buttonText="Update Notice"
      />
    </div>
  );
}