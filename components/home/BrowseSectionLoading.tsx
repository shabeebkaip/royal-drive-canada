/**
 * Loading Component for Browse Section
 * Displays skeleton loading state while data is being fetched
 */

export default function BrowseSectionLoading() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-lg w-80 mx-auto mb-8 animate-pulse" />
          
          {/* Tab Navigation Skeleton */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-50 rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex gap-2">
                <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center p-6"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-xl mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
              <div className="w-8 h-0.5 bg-gray-200 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
