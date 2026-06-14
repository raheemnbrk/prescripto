export default function DoctorDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 h-80 bg-gray-200 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
