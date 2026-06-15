export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-light-surface dark:bg-dark-surface rounded w-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-light-surface dark:bg-dark-surface rounded-xl h-64"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
