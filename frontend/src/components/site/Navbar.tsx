import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count, setOpen } = useCart();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isAuthenticated =
    !loading && (Boolean(user) || Boolean(localStorage.getItem("bonchezz-token")));

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    navigate({ to: "/shop", search: trimmed ? { q: trimmed } : {} });
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchValue);
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchValue("");
    navigate({ to: "/shop" });
    setSearchOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          className="lg:hidden -ml-1 p-2 text-foreground"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-soft font-display text-lg">
            B
          </span>
          <span className="hidden sm:block font-display text-lg font-semibold tracking-tight">
            Bonchezz <span className="text-purple">Bead Hub</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-full transition-colors hover:text-foreground hover:bg-accent/60"
              activeProps={{ className: "text-foreground bg-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-ring/40 transition"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search beads, charms…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </form>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            <User className="h-4 w-4" />
            Log out
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            <User className="h-4 w-4" />
            Login
          </Link>
        )}

        <button
          onClick={() => setOpen(true)}
          className="relative rounded-full bg-foreground text-background p-2.5 hover:bg-foreground/90 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-pink-foreground">
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-2"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search beads, charms…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-background p-6 shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Bonchezz</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-accent"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                    activeProps={{ className: "bg-accent text-foreground" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-border pt-4 flex gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-medium"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full bg-foreground px-4 py-2 text-center text-sm font-medium text-background"
                  >
                    Register
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
