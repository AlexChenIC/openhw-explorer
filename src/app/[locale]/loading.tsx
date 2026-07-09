// Homepage-level loading skeleton shown while the route segment streams in.
export default function Loading() {
  return (
    <div className="page-wrapper">
      <main className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero placeholder */}
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-[var(--bg-card)] mb-4" />
          <div className="h-4 w-96 max-w-full rounded bg-[var(--bg-card)] mb-2" />
          <div className="h-4 w-80 max-w-full rounded bg-[var(--bg-card)] mb-10" />
        </div>

        {/* Filter bar placeholder */}
        <div className="animate-pulse flex gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-[var(--bg-card)]" />
          ))}
        </div>

        {/* Project card grid placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col gap-4 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-subtle-hover)]" />
                <div className="h-5 w-16 rounded-md bg-[var(--bg-subtle-hover)]" />
              </div>
              <div className="h-5 w-32 rounded bg-[var(--bg-subtle-hover)]" />
              <div className="h-4 w-full rounded bg-[var(--bg-subtle-hover)]" />
              <div className="h-4 w-3/4 rounded bg-[var(--bg-subtle-hover)]" />
              <div className="flex gap-2 mt-auto">
                <div className="h-5 w-14 rounded-md bg-[var(--bg-subtle-hover)]" />
                <div className="h-5 w-14 rounded-md bg-[var(--bg-subtle-hover)]" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
