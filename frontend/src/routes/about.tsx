import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Sparkles, Target } from "lucide-react";
import heroImg from "@/assets/hero-beads.jpg";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bonchezz Bead Hub" },
      {
        name: "description",
        content:
          "Our story: a student-run bead studio making handcrafted accessories for campus life.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
     <section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${heroImg})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl text-white"
    >
      <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium">
        Our Story
      </span>

      <h1 className="mt-4 font-display text-5xl font-bold">
        Beads with a Backstory
      </h1>

      <p className="mt-6 text-lg text-gray-200">
        Bonchezz Bead Hub started in a hostel room with a jar of beads and a
        big idea: campus jewelry that actually feels premium. Today, we string
        every piece by hand and deliver right to your door—or your lecture hall.
      </p>
    </motion.div>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            icon={Target}
            title="Our Mission"
            text="Make quality handcrafted accessories that fit a student's budget and personality."
          />
          <Card
            icon={Sparkles}
            title="Our Vision"
            text="A campus where every student wears at least one piece they truly love."
          />
          <Card
            icon={Heart}
            title="Why we exist"
            text="Because mass-produced accessories are boring — and student creativity deserves to be worn."
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
