import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  accent?: "gold" | "purple" | "pink";
};

const accentStyles: Record<NonNullable<Props["accent"]>, string> = {
  gold: "bg-gold/10 text-gold",
  purple: "bg-purple/10 text-purple",
  pink: "bg-pink/10 text-pink",
};

export function AdminSummaryCard({
  label,
  value,
  description,
  icon: Icon,
  accent = "purple",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group rounded-[2rem] border border-border bg-white/90 p-6 shadow-soft backdrop-blur"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
          {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-3xl border border-border",
            accentStyles[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
