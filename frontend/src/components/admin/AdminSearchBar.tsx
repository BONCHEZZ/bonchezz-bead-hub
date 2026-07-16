import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminSearchBar({
  value,
  placeholder = "Search…",
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        className="pl-11"
      />
    </label>
  );
}
