export const BlogSkeleton = () => {
  return (
    <div>
      <div className="flex justify-evenly">
        <div className="flex justify-center min-w-[70vw]">
          <div className="flex justify-center min-h-fit flex-col max-w-xl min-w-[70vh] space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="p-4 bg-gray-50 animate-pulse rounded-md">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[50vw] bg-blue-50  "></div>
      </div>
    </div>
  );
};


export const Skeleton = () => {
  return (
      <div className="grid grid-cols-12 px-10 w-full pt-20">
        <div></div>
        <div className="col-span-6 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div></div>
        <div className="col-span-3 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
  );
};
