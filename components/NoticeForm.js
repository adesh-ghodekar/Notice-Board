export default function NoticeForm({
  title,
  setTitle,
  body,
  setBody,
  category,
  setCategory,
  priority,
  setPriority,
  publishDate,
  setPublishDate,
  image,
  setImage,
  onSubmit,
  buttonText,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>Title</label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Notice Body</label>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={6}
        style={textareaStyle}
      />

      <label>Category</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="GENERAL">GENERAL</option>
        <option value="EVENT">EVENT</option>
        <option value="EXAM">EXAM</option>
      </select>

      <label>Priority</label>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={inputStyle}
      >
        <option value="NORMAL">NORMAL</option>
        <option value="URGENT">URGENT</option>
      </select>

      <label>Publish Date</label>

      <input
        type="date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Image URL (optional)</label>

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        {buttonText}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const buttonStyle = {
  width: "100%",
  background: "#1e40af",
  color: "white",
  border: "none",
  padding: "14px",
  fontSize: "18px",
  borderRadius: "8px",
  cursor: "pointer",
};