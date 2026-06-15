export default function Loading() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-light-surface dark:bg-dark-surface rounded w-3/4"></div>
          <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-full"></div>
          <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-5/6"></div>
        </div>
      </div>
    </main>
  );
}
