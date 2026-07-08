import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [priority, setPriority] = useState("NORMAL");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setCategory(data.category);
        setPriority(data.priority);
        setPublishDate(
          new Date(data.publishDate).toISOString().split("T")[0]
        );
        setImage(data.image || "");
      });
  }, [id]);

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
      alert("Notice Updated Successfully!");
      router.push("/");
    } else {
      alert("Update Failed.");
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
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