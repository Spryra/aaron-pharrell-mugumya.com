export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-light-surface dark:bg-dark-surface rounded w-1/3"></div>
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 p-6 bg-light-surface dark:bg-dark-surface rounded-xl">
              <div className="w-20 h-20 bg-light-accent/20 dark:bg-dark-accent/20 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded w-1/2"></div>
                <div className="h-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
