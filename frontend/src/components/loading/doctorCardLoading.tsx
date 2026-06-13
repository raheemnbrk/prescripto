export default function DoctorCardLoading() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-64 w-full bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
