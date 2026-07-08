import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NoticeForm from "../../components/NoticeForm";

export default function CreateNotice() {
  const router = useRouter();
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
    }
  }, [session, status, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/notices", {
      method: "POST",
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
      alert("Notice Created Successfully!");
      router.push("/");
    } else {
      alert("Something went wrong.");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-700 border-t-transparent"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Create Notice
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
        buttonText="Create Notice"
      />
    </div>
  );
}