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
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Notice Body
        </label>

        <textarea
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-y focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="GENERAL">GENERAL</option>
          <option value="EVENT">EVENT</option>
          <option value="EXAM">EXAM</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="NORMAL">NORMAL</option>
          <option value="URGENT">URGENT</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Publish Date
        </label>

        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Image URL (optional)
        </label>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        {buttonText}
      </button>
    </form>
  );
}