import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[600px] w-full flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-b-2" />
        <Loader2 className="text-primary absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-black tracking-tight">
          Syncing Intelligence
        </h2>
        <p className="text-muted-foreground animate-pulse text-sm font-medium">
          Establishing secure connection to your clusters...
        </p>
      </div>

      {/* Skeleton Preview */}
      <div className="mt-12 w-full max-w-4xl space-y-8 px-4 opacity-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-accent h-24 animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="bg-accent h-64 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
