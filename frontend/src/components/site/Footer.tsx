import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Music2, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-primary-foreground font-display text-lg">
              B
            </span>
            <span className="font-display text-lg font-semibold">Bonchezz Bead Hub</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Handcrafted accessories made on campus, made for students. Small batches, big style.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-foreground">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple" /> +254 705990086
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple" /> derrickbonche9@gmail.com
            </li>
            <li>Campus pickup: Main Gate, STC</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Follow the Bead</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-pink hover:text-pink-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-foreground hover:text-background transition-colors"
            >
              <Music2 className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-purple hover:text-purple-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Bonchezz Bead Hub. Handmade with love.
        </div>
      </div>
    </footer>
  );
}
