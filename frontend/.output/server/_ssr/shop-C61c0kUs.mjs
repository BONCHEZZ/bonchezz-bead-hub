import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-C61c0kUs.js
var $$splitComponentImporter = () => import("./shop-DPyY5hb9.mjs");
var searchSchema = objectType({
	category: stringType().optional(),
	q: stringType().optional()
});
var Route = createFileRoute("/shop")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Shop — Bonchezz Bead Hub" }, {
		name: "description",
		content: "Browse handcrafted bead accessories: bracelets, necklaces, waist beads, watches and phone charms."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
