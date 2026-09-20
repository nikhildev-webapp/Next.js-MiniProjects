export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-3xl font-medium">Loading...</p>
    </div>
  );
}
