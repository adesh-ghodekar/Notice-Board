import { useState } from "react";
import { useRouter } from "next/router";
import NoticeForm from "../../components/NoticeForm";

export default function CreateNotice() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [priority, setPriority] = useState("NORMAL");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState("");

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

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
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