export default function LoadingSpinner({ label, fullScreen = true }) {
  return (
    <div
      className={
        fullScreen
          ? "flex h-screen flex-col items-center justify-center"
          : "flex flex-col items-center justify-center py-20"
      }
    >
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />

      {label && <p className="mt-4 text-lg text-gray-600">{label}</p>}
    </div>
  );
}
