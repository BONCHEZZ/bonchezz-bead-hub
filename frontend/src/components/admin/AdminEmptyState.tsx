import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function AdminEmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground shadow-soft">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-background">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
