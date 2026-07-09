export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`rounded-lg px-4 py-2 transition ${
            currentPage === index + 1
              ? "bg-blue-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
