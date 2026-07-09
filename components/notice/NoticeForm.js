import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from "../../utils/constants";

export default function NoticeForm({ form, onChange, onSubmit, submitting, buttonText }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-semibold text-gray-700">Title</label>

        <input
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-700">Notice Body</label>

        <textarea
          rows={6}
          value={form.body}
          onChange={(e) => onChange("body", e.target.value)}
          required
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-gray-700">Category</label>

          <select
            value={form.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">Priority</label>

          <select
            value={form.priority}
            onChange={(e) => onChange("priority", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-700">Publish Date</label>

        <input
          type="date"
          value={form.publishDate}
          onChange={(e) => onChange("publishDate", e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold text-gray-700">
          Image URL <span className="font-normal text-gray-400">(optional)</span>
        </label>

        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={(e) => onChange("image", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
      >
        {submitting ? "Saving..." : buttonText}
      </button>
    </form>
  );
}
