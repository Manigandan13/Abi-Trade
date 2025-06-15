
const SkeletonLoader = ({ rows = 10 }) => {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 items-center border p-4 rounded-lg bg-white/60 backdrop-blur shadow-md"
        >
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
