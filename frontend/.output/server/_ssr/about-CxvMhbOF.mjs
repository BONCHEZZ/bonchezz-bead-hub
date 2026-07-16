import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { A as Heart, d as Sparkles, l as Target } from "../_libs/lucide-react.mjs";
import { t as hero_beads_default } from "./hero-beads-DcYpOzys.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as SiteLayout } from "./Layout-Bq6d38zL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CxvMhbOF.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-cover bg-center bg-no-repeat",
		style: { backgroundImage: `url(${hero_beads_default})` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "max-w-2xl text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium",
						children: "Our Story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-5xl font-bold",
						children: "Beads with a Backstory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-gray-200",
						children: "Bonchezz Bead Hub started in a hostel room with a jar of beads and a big idea: campus jewelry that actually feels premium. Today, we string every piece by hand and deliver right to your door—or your lecture hall."
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: Target,
					title: "Our Mission",
					text: "Make quality handcrafted accessories that fit a student's budget and personality."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: Sparkles,
					title: "Our Vision",
					text: "A campus where every student wears at least one piece they truly love."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					icon: Heart,
					title: "Why we exist",
					text: "Because mass-produced accessories are boring — and student creativity deserves to be worn."
				})
			]
		})
	})] });
}
function Card({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-display text-xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: text
			})
		]
	});
}
//#endregion
export { About as component };
