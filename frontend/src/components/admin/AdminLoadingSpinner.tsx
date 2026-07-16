export function AdminLoadingSpinner() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center rounded-[2rem] border border-border bg-card/80 shadow-soft">
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        <span>Loading dashboard data...</span>
      </div>
    </div>
  );
}
